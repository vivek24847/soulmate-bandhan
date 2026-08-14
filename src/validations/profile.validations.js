import { z } from "zod";

const profileSchema = z.object({
  gender: z.string().min(1, "Gender is required"),

  dateOfBirth: z.string().min(1, "Date of birth is required"),

  religion: z.string().min(1, "Religion is required"),

  caste: z.string().min(1, "Caste is required"),

  location: z.object({
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    country: z.string().min(1, "Country is required"),
  }),

  education: z.string().min(1, "Education is required"),

  occupation: z.string().min(1, "Occupation is required"),

  interests: z
    .array(z.string())
    .min(1, "At least one interest is required"),

  about: z
    .string()
    .min(20, "About should contain at least 20 characters"),
});

export {
  profileSchema,
};