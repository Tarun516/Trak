# Trak

This is a [Next.js](https://nextjs.org) project bootstrapped with [v0](https://v0.app).

## Built with v0

This repository is linked to a [v0](https://v0.app) project. You can continue developing by visiting the link below -- start new chats to make changes, and v0 will push commits directly to this repo. Every merge to `main` will automatically deploy.

[Continue working on v0 →](https://v0.app/chat/projects/prj_gG6O9lQEzAGiVxSDpDUMUnUhOy2l)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Custom Database Setup (Waitlist + CTA Tracking)

This app now stores:
- waitlist signups (`name`, `contact`)
- CTA events (including `Start Free — 7 Days Pro` clicks)

### 1) Configure your database URL

Create `.env.local` from `.env.example` and set:

```bash
CUSTOM_DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DATABASE
```

`DATABASE_URL` is also supported as a fallback.

### 2) Start the app

```bash
pnpm dev
```

Tables are auto-created on first API write:
- `waitlist_signups`
- `cta_events`

## Learn More

To learn more, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [v0 Documentation](https://v0.app/docs) - learn about v0 and how to use it.

<a href="https://v0.app/chat/api/kiro/clone/Tarun516/Trak" alt="Open in Kiro"><img src="https://pdgvvgmkdvyeydso.public.blob.vercel-storage.com/open%20in%20kiro.svg?sanitize=true" /></a>
