import { Grid, Paper, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import Link from "next/link";

const style = {
  display: "flex",
  flexWrap: "wrap",
  "& > :not(style)": {
    m: 1,
    width: 90,
    height: 90,
  },
};

const stylePaper = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export default function Home() {
  return (
    <Container maxWidth="md">
      <Grid
        container
        mt={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item xs={12} sm={12}>
          <Typography variant="h6">Sistema de controle de pedidos</Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item>
          <Box sx={style}>
            <Link href="/app/tables">
              <Paper sx={stylePaper} elevation={3}>
                <Typography>MESAS</Typography>
              </Paper>
            </Link>
          </Box>
        </Grid>
        <Grid item>
          <Box sx={style}>
            <Link href="/app/order">
              <Paper sx={stylePaper} elevation={3}>
                <Typography>PEDIDOS</Typography>
              </Paper>
            </Link>
          </Box>
        </Grid>
        <Grid item>
          <Box sx={style}>
            <Link href="/app/tables">
              <Paper sx={stylePaper} elevation={3}>
                <Typography>EXTRATO</Typography>
              </Paper>
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
