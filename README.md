# LCDREAMS ARQ | Architecture & Design Studio

A professional architectural platform built with Next.js 15, featuring immersive project visualization, interactive lead generation tools, and a secure client portal.

## 🌟 Overview

**LCDREAMS ARQ** is founded on the **Dream+Work** philosophy—the synergy between creative vision (Dream) and technical execution (Work). This platform serves as a bridge for clients to explore architectural possibilities through modern technology.

## 🚀 Key Features

- **Immersive Portfolio**: High-impact gallery showcasing residential, commercial, and industrial projects with support for 360° virtual tours.
- **Architectural Style Quiz**: An interactive lead-generation tool that analyzes user preferences to determine their ideal architectural style.
- **Client Portal**: A secure, dedicated space for clients to track project progress, phases, and documentation in real-time.
- **Multilingual Experience**: Fully localized in Spanish (ES), English (EN), and Portuguese (PT) using `next-intl`.
- **Advanced Animations**: Premium UI experience powered by Framer Motion for smooth, professional transitions.

## 🛠️ Technical Architecture

The application leverages the latest **Next.js 15 App Router** architecture with a focus on performance, scalability, and type safety.

### Directory Structure

```text
src/
├── app/
│   ├── [locale]/             # Internationalized route segments
│   │   ├── (admin)/          # Protected administrative dashboard
│   │   ├── homepage/         # Modular homepage components
│   │   ├── portfolio-gallery/# Dynamic project showcase
│   │   └── client-portal/    # Secure client area
│   └── api/                  # Backend endpoints (Leads, Auth, etc.)
├── components/
│   ├── admin/                # Dashboard-specific components
│   ├── common/               # Layout elements (Header, Footer, i18n)
│   └── ui/                   # Reusable atomic design components
├── lib/
│   └── supabase/             # Triple-tiered client setup (Admin/Client/Server)
├── actions/                  # Next.js Server Actions for secure mutations
└── i18n/                     # Internationalization routing logic
```

### Core Technologies

- **Frontend**: [Next.js 15](https://nextjs.org/), [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/)
- **Backend & Auth**: [Supabase](https://supabase.com/)
- **Data Integration**: Google Spreadsheet API (for seamless lead management)
- **Internationalization**: [next-intl](https://next-intl-docs.vercel.app/)

## 🔧 Getting Started

### 1. Requirements
- Node.js 18+ 
- npm / yarn / pnpm

### 2. Installation
```bash
npm install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory and add the following keys (placeholders):
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
GOOGLE_SERVICE_ACCOUNT_EMAIL=your_google_email
GOOGLE_PRIVATE_KEY=your_private_key
```

### 4. Development
```bash
npm run dev
```
The application will be available at [http://localhost:4028](http://localhost:4028).

## 📦 Available Scripts

- `npm run dev` - Start development server on port 4028
- `npm run build` - Build the application for production
- `npm run serve` - Start the production server (next start)
- `npm run lint` - Run ESLint checks
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript compiler checks

## 🙏 Acknowledgments

- **LC Arquitectura** & **Dream.arq** alliance.
- Built with ❤️ by the LCDREAMS team.