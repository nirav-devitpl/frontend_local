import { z } from "zod";

/**
 * @function getPasswordStrength
 * @description Determines the strength of the password and returns a message with appropriate feedback.
 * @param {string} password - The password to evaluate.
 * @returns {object} - An object containing the strength level and message.
 */
export const getPasswordStrength = (password: string) => {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[^A-Za-z0-9]/.test(password);
  const isLongEnough = password.length >= 8;

  const strengthScore =
    Number(hasUpperCase) +
    Number(hasLowerCase) +
    Number(hasNumber) +
    Number(hasSpecialChar) +
    Number(isLongEnough);

  if (strengthScore === 5) {
    return {
      strength: "strong",
      message: "Great Job! Your password is strong.",
      color: "text-green-500", // Green font
    };
  } else if (strengthScore >= 3) {
    return {
      strength: "moderate",
      message: "Not bad but could be better! Your password is average.",
      color: "text-yellow-500", // Yellow font
    };
  } else {
    return {
      strength: "weak",
      message: "Bad Job! Your password is weak.",
      color: "text-red-500", // Red font
    };
  }
};

/**
 * @constant resetPasswordSchema
 * @description Zod schema for validating the reset password form.
 */
export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .refine((password) => /[A-Z]/.test(password), {
        message: "Password must contain at least one uppercase letter",
      })
      .refine((password) => /[a-z]/.test(password), {
        message: "Password must contain at least one lowercase letter",
      })
      .refine((password) => /\d/.test(password), {
        message: "Password must contain at least one number",
      })
      .refine((password) => /[^A-Za-z0-9]/.test(password), {
        message: "Password must contain at least one special character",
      }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Confirm password does not match",
  })
  .superRefine((data, ctx) => {
    // Check password strength after all validations pass
    const strength = getPasswordStrength(data.password);

    if (strength.strength === "weak") {
      ctx.addIssue({
          path: ["password"],
          message: strength.message,
          code: "unrecognized_keys",
          keys: ["password"]
      });
    }
  });