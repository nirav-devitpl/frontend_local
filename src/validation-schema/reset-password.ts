import { z } from "zod";
import i18n from "@/assets/i18n";

const getTranslation = (key: string) => i18n.t(key);

/**
 * @constant resetPasswordSchema
 * @description Zod schema for validating the reset password form.
 */
export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: getTranslation('RESET_PASSWORD_FORM.VALIDATION.PASSWORD_MIN_LENGTH') })
      .max(20, { message: getTranslation('RESET_PASSWORD_FORM.VALIDATION.PASSWORD_MAX_LENGTH') })
      .refine((password) => /[A-Z]/.test(password), {
        message: getTranslation('RESET_PASSWORD_FORM.VALIDATION.PASSWORD_COMPLEXITY'),
      })
      .refine((password) => /[a-z]/.test(password), {
        message: getTranslation('RESET_PASSWORD_FORM.VALIDATION.PASSWORD_COMPLEXITY'),
      })
      .refine((password) => /\d/.test(password), {
        message: getTranslation('RESET_PASSWORD_FORM.VALIDATION.PASSWORD_COMPLEXITY'),
      })
      .refine((password) => /[^A-Za-z0-9]/.test(password), {
        message: getTranslation('RESET_PASSWORD_FORM.VALIDATION.PASSWORD_COMPLEXITY'),
      }),
    confirmPassword: z
      .string()
      .min(1, { message: getTranslation('RESET_PASSWORD_FORM.VALIDATION.CONFIRM_PASSWORD_REQUIRED') }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: getTranslation('RESET_PASSWORD_FORM.VALIDATION.PASSWORD_MISMATCH'),
  });

