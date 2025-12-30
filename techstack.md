Tech Stack Document: Marine Mega-Store
Frontend
• Framework: Next.js (App Router)

• Styling: Tailwind CSS

• Component Library: shadcn/ui

• Theming: Next-Themes (supporting Light and Dark mode)

• Typography: Google Fonts (Sans-serif and Flex/Variable fonts)

Backend & Database
• Provider: Supabase

• Database: PostgreSQL

• Authentication: Supabase Auth

• Storage: Supabase Storage (for boat galleries and part images)

• Middleware to protect the admin panel

Infrastructure
• Deployment: Vercel (recommended for Next.js)

Animations
- Use Framer Motion for animations. 

supbase env variables are located in the .env file as NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPBASE_SECRET_KEY, NEXT_PUBLIC_SUPABASE_URL
The supbase storage for media is outbard_storage, and the end point is NEXT_PUBLIC_SUPABASE_STORAGE_ENDPOINT

