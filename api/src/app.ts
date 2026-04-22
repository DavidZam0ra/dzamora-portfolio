import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './infrastructure/db/connection';
import { errorHandler } from './infrastructure/http/middleware/error.middleware';

import profileRoutes from './infrastructure/http/routes/profile.routes';
import experienceRoutes from './infrastructure/http/routes/experience.routes';
import educationRoutes from './infrastructure/http/routes/education.routes';
import skillsRoutes from './infrastructure/http/routes/skills.routes';
import projectsRoutes from './infrastructure/http/routes/projects.routes';
import authRoutes from './infrastructure/http/routes/auth.routes';

const app = express();
const PORT = process.env.PORT ?? 3001;

const allowedOrigin = process.env.FRONTEND_URL ?? 'http://localhost:3000';
app.use(cors({ origin: allowedOrigin }));
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/profile', profileRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/skills', skillsRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/auth', authRoutes);

app.use(errorHandler);

async function bootstrap() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`[API] Running on http://localhost:${PORT}`);
  });
}

bootstrap().catch((err) => {
  console.error('[API] Failed to start:', err);
  process.exit(1);
});

export default app;
