import { z } from "zod";

export const FormSchema = z.object({
  email: z.string().describe('email').email({ message: "email is invalid"}),
  password: z.string().min(8, { message: "password must be at least 8 characters long" }),
});

export const CreateWorkspaceFormSchema = z.object({
  workspaceName: z.string().describe('Workspace Name').min(3, { message: "workspace name must be at least 3 characters long" }),
  logo: z.any(),
})