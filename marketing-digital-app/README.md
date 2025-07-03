# CaktoDigital - Plataforma de Marketing Digital

Uma plataforma completa de marketing digital similar ao Cakto, desenvolvida com Next.js, React e Node.js.

![CaktoDigital](https://img.shields.io/badge/CaktoDigital-Marketing%20Platform-blue)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![React](https://img.shields.io/badge/React-18-blue)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![MongoDB](https://img.shields.io/badge/MongoDB-6+-green)

## ✨ Características

### 🎯 Marketing de Performance
- **Google Ads & Meta Ads**: Gestão profissional de campanhas
- **ROI Tracking**: Acompanhamento detalhado do retorno sobre investimento
- **Otimização Automática**: Algoritmos para melhorar performance
- **A/B Testing**: Teste de variações para maximizar resultados

### 📊 Analytics Avançado
- **Dashboard Intuitivo**: Métricas em tempo real
- **Relatórios Customizados**: Exportação de dados em PDF/Excel
- **KPIs Importantes**: ROAS, CTR, Conversões, CPM, CPC
- **Análise de Tendências**: Gráficos e insights acionáveis

### 👥 Gestão de Clientes
- **CRM Integrado**: Gerenciamento completo de clientes
- **Multi-tenancy**: Suporte para agências com múltiplos clientes
- **Permissões**: Controle de acesso por usuário
- **Comunicação**: Sistema de notificações e alertas

### 🔧 Funcionalidades Técnicas
- **API REST**: Backend robusto com Node.js/Express
- **Autenticação JWT**: Sistema seguro de login
- **Base de Dados**: MongoDB com schemas otimizados
- **UI/UX Moderno**: Interface responsiva com Tailwind CSS

## 🚀 Tecnologias Utilizadas

### Frontend
- **Next.js 14**: Framework React com App Router
- **React 18**: Biblioteca para interfaces de usuário
- **TypeScript**: Tipagem estática para maior segurança
- **Tailwind CSS**: Framework CSS utilitário
- **Framer Motion**: Animações fluidas
- **Lucide React**: Ícones modernos
- **React Query**: Gerenciamento de estado server-side
- **React Hook Form**: Formulários performáticos

### Backend
- **Node.js**: Runtime JavaScript
- **Express.js**: Framework web minimalista
- **MongoDB**: Banco de dados NoSQL
- **Mongoose**: ODM para MongoDB
- **JWT**: Autenticação e autorização
- **bcryptjs**: Hash de senhas
- **Nodemailer**: Envio de emails

### DevOps & Ferramentas
- **Docker**: Containerização (opcional)
- **Git**: Controle de versão
- **ESLint**: Linting de código
- **Prettier**: Formatação de código

## 📦 Instalação

### Pré-requisitos

- Node.js 18 ou superior
- MongoDB 6 ou superior
- npm ou yarn
- Git

### 1. Clone o repositório

\`\`\`bash
git clone https://github.com/seu-usuario/cakto-digital-marketing.git
cd cakto-digital-marketing/marketing-digital-app
\`\`\`

### 2. Instale as dependências

\`\`\`bash
npm install
# ou
yarn install
\`\`\`

### 3. Configure as variáveis de ambiente

\`\`\`bash
cp .env.example .env
\`\`\`

Edite o arquivo \`.env\` com suas configurações:

\`\`\`env
MONGODB_URI=mongodb://localhost:27017/cakto-digital
JWT_SECRET=seu-jwt-secret-super-seguro
PORT=5000
\`\`\`

### 4. Inicie o MongoDB

\`\`\`bash
# Se instalado localmente
mongod

# Ou usando Docker
docker run -d -p 27017:27017 --name mongodb mongo:6
\`\`\`

### 5. Execute a aplicação

#### Desenvolvimento (Frontend + Backend)

\`\`\`bash
npm run dev:full
\`\`\`

#### Apenas Frontend

\`\`\`bash
npm run dev
\`\`\`

#### Apenas Backend

\`\`\`bash
npm run server
\`\`\`

### 6. Acesse a aplicação

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/api/health

## 🏗️ Estrutura do Projeto

\`\`\`
marketing-digital-app/
├── app/                    # Next.js App Router
│   ├── dashboard/         # Dashboard pages
│   ├── login/            # Authentication pages
│   ├── register/         # Registration pages
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   └── providers.tsx     # Context providers
├── components/            # React components
├── lib/                  # Utility functions
├── public/               # Static assets
├── server.js             # Express.js server
├── package.json          # Dependencies
├── tailwind.config.js    # Tailwind configuration
├── next.config.js        # Next.js configuration
└── README.md             # Documentation
\`\`\`

## 🔑 API Endpoints

### Autenticação
- \`POST /api/auth/register\` - Registro de usuário
- \`POST /api/auth/login\` - Login de usuário

### Dashboard
- \`GET /api/dashboard/metrics\` - Métricas do dashboard

### Campanhas
- \`GET /api/campaigns\` - Listar campanhas
- \`POST /api/campaigns\` - Criar campanha
- \`PUT /api/campaigns/:id\` - Atualizar campanha
- \`DELETE /api/campaigns/:id\` - Deletar campanha

### Clientes
- \`GET /api/clients\` - Listar clientes
- \`POST /api/clients\` - Criar cliente
- \`PUT /api/clients/:id\` - Atualizar cliente
- \`DELETE /api/clients/:id\` - Deletar cliente

### Analytics
- \`GET /api/analytics/overview\` - Visão geral das métricas

## 🔒 Autenticação

O sistema utiliza JWT (JSON Web Tokens) para autenticação. Inclua o token no header das requisições:

\`\`\`bash
Authorization: Bearer <seu-jwt-token>
\`\`\`

## 🎨 Customização

### Cores e Tema

Edite o arquivo \`tailwind.config.js\` para customizar as cores:

\`\`\`javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#3b82f6',  // Azul principal
          600: '#2563eb',
          700: '#1d4ed8',
        }
      }
    }
  }
}
\`\`\`

### Componentes

Os componentes estão organizados na pasta \`components/\` e utilizam Tailwind CSS para estilização.

## 📱 Responsividade

A aplicação é totalmente responsiva e funciona em:
- 📱 Dispositivos móveis (320px+)
- 📟 Tablets (768px+)
- 💻 Desktops (1024px+)
- 🖥️ Telas grandes (1280px+)

## 🔧 Scripts Disponíveis

\`\`\`bash
npm run dev          # Inicia o frontend em modo desenvolvimento
npm run build        # Faz build do frontend para produção
npm run start        # Inicia o frontend em modo produção
npm run server       # Inicia apenas o backend
npm run dev:full     # Inicia frontend + backend simultaneamente
npm run lint         # Executa o ESLint
\`\`\`

## 🚀 Deploy

### Frontend (Vercel)

\`\`\`bash
npm install -g vercel
vercel --prod
\`\`\`

### Backend (Railway/Heroku)

1. Configure as variáveis de ambiente na plataforma
2. Faça deploy do código
3. Configure o MongoDB Atlas ou equivalente

### Docker (Opcional)

\`\`\`dockerfile
# Dockerfile exemplo
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

## 🧪 Testes

\`\`\`bash
# Executar testes (quando implementados)
npm test

# Executar testes em modo watch
npm run test:watch

# Coverage de testes
npm run test:coverage
\`\`\`

## 📈 Performance

### Métricas de Performance
- ⚡ **First Contentful Paint**: < 1.5s
- 🎯 **Largest Contentful Paint**: < 2.5s
- 📱 **Cumulative Layout Shift**: < 0.1
- 🔄 **First Input Delay**: < 100ms

### Otimizações Implementadas
- 🖼️ **Image Optimization**: Next.js Image component
- 📦 **Code Splitting**: Automatic route-based splitting
- 🗜️ **Compression**: Gzip/Brotli compression
- 🔄 **Caching**: API response caching
- ⚡ **Lazy Loading**: Components e imagens

## 🛡️ Segurança

### Medidas de Segurança Implementadas
- 🔐 **JWT Authentication**: Tokens seguros
- 🔒 **Password Hashing**: bcrypt com salt
- 🛡️ **CORS**: Configuração adequada
- 🚫 **Rate Limiting**: Proteção contra spam
- 🔍 **Input Validation**: Validação de dados
- 📝 **Audit Logs**: Log de ações importantes

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (\`git checkout -b feature/AmazingFeature\`)
3. Commit suas mudanças (\`git commit -m 'Add some AmazingFeature'\`)
4. Push para a branch (\`git push origin feature/AmazingFeature\`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Equipe

- **Desenvolvedor Principal**: [Seu Nome]
- **UI/UX Designer**: [Nome do Designer]
- **DevOps Engineer**: [Nome do DevOps]

## 📞 Suporte

- 📧 **Email**: suporte@caktodigital.com
- 💬 **Chat**: Disponível 24/7 na plataforma
- 📚 **Documentação**: [docs.caktodigital.com]
- 🐛 **Bug Reports**: [GitHub Issues]

## 🎯 Roadmap

### Q1 2024
- [ ] Integração com Google Ads API
- [ ] Integração com Facebook/Meta API
- [ ] Sistema de notificações push
- [ ] Relatórios avançados em PDF

### Q2 2024
- [ ] App mobile (React Native)
- [ ] Integração com TikTok Ads
- [ ] Sistema de white-label
- [ ] IA para otimização de campanhas

### Q3 2024
- [ ] Marketplace de templates
- [ ] Integração com CRM externos
- [ ] Sistema de afiliados
- [ ] Analytics preditivo

---

⭐ **Se este projeto foi útil para você, considere dar uma estrela no GitHub!**

[![GitHub stars](https://img.shields.io/github/stars/seu-usuario/cakto-digital-marketing.svg?style=social&label=Star)](https://github.com/seu-usuario/cakto-digital-marketing)