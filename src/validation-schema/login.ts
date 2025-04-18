import { z } from "zod";
import i18n from "@/assets/i18n";

const getTranslation = (key: string) => i18n.t(key);

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: getTranslation("VALIDATION.EMAIL_REQUIRED") })
    .email({ message: getTranslation("VALIDATION.INVALID_EMAIL") }),
  password: z
    .string()
    .min(1, { message: getTranslation("VALIDATION.PASSWORD_REQUIRED") })
    .min(7, { message: getTranslation("VALIDATION.PASSWORD_MIN_LENGTH") })
    .max(12, { message: getTranslation("VALIDATION.PASSWORD_MAX_LENGTH") }),
  rememberMe: z.boolean().optional(),
});