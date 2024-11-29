import express from 'express'
import *as usercontroller from '../controller/user.controlller.js'
import { verifyToken } from '../middleware/token.js';  // Import the middleware

const router = express.Router();

router.post("/save",verifyToken ,usercontroller.save);

router.get("/fetch", verifyToken ,usercontroller.fetch);

router.delete("/delete",verifyToken ,usercontroller.removeUser);

router.put("/update/:id",verifyToken ,usercontroller.editUser);

export default router;
