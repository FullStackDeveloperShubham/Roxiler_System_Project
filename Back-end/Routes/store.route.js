import express from 'express';
import {createStore , updateStore , getAllStores , deleteStore} from '../Controller/store.controller.js';

const router = express.Router();

router.post('/store', createStore);
router.patch('/UpdateStore/:id', updateStore); 
router.get('/getAllStore',getAllStores)
router.delete('/deleteStore/:id',deleteStore)

export default router;