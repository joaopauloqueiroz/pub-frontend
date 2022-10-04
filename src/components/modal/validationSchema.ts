import * as Yup from "yup";

export const OrdercreateSchema = Yup.object().shape({
  name: Yup.string().min(2, "Nome muito curto!").required("Campo obrigatório"),
});

export const OrderItemCreateSchema = Yup.object().shape({
  productId: Yup.object().shape({
    label: Yup.string().required("Campo obrigatório"),
    value: Yup.string().required("Campo obrigatório"),
  }),
  quantity: Yup.string().required("Campo obrigatório"),
});
