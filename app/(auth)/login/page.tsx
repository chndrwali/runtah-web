import { Metadata } from "next";
import { AuthForm } from "@/modules/auth/ui/form";

export const metadata: Metadata = {
  title: "Login",
  description:
    "Masuk ke akun Robah Anda untuk mulai mengklasifikasi sampah, mengumpulkan poin, dan berkontribusi pada lingkungan yang lebih bersih.",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return <AuthForm variant="login" />;
}
