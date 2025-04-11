import { z } from 'zod';
 
const passwordRegex =  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).*$/;
 
export const channelSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  code: z.string().min(1, { message: 'Code is required' }),
  type: z.any().refine((val) => val !== null, {
    message: 'Type is required',
  }),
  source: z.any().refine((val) => val !== null, {
    message: 'Source is required',
  }),
 
  username: z.string().min(1, { message: 'Username is required' }),
  password: z.string()
  .min(1, {
    message: 'Password is required',
  })
  .min(7, {
    message: 'Password must be at least 7 characters long',
  })
  .max(12, {
    message: 'Password must not exceed 12 characters',
  })
  .regex(passwordRegex, {
    message:
      "Your password must have at least 1 uppercase, lowercase, digit & special character",
  }),
  client_code: z.string().min(1, { message: 'Client Code is required' }),
});