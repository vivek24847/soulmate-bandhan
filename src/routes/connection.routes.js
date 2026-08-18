import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { connecttionsListing, pendingRequests, sendRequest, updateRequestStatus } from "../controllers/connection.controller.js";

const router = Router()

router.post("/send/:userId" , authMiddleware , sendRequest)
router.post("/status/:connectId" , authMiddleware , updateRequestStatus)
router.get("/pending" , authMiddleware , pendingRequests)
router.get("/my" , authMiddleware , connecttionsListing)



 
export {router as connectionRouter}