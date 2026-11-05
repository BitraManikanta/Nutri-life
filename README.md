# NutriLife
React + Vite + Tailwind + Framer Motion + Recharts. No database; PDFs/images are stored in the browser's IndexedDB (per device, not shared).
## Run
npm install && npm run dev
## Deploy (Vercel)
Push to GitHub → import in Vercel → Framework: Vite → Build `npm run build` → Output `dist`. vercel.json handles SPA routing.
## Edit
Project text: src/pages/Csp.jsx. Foods: src/pages/Foods.jsx.
