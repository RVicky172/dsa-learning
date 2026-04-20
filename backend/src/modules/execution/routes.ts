import { Router } from 'express';

const router = Router();

router.post('/run', (_req, res) => {
  res.status(501).json({ message: 'TODO: run code in execution worker' });
});

export default router;
