import { Router } from 'express';
import userRoutes from './userRoutes.js';
import kudoRoutes from './kudoRoutes.js';

const router = Router();

// Index route will take to the specific routes.
router.use('/users', userRoutes);
router.use('/kudos', kudoRoutes);

export default router;
