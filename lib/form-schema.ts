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

export const onboardingSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  appGoal: z.string().min(1, "Harap pilih tujuan penggunaan"),
  area: z.string().min(1, "Harap pilih area / kecamatan tempat tinggal"),
  address: z.string().min(10, "Detail alamat penjemputan minimal 10 karakter"),
  notificationsEnabled: z.boolean().default(false),
});

export const updateUserSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  phone: z
    .string()
    .min(10, "Nomor telepon minimal 10 digit")
    .optional()
    .or(z.literal("")),
  image: z.string().url("URL gambar tidak valid").optional().or(z.literal("")),
  area: z.string().optional().or(z.literal("")),
  address: z.string().optional().or(z.literal("")),
  appGoal: z.string().optional().or(z.literal("")),
  notificationsEnabled: z.boolean().default(false),
  onboardingCompleted: z.boolean().default(false),
});

// Type auth form
export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
export type OnboardingFormValues = z.infer<typeof onboardingSchema>;
export type UpdateUserFormValues = z.infer<typeof updateUserSchema>;
