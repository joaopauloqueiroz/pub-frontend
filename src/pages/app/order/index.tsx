import { Grid, Paper, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { GetServerSideProps } from "next";
import Api from "../../api/base";
import { format } from "date-fns";
import ListOrders from "../../../components/table/listOrders";

export default function Orders({ data }: any) {
  console.log(data);
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
          <Typography variant="h6">Buscar extrato de pedidos</Typography>
        </Grid>
      </Grid>
      <Grid container>
        <ListOrders order={data} />
      </Grid>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const body = {
    start: format(new Date(), "yyyy-MM-dd'T'00:00:00.000'Z'"),
    end: format(new Date(), "yyyy-MM-dd'T'23:59:59.999'Z'"),
    status: "closed",
  };

  try {
    const options = {
      req,
      options: {
        url: `/orders/all`,
        method: "POST",
        data: body,
      },
    };
    const { data } = await Api(options);
    return {
      props: {
        data,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/app",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
