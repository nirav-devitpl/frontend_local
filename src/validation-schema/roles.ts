import { z } from 'zod';
import i18n from 'i18next'; // Import i18next to fetch translations dynamically

// Function to dynamically fetch translations
const getTranslation = (key: string) => i18n.t(key);

// Changed from a constant schema to a function that returns the schema
export const getRoleSchema = ({ id }: { id: string | undefined }) => {
  console.log('getRoleSchema', id); 
  return z.object({
    role_name: z.string().min(1, { message: getTranslation('VALIDATION.ROLE_NAME_REQUIRED') }),
    permissions: id
      ? z.record(z.string(), z.array(z.string()).optional()).optional()
      : z.record(z.string(), z.array(z.string()).optional()).optional(),
    avaiilablePermissions: z.array(z.string()).optional(),
  });
};