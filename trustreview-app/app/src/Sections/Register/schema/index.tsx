import * as yup from "yup";

export const createUserSchema = yup.object({
  name: yup
    .string()
    .required("O nome é obrigatório")
    .min(6, "O nome deve ter pelo menos 6 caracteres")
    .max(150, "O nome deve ter no máximo 150 caracteres"),

  email: yup
    .string()
    .required("O email é obrigatório")
    .email("Email inválido")
    .min(6, "O email deve ter pelo menos 6 caracteres")
    .max(80, "O email deve ter no máximo 80 caracteres"),

  password: yup
    .string()
    .required("A senha é obrigatória")
    .min(8, "A senha deve ter pelo menos 8 caracteres")
    .max(50, "A senha deve ter no máximo 50 caracteres"),
});
