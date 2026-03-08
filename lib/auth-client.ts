import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";

export const {
  signIn,
  signUp,
  signOut,
  useSession,
  changePassword,
  resetPassword,
  requestPasswordReset,
  admin,
  updateUser,
} = createAuthClient({
  plugins: [adminClient()],
});
