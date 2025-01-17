import express from 'express';
import { sendMessage } from '../controllers/message.controller.js';
import isAuthenticated from '../middleware/isAuthenticated.js';

const router = express.Router()

router.route('/send/:id').post(isAuthenticated,sendMessage)

export default router