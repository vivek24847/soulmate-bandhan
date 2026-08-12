import express, { Router } from "express"
import { register } from "../controllers/auth.controllers.js"

const route = Router()

route.post("/register" , register)


export {route as authRoute}