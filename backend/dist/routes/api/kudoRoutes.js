import express from 'express';
import { giveKudo, getReceivedKudos } from '../../controllers/kudoController.js';
import { getKudosByUserId } from '../../controllers/kudoController.js';
const router = express.Router();
router.post('/', giveKudo);
router.get('/received/:userId', getReceivedKudos);
router.get('/:userId', getKudosByUserId);
export default router;
