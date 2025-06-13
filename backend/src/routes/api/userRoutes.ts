import express from 'express';
import { loginUser, getAllUsers } from '../../controllers/userController.js';
import { getUserById } from '../../controllers/userController.js';


const router = express.Router();

router.post('/login', loginUser);
router.get('/all',getAllUsers);
router.get('/:id', getUserById);

export default router;
