# dzamora-portfolio

Personal portfolio built as a full-stack monorepo — public-facing web app backed by a REST API.

## Stack

| Layer | Tech |
|-------|------|
| Frontend | Next.js 14 (App Router) · TypeScript · Tailwind CSS |
| Backend | Express · TypeScript · Clean Architecture |
| Database | MongoDB 7 · Mongoose |
| Auth | JWT · Google OAuth 2.0 |
| Containers | Docker · docker-compose |

---

## Project Structure

```
dzamora-portfolio/
├── api/          # REST API — Express + TypeScript
└── web/          # Frontend — Next.js 14
```

### API — Clean Architecture

```
api/src/
├── domain/           # Entities + repository/service interfaces
├── application/      # Use cases (profile, experience, education, skills, projects)
└── infrastructure/   # Express controllers, Mongoose repos, JWT service
```

### Web — App Router

```
web/app/
├── page.tsx            # Home
├── sobre_mi/           # About me
├── stack/              # Tech stack
└── cv_interactivo/     # Interactive CV
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- MongoDB instance (local or Atlas)

### 1. Clone

```bash
git clone https://github.com/your-username/dzamora-portfolio.git
cd dzamora-portfolio
```

### 2. API

```bash
cd api
npm install
```

Create `api/.env`:

```env
PORT=3001
MONGO_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your_secret_here
FRONTEND_URL=http://localhost:3000
```

```bash
npm run dev
# → http://localhost:3001
```

### 3. Web

```bash
cd web
npm install
```

Create `web/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

```bash
npm run dev
# → http://localhost:3000
```

---

## API Endpoints

All public read endpoints require no auth.

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/profile` | Profile info |
| GET | `/api/experience` | Work experience |
| GET | `/api/education` | Education |
| GET | `/api/skills` | Skills |
| GET | `/api/projects` | Projects |
| GET | `/health` | Health check |

---

## License

MIT
