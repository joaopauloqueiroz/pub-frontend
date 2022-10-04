import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import {
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { OrderItemCreateSchema } from "./validationSchema";
import AsyncSelect from "react-select/async";
import Api from "../../pages/api/base";
import _ from "lodash";

const style = {
  height: "50%",
  width: "50%",
  backgroundColor: "#fff",
  pt: 2,
  px: 4,
  pb: 3,
};

export default function ModalAddItem({ open, onClick, onCreate }: any) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={onClick}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Encerrar comanda</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Tem certeza que deseja fechar este pedido? Depois de fechado não
            sera mais possivel visualiza-lo
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="error"
            onClick={(_) => onClick("NAO")}
          >
            Não
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={(_) => onClick("SIM")}
            autoFocus
          >
            Sim
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
