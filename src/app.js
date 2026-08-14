import express from "express"
import { authRoute } from "./routes/auth.routes.js";
import { profileRoute } from "./routes/profile.routes.js";
import { discoverRoute } from "./routes/discover.route.js";

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
app.use("/api/profile" , profileRoute )
app.use("/api/discover" ,  discoverRoute)

export default app