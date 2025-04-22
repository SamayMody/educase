import { z } from "zod";

export const SchoolSchema = z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    address: z.string().min(1),
    latitude: z.number(),
    longitude: z.number(),
});

export type School = z.infer<typeof SchoolSchema>;
export const CreateSchoolSchema = SchoolSchema.omit({ id: true });

