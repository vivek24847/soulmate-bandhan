import { Router } from "express";
import { getMyProfileData, profileUpdate } from "../controllers/profile.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";


const route = Router()

route.put("/" ,authMiddleware, profileUpdate  )
route.get("/" ,authMiddleware, getMyProfileData  )



export {route as profileRoute}