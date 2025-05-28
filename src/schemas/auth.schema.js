import { z } from "zod";

export const registerSchema = z.object({
    username: z.string({
        required_error: "Usuario requerido",
    }),
    email: z.string({
        required_error: "E-mail requerido",
    })
      .email({
        message: "E-mail invalido",
      }),
    password: z.string({
        required_error: "Password requerido",
      })
      .min(6,{
         message: "El Passwor debe tener 6 caracteres",
      }), 
});

export const loginSchema = z.object({
    email: z
      .string({
        required_error: "E-mail requerido",
      })
      .email({
         message: "Email invalido",

      }),
    password: z
      .string({
        required_error: "Password requerido"
      })
      .min(6,{
        message: "Password invalido @",

      }),  

});