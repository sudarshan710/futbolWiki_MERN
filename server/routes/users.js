import express from 'express';
import { getUser, getFavPlayers, addRemoveFavPlayers } from '../controllers/users.js';
import verifyToken from '../middleware/verifyToken.js';
import verifyRole from '../middleware/verifyRole.js';

const router = express.Router();

// User routes
router.get('/:id', verifyToken, verifyRole(['user', 'admin']), getUser);

// User's favPlayers routes
router.get('/:id/favPlayers', verifyToken, verifyRole(['user', 'admin']), getFavPlayers);

// Add/remove favPlayers routes
router.get('/:id/:playerId', verifyToken, verifyRole(['user', 'admin']), addRemoveFavPlayers);

export default router;

