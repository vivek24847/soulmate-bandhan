import argon2 from "argon2";

const hashPassword = async (password) => {
  return await argon2.hash(password);
};

export { hashPassword };