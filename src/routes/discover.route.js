import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { discoverPeople } from "../controllers/discover.controller.js";

const router = Router()

router.get("/" , authMiddleware , discoverPeople)


export{router as discoverRoute}