import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Alamat email tidak valid"),
  password: z.string().min(8, "Kata sandi minimal 8 karakter"),
  remember: z.boolean().optional(),
});

export const registerSchema = loginSchema.extend({
  name: z.string().min(2, "Nama minimal 2 karakter"),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Alamat email tidak valid"),
});

export const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Kata sandi minimal 8 karakter"),
    confirmPassword: z
      .string()
      .min(8, "Konfirmasi kata sandi minimal 8 karakter"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Kata sandi tidak cocok",
    path: ["confirmPassword"],
  });

// Type auth form
export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
