import express from 'express';
import {createStore , updateStore , getAllStores} from '../Controller/store.controller.js';

const router = express.Router();

router.post('/store', createStore);
router.patch('/UpdateStore/:id', updateStore); 
router.get('/getAllStore',getAllStores)

export default router;