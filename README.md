<div align="center">

# 🎉 Eventify Jr.

### **Plataforma Moderna de Gerenciamento de Eventos**

_Descubra, crie e gerencie eventos incríveis com uma experiência única_

[![Next.js](https://img.shields.io/badge/Next.js-14.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Material-UI](https://img.shields.io/badge/Material--UI-5.15-0081CB?style=for-the-badge&logo=mui)](https://mui.com/)
[![React Hook Form](https://img.shields.io/badge/React_Hook_Form-7.48-EC5990?style=for-the-badge&logo=reacthookform)](https://react-hook-form.com/)

[🚀 **Demo ao Vivo**](https://eventify-jr.vercel.app) • [📱 **Screenshots**](#-screenshots) • [⚡ **Instalação**](#-instalação-rápida)

---

</div>

## 🌟 **Sobre o Projeto**

**Eventify Jr.** é uma aplicação web moderna e responsiva para descoberta e gerenciamento de eventos, desenvolvida com as mais recentes tecnologias do ecossistema React. O projeto demonstra habilidades avançadas em desenvolvimento frontend, UX/UI design e arquitetura de software.

### 🎯 **Principais Diferenciais**

- **🎨 Design System Próprio** - Interface elegante com tema claro/escuro
- **📱 100% Responsivo** - Experiência perfeita em qualquer dispositivo
- **⚡ Performance Otimizada** - Carregamento rápido e navegação fluida
- **🔒 Validações Robustas** - Formulários inteligentes com feedback em tempo real
- **💾 Persistência Local** - Dados salvos automaticamente no navegador
- **🎭 Animações Suaves** - Micro-interações que encantam o usuário

---

## 🚀 **Funcionalidades**

<table>
<tr>
<td width="50%">

### 🏠 **Descoberta de Eventos**

- Grid responsivo com cards elegantes
- Sistema de filtros avançado por categoria
- Busca inteligente por texto
- Ordenação por data ou nome
- Paginação otimizada

### 📝 **Criação de Eventos**

- Formulário intuitivo e validado
- Upload de imagens personalizadas
- Categorização automática
- Preview em tempo real

</td>
<td width="50%">

### ❤️ **Sistema de Favoritos**

- Marcar eventos como favoritos
- Página dedicada aos favoritos
- Sincronização automática
- Feedback visual imediato

### 📊 **Gerenciamento Pessoal**

- Painel "Meus Eventos"
- Histórico de inscrições
- Dados organizados e acessíveis
- Controle total do usuário

</td>
</tr>
</table>

---

## 🛠️ **Stack Tecnológica**

<div align="center">

### **Frontend**

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

### **UI/UX**

![Material-UI](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Responsive](https://img.shields.io/badge/Responsive-Design-green?style=for-the-badge)

### **Formulários & Validação**

![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white)
![Validation](https://img.shields.io/badge/Form-Validation-orange?style=for-the-badge)

### **Ferramentas**

![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

</div>

---

## 📱 **Screenshots**

<div align="center">

### 🏠 **Página Principal**

_Interface moderna com filtros avançados e cards elegantes_

### 📝 **Criação de Eventos**

_Formulário intuitivo com validações em tempo real_

### ❤️ **Favoritos**

_Gestão personalizada dos eventos preferidos_

### 🌙 **Tema Escuro**

_Alternância suave entre temas claro e escuro_

</div>

---

## ⚡ **Instalação Rápida**

### **Pré-requisitos**

- Node.js 18+
- npm ou yarn

### **1. Clone o Repositório**

```bash
git clone https://github.com/seu-usuario/eventify-jr.git
cd eventify-jr
```

### **2. Instale as Dependências**

```bash
npm install --legacy-peer-deps
# ou
yarn install
```

### **3. Execute o Projeto**

```bash
npm run dev
# ou
yarn dev
```

### **4. Acesse a Aplicação**

Abra [http://localhost:3000](http://localhost:3000) no seu navegador

---

## 🏗️ **Arquitetura do Projeto**

```
eventify-jr/
├── 📁 app/                    # App Router (Next.js 14)
│   ├── 📁 criar-evento/       # Página de criação
│   ├── 📁 evento/[id]/        # Detalhes do evento
│   ├── 📁 inscricao/[id]/     # Formulário de inscrição
│   ├── 📁 meus-eventos/       # Eventos do usuário
│   ├── 📁 favoritos/          # Eventos favoritos
│   ├── 📄 layout.tsx          # Layout global
│   └── 📄 page.tsx            # Página inicial
├── 📁 components/             # Componentes reutilizáveis
│   ├── 📁 ui/                 # Componentes base
│   ├── 📁 layout/             # Componentes de layout
│   ├── 📄 event-card.tsx      # Card de evento
│   ├── 📄 filter-bar.tsx      # Barra de filtros
│   ├── 📄 custom-modal.tsx    # Modal customizado
│   └── 📄 custom-toast.tsx    # Notificações
├── 📁 contexts/               # Contextos React
│   └── 📄 theme-context.tsx   # Gerenciamento de tema
├── 📁 services/               # Lógica de negócio
│   ├── 📄 event.service.ts    # Serviço de eventos
│   ├── 📄 registration.service.ts # Serviço de inscrições
│   └── 📄 favorites.service.ts # Serviço de favoritos
├── 📁 types/                  # Definições TypeScript
│   ├── 📄 event.interface.ts  # Interface de evento
│   └── 📄 registration.interface.ts # Interface de inscrição
└── 📄 package.json            # Dependências
```

---

## 🎨 **Design System**

### **🎨 Paleta de Cores**

- **Primária**: `#667eea` → `#764ba2` (Gradiente)
- **Secundária**: `#ec4899` (Rosa vibrante)
- **Sucesso**: `#10b981` (Verde)
- **Aviso**: `#f59e0b` (Amarelo)
- **Erro**: `#ef4444` (Vermelho)

### **📝 Tipografia**

- **Fonte**: Inter (Google Fonts)
- **Pesos**: 300, 400, 500, 600, 700, 800

### **🎭 Componentes**

- Cards com elevação sutil
- Botões com gradientes
- Inputs com bordas arredondadas
- Modais com backdrop blur
- Animações suaves (0.3s ease)

---

## 🔧 **Scripts Disponíveis**

```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build para produção
npm run start    # Servidor de produção
npm run lint     # Verificação de código
```

---

## 🚀 **Deploy**

### **Vercel (Recomendado)**

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### **Netlify**

```bash
# Build
npm run build

# Upload da pasta .next para Netlify
```

---

## 🤝 **Contribuição**

Contribuições são sempre bem-vindas! Para contribuir:

1. **Fork** o projeto
2. Crie uma **branch** para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. **Push** para a branch (`git push origin feature/AmazingFeature`)
5. Abra um **Pull Request**

---

## 📄 **Licença**

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para detalhes.

---

## 👨‍💻 **Desenvolvedor**

<div align="center">

### **[Seu Nome]**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/seu-perfil)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/seu-usuario)
[![Portfolio](https://img.shields.io/badge/Portfolio-FF5722?style=for-the-badge&logo=google-chrome&logoColor=white)](https://seu-portfolio.com)

_Desenvolvedor Frontend apaixonado por criar experiências digitais incríveis_

</div>

---

## 🌟 **Agradecimentos**

- [Next.js](https://nextjs.org/) pela framework incrível
- [Material-UI](https://mui.com/) pelos componentes elegantes
- [React Hook Form](https://react-hook-form.com/) pela gestão de formulários
- [Vercel](https://vercel.com/) pelo deploy gratuito
- Comunidade open source pelo conhecimento compartilhado

---

<div align="center">

### ⭐ **Se este projeto te ajudou, deixe uma estrela!** ⭐

**Feito com ❤️ e muito ☕**

</div>
```

## 🎯 **Destaques do README:**

### ✨ **Visual Impactante:**

- **Badges coloridos** das tecnologias
- **Emojis estratégicos** para organização
- **Layout centralizado** e profissional
- **Seções bem definidas** e fáceis de navegar

### 🚀 **Conteúdo Técnico:**

- **Stack completa** bem documentada
- **Arquitetura do projeto** detalhada
- **Instruções claras** de instalação
- **Scripts e comandos** organizados

### 💼 **Apelo Profissional:**

- **Funcionalidades destacadas** em tabela
- **Design system** documentado
- **Contribuição** incentivada
- **Links para redes sociais** e portfolio

### 🎨 **Diferenciação:**

- **Seção de screenshots** para mostrar o visual
- **Paleta de cores** documentada
- **Deploy instructions** para múltiplas plataformas
- **Agradecimentos** mostrando conhecimento do ecossistema

**Lembre-se de:**

1. Substituir `[Seu Nome]` e links pelos seus dados
2. Adicionar screenshots reais do projeto
3. Atualizar a URL do demo quando fizer deploy
4. Personalizar a seção "Sobre o Projeto" com sua visão

Este README vai definitivamente impressionar recrutadores! 🚀✨
