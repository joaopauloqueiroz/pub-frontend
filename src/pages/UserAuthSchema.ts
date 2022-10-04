import * as Yup from "yup";

export const UserAuthSchema = Yup.object().shape({
  password: Yup.string().required("Campo obrigatório"),
  email: Yup.string().email("E-mail inválido").required("Campo obrigatório"),
});
