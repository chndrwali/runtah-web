import { Metadata } from "next";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";
import { ResetPasswordForm } from "@/modules/auth/ui/form/reset-password-form";

export const metadata: Metadata = {
  title: "Reset Password",
  description:
    "Buat kata sandi baru untuk mengamankan akun Robah Anda dan lanjutkan berkontribusi pada lingkungan yang lebih bersih.",
  robots: { index: false, follow: false },
};

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <ResetPasswordForm />
    </Suspense>
  );
}
