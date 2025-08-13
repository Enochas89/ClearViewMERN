# ClearView (Alpha scaffold)

Quick-start MERN scaffold with placeholder auth, env-based API URL, and mock data.

## Structure
- **client/** Vite + React + Tailwind. Axios uses `VITE_API_URL` (default `http://localhost:5000`).
- **server/** Express with in-memory mock data and simple routes.

## Run locally
```bash
# in one terminal
cd server
npm install
npm run dev

# in another terminal
cd client
npm install
npm run dev
```
Client runs on http://localhost:5173, Server on http://localhost:5000 by default.

## Deploying / GitHub best practice
- Store API base URL in **client/.env** via `VITE_API_URL=https://your-api.example.com`.
- Keep secrets out of Git; commit **.env.example** only.
- Use GitHub Actions for CI and separate deploy steps for client (static hosting) and server (Render/Fly.io/Vercel/EC2).
