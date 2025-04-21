import { z } from "zod";
import i18n from "@/assets/i18n";

const getTranslation = (key: string) => i18n.t(key);

export const loginSchema = z.object({
  email: z
      .string()
      .min(1, { message: getTranslation('LOGIN_FORM.VALIDATION.EMAIL_REQUIRED') })
      .email({ message: getTranslation('LOGIN_FORM.VALIDATION.INVALID_EMAIL') }),
  password: z
      .string()
      .min(1, { message: getTranslation('LOGIN_FORM.VALIDATION.PASSWORD_REQUIRED') })
      .min(7, { message: getTranslation('LOGIN_FORM.VALIDATION.PASSWORD_MIN_LENGTH') }),
  rememberMe: z.boolean().optional(),
});