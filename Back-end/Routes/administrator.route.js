import express from "express";
import  createAdministrator  from "../Controller/administrator.controller.js";

const router = express.Router();

// create routes
router.post('/create',createAdministrator)





export default router;
