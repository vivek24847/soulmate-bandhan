import express, { Router } from "express"
import { login, register } from "../controllers/auth.controllers.js"

const route = Router()

route.post("/register" , register)
route.post("/login" , login)


export {route as authRoute}