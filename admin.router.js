import express from 'express'
import *as admincontroller from '../controller/admin.controller.js'
import { verifyToken } from '../middleware/token.js';  // Import the middleware


const router = express.Router();


router.get("/fetch",verifyToken, admincontroller.fetch);

router.post("/save",verifyToken, admincontroller.save);

router.post("/loginAdmin",admincontroller.loginAdmin);

router.post("/saveOrderDetail",verifyToken, admincontroller.saveOrderDetail);

router.get("/orderDetails", verifyToken, admincontroller.fetchOrders);

router.delete("/deleteOrder",verifyToken, admincontroller.deleteOrder);

router.get("/UserWithOrd", verifyToken, admincontroller.fetchWithOrders);


export default router;