import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { Alert, Grid, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { OrderItemCreateSchema } from "./validationSchema";
import AsyncSelect from "react-select/async";
import Api from "../../pages/api/base";
import _ from "lodash";

const style = {
  height: "100%",
  width: "100%",
  backgroundColor: "#fff",
  pt: 2,
  px: 4,
  pb: 3,
};

export default function ModalAddItem({ open, onClick, onCreate }: any) {
  const [options, setOptions] = useState({ label: "", value: "" });
  const handleSearch = async (name: string) => {
    try {
      const opt = {
        options: {
          url: `/api/products/${encodeURIComponent(name)}`,
        },
      };
      const { data } = await Api(opt);
      const optionsData = data.map((data: any) => ({
        value: data.id,
        label: data.name,
      }));
      if (optionsData.length > 0) {
        return optionsData;
      }
      return [{ label: "Nenum Produto encontrado", value: "", disabled: true }];
    } catch (error) {
      throw error;
    }
  };

  const debouncedLoadOptions = _.debounce(handleSearch, 300);

  const formik = useFormik({
    initialValues: {
      productId: { value: "", label: "" },
      quantity: "",
    },
    validationSchema: OrderItemCreateSchema,
    validateOnChange: false,
    enableReinitialize: true,
    onSubmit: async (values) => {
      onCreate({
        productId: values.productId.value,
        quantity: values.quantity,
      });
    },
  });

  const { errors, values, handleSubmit, handleChange } = formik;

  return (
    <Modal open={open} onClose={(_) => onClick(false)} style={style}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ backgroundColor: "#fff", height: "100%" }}
        p={1}
      >
        <form
          onSubmit={(e) => handleSubmit(e)}
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid item xs={12} md={4} lg={4}>
            <Box>
              <Typography variant="h4">Adicionar itens a mesa</Typography>
            </Box>
            <Box width="100%" pt={1}>
              {errors.productId && (
                <Alert severity="error">{errors.productId}</Alert>
              )}
              <AsyncSelect
                loadOptions={(inputValue: string) => {
                  if (inputValue.length >= 3) {
                    return debouncedLoadOptions(inputValue);
                  }
                }}
                onChange={(e: any) => {
                  formik.setValues({ productId: e });
                }}
                defaultOptions
                cacheOptions
                isClearable
                placeholder="Selecione um produto"
                className="basic-single"
                classNamePrefix="select"
                name="productId"
              />
            </Box>
            <Box width="100%" pt={1}>
              {errors.quantity && (
                <Alert severity="error">{errors.quantity}</Alert>
              )}
              <TextField
                onChange={handleChange}
                placeholder="Quantidade"
                defaultValue={1}
                fullWidth
                type="number"
                value={values.quantity}
                name="quantity"
              />
            </Box>
            <Box display="flex" justifyContent="center" pt={1}>
              <Button
                size="medium"
                variant="contained"
                color="primary"
                type="submit"
              >
                Adicionar item
              </Button>
              &nbsp;&nbsp;
              <Button
                onClick={(_) => onClick(false)}
                size="medium"
                variant="contained"
                color="warning"
              >
                Fechar
              </Button>
            </Box>
          </Grid>
        </form>
      </Grid>
    </Modal>
  );
}
