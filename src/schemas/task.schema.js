import { z } from "zod";

export const createTaskSchema = z.object({
    title: z.string({
        required_error: "Titulo requerido",
        }).min(1, "El título no puede estar vacío"),
        description: z.string({
              required_error: "Descipcion debe ser un  String ",
        }),
        date: z.string().datetime().optional(),   
});