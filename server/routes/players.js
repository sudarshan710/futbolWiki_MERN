import express from 'express';
import { getPlayers, removePlayer, getPlayer } from '../controllers/players.js';
import verifyToken from '../middleware/verifyToken.js';
import verifyRole from '../middleware/verifyRole.js';

const router = express.Router();

// Player routes
router.get('/', verifyToken, verifyRole(['user']), getPlayers);
router.get('/:playerId', verifyToken, verifyRole(['user']), getPlayer);
router.delete('/removePlayer/:playerId', verifyToken, verifyRole(['admin']), removePlayer);



export default router;