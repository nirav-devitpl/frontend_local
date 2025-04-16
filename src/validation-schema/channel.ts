import { z } from 'zod';
import i18n from 'i18next'; // Import i18next to fetch translations dynamically

// Function to dynamically fetch translations
const getTranslation = (key: string) => i18n.t(key);

// Changed from a constant schema to a function that returns the schema
export const getChannelSchema = () => {
  return z.object({
    name: z.string().min(1, { message: getTranslation('VALIDATION.NAME_REQUIRED') }),
    code: z.string()
      .min(1, { message: getTranslation('VALIDATION.CODE_REQUIRED') }) 
      .regex(/^\d+$/, { message: getTranslation('VALIDATION.INVALID_CODE') })
      .max(14, { message: getTranslation('VALIDATION.INVALID_CODE') }),
    type: z.any().refine((val) => val !== null, {
      message: getTranslation('VALIDATION.TYPE_REQUIRED'),
    }),
    source: z.any().refine((val) => val !== null, {
      message: getTranslation('VALIDATION.SOURCE_REQUIRED'),
    }),
    username: z.string().min(1, { message: getTranslation('VALIDATION.USERNAME_REQUIRED') }),
    password: z
      .string()
      .min(1, {
        message: getTranslation('VALIDATION.PASSWORD_REQUIRED'),
      })
      .min(7, {
        message: getTranslation('VALIDATION.PASSWORD_MIN_LENGTH'),
      })
      .max(12, {
        message: getTranslation('VALIDATION.PASSWORD_MAX_LENGTH'),
      }),
    client_code: z
      .string()
      .min(1, { message: getTranslation('VALIDATION.CLIENT_CODE_REQUIRED') }) 
      .regex(/^\d+$/, { message: getTranslation('VALIDATION.INVALID_CLIENT_CODE') })
      .max(14, { message: getTranslation('VALIDATION.INVALID_CLIENT_CODE') }),
  });
};