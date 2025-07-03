const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cakto-digital', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  company: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
  subscription: { type: String, default: 'trial' },
  createdAt: { type: Date, default: Date.now },
  trialEndsAt: { type: Date, default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) }
})

const User = mongoose.model('User', userSchema)

// Campaign Schema
const campaignSchema = new mongoose.Schema({
  name: { type: String, required: true },
  platform: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
  budget: { type: Number, required: true },
  spend: { type: Number, default: 0 },
  impressions: { type: Number, default: 0 },
  clicks: { type: Number, default: 0 },
  conversions: { type: Number, default: 0 },
  revenue: { type: Number, default: 0 },
  status: { type: String, enum: ['active', 'paused', 'completed'], default: 'active' },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  createdAt: { type: Date, default: Date.now }
})

const Campaign = mongoose.model('Campaign', campaignSchema)

// Client Schema
const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  company: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  totalSpend: { type: Number, default: 0 },
  totalRevenue: { type: Number, default: 0 },
  campaignCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
})

const Client = mongoose.model('Client', clientSchema)

// Middleware for authentication
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ error: 'Access token required' })
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' })
    }
    req.user = user
    next()
  })
}

// Routes

// Auth Routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, company, password } = req.body

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = new User({
      name,
      email,
      company,
      password: hashedPassword
    })

    await user.save()

    // Generate token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    )

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        company: user.company,
        subscription: user.subscription
      }
    })
  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body

    // Find user
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' })
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return res.status(400).json({ error: 'Invalid credentials' })
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    )

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        company: user.company,
        subscription: user.subscription
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Dashboard Routes
app.get('/api/dashboard/metrics', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId
    const { period = '30d' } = req.query

    // Calculate date range
    const now = new Date()
    let startDate = new Date()
    
    switch (period) {
      case '7d':
        startDate.setDate(now.getDate() - 7)
        break
      case '30d':
        startDate.setDate(now.getDate() - 30)
        break
      case '90d':
        startDate.setDate(now.getDate() - 90)
        break
      case '1y':
        startDate.setFullYear(now.getFullYear() - 1)
        break
      default:
        startDate.setDate(now.getDate() - 30)
    }

    // Get campaigns metrics
    const campaigns = await Campaign.find({
      userId,
      createdAt: { $gte: startDate }
    })

    const totalSpend = campaigns.reduce((sum, campaign) => sum + campaign.spend, 0)
    const totalRevenue = campaigns.reduce((sum, campaign) => sum + campaign.revenue, 0)
    const totalConversions = campaigns.reduce((sum, campaign) => sum + campaign.conversions, 0)
    const totalClicks = campaigns.reduce((sum, campaign) => sum + campaign.clicks, 0)
    const totalImpressions = campaigns.reduce((sum, campaign) => sum + campaign.impressions, 0)

    const roas = totalSpend > 0 ? totalRevenue / totalSpend : 0
    const ctr = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0

    res.json({
      totalSpend,
      totalRevenue,
      roas,
      conversions: totalConversions,
      ctr,
      campaigns: campaigns.length
    })
  } catch (error) {
    console.error('Dashboard metrics error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Campaign Routes
app.get('/api/campaigns', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId
    const campaigns = await Campaign.find({ userId }).populate('clientId', 'name company')
    res.json(campaigns)
  } catch (error) {
    console.error('Get campaigns error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.post('/api/campaigns', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId
    const campaignData = { ...req.body, userId }
    
    const campaign = new Campaign(campaignData)
    await campaign.save()
    
    res.status(201).json(campaign)
  } catch (error) {
    console.error('Create campaign error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Client Routes
app.get('/api/clients', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId
    const clients = await Client.find({ userId })
    res.json(clients)
  } catch (error) {
    console.error('Get clients error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.post('/api/clients', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId
    const clientData = { ...req.body, userId }
    
    const client = new Client(clientData)
    await client.save()
    
    res.status(201).json(client)
  } catch (error) {
    console.error('Create client error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Analytics Routes
app.get('/api/analytics/overview', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId
    
    // Get all campaigns for user
    const campaigns = await Campaign.find({ userId })
    const clients = await Client.find({ userId })
    
    // Calculate performance metrics
    const platformPerformance = {}
    campaigns.forEach(campaign => {
      if (!platformPerformance[campaign.platform]) {
        platformPerformance[campaign.platform] = {
          spend: 0,
          revenue: 0,
          conversions: 0,
          campaignCount: 0
        }
      }
      
      platformPerformance[campaign.platform].spend += campaign.spend
      platformPerformance[campaign.platform].revenue += campaign.revenue
      platformPerformance[campaign.platform].conversions += campaign.conversions
      platformPerformance[campaign.platform].campaignCount += 1
    })
    
    // Calculate ROAS for each platform
    Object.keys(platformPerformance).forEach(platform => {
      const data = platformPerformance[platform]
      data.roas = data.spend > 0 ? data.revenue / data.spend : 0
    })
    
    res.json({
      totalCampaigns: campaigns.length,
      totalClients: clients.length,
      platformPerformance,
      topCampaigns: campaigns
        .sort((a, b) => (b.revenue / b.spend) - (a.revenue / a.spend))
        .slice(0, 5)
    })
  } catch (error) {
    console.error('Analytics overview error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'CaktoDigital API is running' })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong!' })
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 CaktoDigital API server running on port ${PORT}`)
  console.log(`📊 Dashboard: http://localhost:3000`)
  console.log(`🔗 API: http://localhost:${PORT}/api`)
})