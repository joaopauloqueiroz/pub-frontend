import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { Alert, Grid, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { OrdercreateSchema } from "./validationSchema";

const style = {
  height: "100%",
  width: "100%",
  backgroundColor: "#fff",
  pt: 2,
  px: 4,
  pb: 3,
};

export default function NestedModal({ open, onClick, onCreate }: any) {
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: OrdercreateSchema,
    validateOnChange: false,
    enableReinitialize: true,
    onSubmit: async (values) => {
      onCreate(values);
    },
  });
  const { errors, values, handleChange, handleSubmit } = formik;
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
              <Typography variant="h4">Iniciar mesa</Typography>
            </Box>
            <Box width="100%" pt={1}>
              {errors.name && <Alert severity="error">{errors.name}</Alert>}
              <TextField
                onChange={handleChange}
                placeholder="Responsável pela mesa"
                fullWidth
                value={values.name}
                name="name"
              />
            </Box>
            <Box display="flex" justifyContent="center" pt={1}>
              <Button
                size="medium"
                variant="contained"
                color="primary"
                type="submit"
              >
                Abrir mesa
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
