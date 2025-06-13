import { Router } from 'express';
import apiRoutes from './api/index.js'; 

const router = Router();

console.log('inside index route');
router.use('/api', apiRoutes); 

export default router;
