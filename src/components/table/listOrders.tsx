import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableFooter } from "@mui/material";
import { IOrder } from "./IOrderIterfaces";

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

const ListOrders: React.FC<any> = ({ order }: any) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{}} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Responsável</StyledTableCell>
            <StyledTableCell align="center">Atendente</StyledTableCell>
            <StyledTableCell align="center">R$ Total</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {order.map((item: IOrder) => (
            <StyledTableRow key={item.id}>
              <StyledTableCell component="th" scope="row">
                {item.responsible}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {item.user.name}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {Number(item.amount)?.toFixed(2).replace(".", ",")}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
        <TableFooter></TableFooter>
      </Table>
    </TableContainer>
  );
};

export default ListOrders;
