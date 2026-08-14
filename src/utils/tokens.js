import { SignJWT } from "jose";

const generateAccessToken = async (userId) => {

  const jwtSecret = process.env.JWT_SECRET;


  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not configured");
  }

  const secret = new TextEncoder().encode(jwtSecret);


  return await new SignJWT({
    userId: userId.toString(),
  })
    .setProtectedHeader({
      alg: "HS256",
    })
    .setIssuedAt()
    .setExpirationTime("15m")
    .sign(secret);
};

export { generateAccessToken };