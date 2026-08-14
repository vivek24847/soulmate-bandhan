import express, { Router } from "express"
import { login, loginByPhone, register, verifyOtp } from "../controllers/auth.controllers.js"

const route = Router()

route.post("/register" , register)
route.post("/login" , login)
route.post("/login/phone" , loginByPhone)
route.post("/verify-otp" , verifyOtp)



export {route as authRoute}