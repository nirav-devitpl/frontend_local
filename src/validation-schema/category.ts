import { z } from "zod";

export const categorySchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    parentCategory: z.object({
        label: z.string().optional(),
        value: z.string().optional(),
    }).optional(),
    status: z.enum(["active", "inactive"]),
});
