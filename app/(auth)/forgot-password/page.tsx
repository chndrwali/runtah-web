import { Metadata } from "next";
import { ForgotPasswordForm } from "@/modules/auth/ui/form/forgot-password-form";

export const metadata: Metadata = {
  title: "Forgot Password",
  description:
    "Lupa kata sandi? Masukkan email Anda untuk menerima tautan reset password akun Robah.",
  robots: { index: false, follow: false },
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
