import express from "express"
import { authRoute } from "./routes/auth.routes.js";

const app = express()

app.use(express.json());

app.get("/", (req, res) => {
  console.log("ROOT ROUTE REACHED");

  res.json({
    message: "Server is working"
  });
});

app.use("/api/auth", (req, res, next) => {
  console.log("AUTH ROUTE REACHED");
  next();
});

app.use("/api/auth" , authRoute )

export default app