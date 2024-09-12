import { z } from "zod";

export const accountFormSchema = z.object({
  email: z
    .string()
    .min(4, {
      message: "Please input a valid email address",
    })
    .email({ message: "Please input a valid email address" }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 4 characters",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[\W_]/, {
      message: "Password must contain at least one special character",
    }),
});
