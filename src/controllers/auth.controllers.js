import User from "../models/user.model.js";
import { hashPassword } from "../utils/password.js";
import { handleError, handleSuccess } from "../utils/responseHandler.js";
import { registerationSchema } from "../validations/auth.validations.js";

const register = async (req, res) => {
  try {
    const result = registerationSchema.safeParse(req.body);

    if (!result.success) {
      return handleError(res, result.error.flatten().fieldErrors, 400);
    }

    const data = result.data;

    const existingUser = await User.findOne({
      $or: [{ email: data.email }, { phone: data.phone }],
    });

    if (existingUser) {
      return handleError(
        res,
        "User with same phone no or email already exists",
        400,
      );
    }

    const hashedPassword = await hashPassword(data.password);

    const user = await User.create({
      ...data,
      password: hashedPassword,
    });

    const userResponse = user.toObject();

    delete userResponse.password;

    return handleSuccess(res, "Registration successful", userResponse, 200);
  } catch (error) {
    console.log("REGISTER ERROR:", error.message);
    return handleError(res, error.message, 400);
  }
};

export { register };
