import { z } from "zod";

export const FormSchema = z.object({
  email: z.string().describe('email').email({ message: "email is invalid"}),
  password: z.string().min(8, { message: "password must be at least 8 characters long" }),
});

