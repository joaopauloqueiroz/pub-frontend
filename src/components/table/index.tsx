import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, TableFooter, Typography } from "@mui/material";
import { IOrder, IOrderItems } from "./IOrderIterfaces";

const StyledTableCell: any = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export interface IProps {
  onClick: (id: string) => void;
  data: {
    order: IOrder;
    amount: number;
    total: number;
  };
}

const TableOrder: React.FC<IProps> = ({
  onClick,
  data: { order, total, amount },
}) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{}} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Nome</StyledTableCell>
            <StyledTableCell align="center">Qtd.</StyledTableCell>
            <StyledTableCell align="center">R$ Preço</StyledTableCell>
            <StyledTableCell align="center">R$ Total</StyledTableCell>
            <StyledTableCell align="center">Ações</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {order.orderItems.map((item: IOrderItems) => (
            <StyledTableRow key={item.id}>
              <StyledTableCell component="th" scope="row">
                {item.product.name}
              </StyledTableCell>
              <StyledTableCell align="center">{item.quantity}</StyledTableCell>
              <StyledTableCell align="center">
                {Number(item.product.price)?.toFixed(2).replace(".", ",")}
              </StyledTableCell>
              <StyledTableCell align="center">
                {(item.product.price * item.quantity)
                  ?.toFixed(2)
                  .replace(".", ",")}
              </StyledTableCell>
              <StyledTableCell align="center">
                <Button
                  onClick={(_) => onClick(item.id)}
                  variant="contained"
                  size="small"
                  color="error"
                >
                  remover
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
        <TableFooter></TableFooter>
      </Table>
    </TableContainer>
  );
};

export default TableOrder;
