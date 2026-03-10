import { Metadata } from "next";
import { AuthForm } from "@/modules/auth/ui/form";

export const metadata: Metadata = {
  title: "Register",
  description:
    "Daftar akun Robah untuk mulai memilah sampah dengan AI, mengumpulkan poin daur ulang, dan menjadi bagian dari gerakan lingkungan bersih.",
  robots: { index: false, follow: false },
};

export default function RegisterPage() {
  return <AuthForm variant="register" />;
}
