import express from "express";
import {
  createUser,
  updateUser,
  getAllUsers,
  deleteUser,
} from "../Controller/user.conntroller.js";

const router = express.Router();

router.post("/createUser", createUser);
router.patch("/updateUser/:id", updateUser);
router.get("/getAllUsers", getAllUsers);
router.delete('/deleteUser/:id',deleteUser);

export default router;
