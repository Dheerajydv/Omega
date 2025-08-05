import express from 'express'
import { verifyUserAutherization } from '../middlewares/auth.middleware';
import { searchUser } from '../controllers/user.controller';

const router = express.Router()

router.get('/search', verifyUserAutherization, searchUser);

// router.get('/current-chatter', verifyUserAutherization, getCurrentChatter)

export default router