import z from "zod";

const registerationSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please enter a valid email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password cannot exceed 128 characters"),

  phone: z
    .string()
    .trim()
});

export {registerationSchema}
