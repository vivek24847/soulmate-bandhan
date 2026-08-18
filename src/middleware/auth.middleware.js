import { jwtVerify, errors } from "jose";
import User from "../models/user.model.js";
import { handleError } from "../utils/responseHandler.js";



const authMiddleware = async (req, res, next) => {
  try {
    const secret = new TextEncoder().encode(
  process.env.JWT_SECRET
);
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return handleError(
        res,
        "Authorization token is required",
        401
      );
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return handleError(
        res,
        "Invalid authorization header",
        401
      );
    }

    const { payload } = await jwtVerify(token, secret);

    const userId = payload.userId;

    if (!userId) {
      return handleError(
        res,
        "Invalid token payload",
        401
      );
    }

    const user = await User.findById(userId);

    if (!user) {
      return handleError(
        res,
        "User not found",
        401
      );
    }

    req.user = user;

    next();

  } catch (error) {

    console.log("AUTH MIDDLEWARE ERROR:", error);

    // Token has expired
    if (error instanceof errors.JWTExpired) {
      return handleError(
        res,
        "Access token has expired. Please login again.",
        401
      );
    }

    // Other JWT errors
    if (error instanceof errors.JOSEError) {
      return handleError(
        res,
        "Invalid access token.",
        401
      );
    }

    // Unexpected server error
    return handleError(
      res,
      "Authentication failed.",
      500
    );
  }
};

export { authMiddleware };