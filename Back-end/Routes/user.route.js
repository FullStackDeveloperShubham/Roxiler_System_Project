import express from 'express';
import createUser from '../Controller/user.conntroller.js';

const router = express.Router();

router.post('/createUser', createUser);

export default router;