'use client'

import React, { useState } from 'react'
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Target,
  DollarSign,
  Eye,
  MousePointer,
  Calendar,
  Filter,
  Download,
  Plus,
  Bell,
  Settings,
  LogOut
} from 'lucide-react'

export default function DashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('30d')

  const metrics = [
    {
      title: 'Investimento Total',
      value: 'R$ 45.230',
      change: '+12.5%',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'text-blue-600'
    },
    {
      title: 'ROAS',
      value: '4.2x',
      change: '+18.3%',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'text-green-600'
    },
    {
      title: 'Conversões',
      value: '1.247',
      change: '+25.1%',
      icon: <Target className="w-6 h-6" />,
      color: 'text-purple-600'
    },
    {
      title: 'CTR Médio',
      value: '3.8%',
      change: '+2.1%',
      icon: <MousePointer className="w-6 h-6" />,
      color: 'text-orange-600'
    }
  ]

  const campaigns = [
    {
      name: 'Black Friday - E-commerce',
      platform: 'Google Ads',
      spend: 'R$ 12.450',
      roas: '5.2x',
      status: 'Ativa',
      performance: 'Excelente'
    },
    {
      name: 'Lead Generation B2B',
      platform: 'Facebook Ads',
      spend: 'R$ 8.320',
      roas: '3.8x',
      status: 'Ativa',
      performance: 'Boa'
    },
    {
      name: 'Remarketing Website',
      platform: 'Google Ads',
      spend: 'R$ 5.670',
      roas: '6.1x',
      status: 'Ativa',
      performance: 'Excelente'
    },
    {
      name: 'Awareness Brand',
      platform: 'Facebook Ads',
      spend: 'R$ 3.200',
      roas: '2.4x',
      status: 'Pausada',
      performance: 'Regular'
    }
  ]

  const topClients = [
    { name: 'TechCorp', revenue: 'R$ 45.230', campaigns: 8 },
    { name: 'Fashion Store', revenue: 'R$ 32.100', campaigns: 5 },
    { name: 'Local Business', revenue: 'R$ 18.900', campaigns: 3 }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold gradient-text">CaktoDigital</h1>
            
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-400 hover:text-gray-600">
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Settings className="w-5 h-5" />
              </button>
              <div className="h-8 w-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-medium">
                A
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">Visão geral das suas campanhas e resultados</p>
            </div>
            
            <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
              <select 
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="input min-w-[120px]"
              >
                <option value="7d">7 dias</option>
                <option value="30d">30 dias</option>
                <option value="90d">90 dias</option>
                <option value="1y">1 ano</option>
              </select>
              
              <button className="btn-secondary flex items-center">
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </button>
              
              <button className="btn-primary flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                Nova Campanha
              </button>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <div key={metric.title} className="metric-card">
              <div className="flex items-center justify-between mb-4">
                <div className={metric.color}>
                  {metric.icon}
                </div>
                <span className="text-sm text-green-600 font-medium">
                  {metric.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {metric.value}
              </h3>
              <p className="text-sm text-gray-600">{metric.title}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Campaigns Table */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Campanhas Ativas</h2>
                <div className="flex items-center space-x-2">
                  <button className="text-sm text-gray-600 hover:text-primary-600 flex items-center">
                    <Filter className="w-4 h-4 mr-1" />
                    Filtros
                  </button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-1 text-sm font-medium text-gray-600">Campanha</th>
                      <th className="text-left py-3 px-1 text-sm font-medium text-gray-600">Investimento</th>
                      <th className="text-left py-3 px-1 text-sm font-medium text-gray-600">ROAS</th>
                      <th className="text-left py-3 px-1 text-sm font-medium text-gray-600">Status</th>
                      <th className="text-left py-3 px-1 text-sm font-medium text-gray-600">Performance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campaigns.map((campaign, index) => (
                      <tr key={campaign.name} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-1">
                          <div>
                            <div className="font-medium text-gray-900">{campaign.name}</div>
                            <div className="text-sm text-gray-500">{campaign.platform}</div>
                          </div>
                        </td>
                        <td className="py-4 px-1 font-medium">{campaign.spend}</td>
                        <td className="py-4 px-1">
                          <span className="font-semibold text-green-600">{campaign.roas}</span>
                        </td>
                        <td className="py-4 px-1">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            campaign.status === 'Ativa' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {campaign.status}
                          </span>
                        </td>
                        <td className="py-4 px-1">
                          <span className={`text-sm font-medium ${
                            campaign.performance === 'Excelente' ? 'text-green-600' :
                            campaign.performance === 'Boa' ? 'text-blue-600' : 'text-orange-600'
                          }`}>
                            {campaign.performance}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Top Clients */}
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Top Clientes</h3>
              <div className="space-y-4">
                {topClients.map((client, index) => (
                  <div key={client.name} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{client.name}</div>
                      <div className="text-sm text-gray-500">{client.campaigns} campanhas</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-green-600">{client.revenue}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Ações Rápidas</h3>
              <div className="space-y-3">
                <button className="w-full btn-secondary text-left justify-start">
                  <Plus className="w-4 h-4 mr-2" />
                  Criar Campanha
                </button>
                <button className="w-full btn-secondary text-left justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Adicionar Cliente
                </button>
                <button className="w-full btn-secondary text-left justify-start">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Ver Relatórios
                </button>
                <button className="w-full btn-secondary text-left justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Agendar Reunião
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Atividade Recente</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">Nova conversão - TechCorp</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600">Campanha pausada automaticamente</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-600">Orçamento 80% consumido</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-600">Novo cliente adicionado</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}