import OTP from "../models/otp.model.js";
import User from "../models/user.model.js";
import { generateOtp } from "../utils/otp.js";
import { hashPassword, isPasswordCorrect } from "../utils/password.js";
import { handleError, handleSuccess } from "../utils/responseHandler.js";
import { generateAccessToken } from "../utils/tokens.js";
import {
  loginByPhoneSchema,
  loginSchema,
  registerationSchema,
  verifyOtpSchema,
} from "../validations/auth.validations.js";

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

const login = async (req, res) => {
  try {
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
      return handleError(res, result.error.flatten().fieldErrors, 400);
    }

    const data = result.data;
    const user = await User.findOne({
      email: data.email,
    });

    if (!user) {
      return handleError(res, "Invalid email or password", 400);
    }

    const samePassword = await isPasswordCorrect(user.password, data.password);

    console.log("whatUser", samePassword);

    if (!samePassword) {
      return handleError(res, "Invalid email or password", 400);
    }

    const accessToken = await generateAccessToken(user._id);

    const userResponse = user.toObject();

    delete userResponse.password;

    return handleSuccess(
      res,
      "User logged in successfully",
      { user: userResponse, accessToken },
      200,
    );
  } catch (error) {
    return handleError(res, error, 500);
  }
};

const loginByPhone = async (req, res) => {
  try {
    const result = loginByPhoneSchema.safeParse(req.body);

    if (!result.success) {
      return handleError(res, result.error.flatten().fieldErrors, 400);
    }

    const data = result.data;

    const user = await User.findOne({
      phone: data.phone,
    });

    if (!user) {
      return handleError(res, "User not found with this phone number", 400);
    }

    await OTP.deleteMany({
      userId: user._id,
      used: false,
    });

    const otp = generateOtp();

    const otpHash = await hashPassword(otp);

    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await OTP.create({
      userId: user._id,
      otpHash,
      expiresAt,
    });

    return handleSuccess(
      res,
      "OTP sent to yor phone successfully",
      {
        otp,
      },
      200,
    );
  } catch (error) {
    console.log("error", error);
    handleError(res, error, 500);
  }
};

const verifyOtp = async (req, res) => {
  try {
    const result = verifyOtpSchema.safeParse(req.body);

    if (!result.success) {
      return handleError(res, result.error.flatten().fieldErrors, 400);
    }

    const data = result.data;

    const user = await User.findOne({
      phone: data.phone,
    });

    if (!user) {
      return handleError(res, "Incorrect phone number or OTP", 400);
    }

    const otp = await OTP.findOne({
      userId: user._id,
      used: false,
    });

    console.log("whatotp", otp);

    if (!otp) {
      return handleError(res, "Incorrect phone number or OTP", 400);
    }

    const sameOtp = await isPasswordCorrect(otp.otpHash, data.otp);

    console.log("whatsame", sameOtp);

    if (!sameOtp) {
      return handleError(res, "Incorrect phone number or OTP", 400);
    }

    const accessToken = await generateAccessToken(user._id);

    const userResponse = user.toObject();

    delete userResponse.password;

    return handleSuccess(
      res,
      "User login successfully",
      { userResponse, accessToken },
      200,
    );
  } catch (error) {
    console.log("error", error);

    handleError(res, error, 500);
  }
};

export { register, login, loginByPhone, verifyOtp };
