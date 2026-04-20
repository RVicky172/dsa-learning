import { Router } from 'express';

const router = Router();

router.get('/', (_req, res) => {
  res.status(200).json({ ok: true, service: 'dsa-learning-backend' });
});

export default router;
