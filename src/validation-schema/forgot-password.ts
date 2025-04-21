import { z } from "zod";
import i18n from "@/assets/i18n";

const getTranslation = (key: string) => i18n.t(key);

export const forgotPasswordSchema = z.object({
  email: z
      .string()
      .min(1, { message: getTranslation('FORGOT_PASSWORD_FORM.VALIDATION.EMAIL_REQUIRED') })
      .email({ message: getTranslation('FORGOT_PASSWORD_FORM.VALIDATION.INVALID_EMAIL') })
});