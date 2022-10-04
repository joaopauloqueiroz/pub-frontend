import * as React from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Hidden,
  Typography,
} from "@mui/material";
import { GetServerSideProps } from "next";
import Api from "../../api/base";
import { useState, useContext } from "react";
import TableOrder from "../../../components/table";
import Loader from "../../../components/loader";
import { OrderContext } from "../../../contexts/orderContext";
import ModalAddItem from "../../../components/modal/addItem";
import CloseOrder from "../../../components/modal/closeOrder";
import { useRouter } from "next/router";

const ListOrder: React.FC = ({ data }: any) => {
  const [order, setOrder] = useState(data);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [modalOrder, setModalOrder] = useState(false);
  const router = useRouter();

  const handleClick = async (id: string): Promise<void> => {
    setIsLoading(true);
    try {
      const options = {
        options: {
          url: `/api/order-items/${id}`,
          method: "DELETE",
        },
      };
      await Api(options);
      await loadItems(data.order.id as string);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const loadItems = async (orderId: string): Promise<void> => {
    try {
      const options = {
        options: {
          url: `/api/orders/${orderId}`,
          method: "GET",
        },
      };
      const { data } = await Api(options);
      setOrder(data);
    } catch (error) {
      console.log(error);
    }
  };

  function handleModal(open: boolean) {
    setOpen(false);
  }

  async function handleCreate(values: any) {
    try {
      const body = { orderId: order.order.id, ...values };
      const options = {
        options: {
          url: `/api/order-items/create`,
          method: "POST",
          data: body,
        },
      };
      await Api(options);
      await loadItems(order.order.id as string);
    } catch (error) {
      console.log(error);
    }
    setOpen(false);
  }

  async function handleModalCloseOrder(condition: any) {
    if (condition === "NAO") {
      setModalOrder(false);
      return;
    }

    try {
      const options = {
        options: {
          url: `/api/orders/${order?.order.id}`,
          method: "PUT",
        },
      };
      await Api(options);
      setModalOrder(false);
      router.push("/app");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <OrderContext.Provider value={{ isLoading, setIsLoading: setIsLoading }}>
      {isLoading && <Loader />}
      <ModalAddItem open={open} onClick={handleModal} onCreate={handleCreate} />
      <CloseOrder open={modalOrder} onClick={handleModalCloseOrder} />
      <Container>
        <Grid
          container
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid
            item
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box mt={2} mb={1}>
              <Typography variant="h4">Descrição do pedido</Typography>
            </Box>
          </Grid>
          <Grid item>
            <Box p={1}>
              <Button
                onClick={(e) => setModalOrder(true)}
                variant="contained"
                color="primary"
              >
                <Hidden mdDown>Fechar pedido</Hidden>
                <Hidden mdUp>Fechar</Hidden>
              </Button>
              &nbsp;&nbsp;
              <Button
                onClick={(e) => setOpen(true)}
                variant="contained"
                color="primary"
              >
                <Hidden mdDown>Adicionar item</Hidden>
                <Hidden mdUp> +</Hidden>
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Grid item pb={1}>
          <Typography>
            Total do pedido:{" "}
            <span className="span-bold">{order?.total.replace(".", ",")}</span>
          </Typography>
          <Typography>
            Responsvel pelo mesa:{" "}
            <span className="span-bold">{order?.order?.responsible}</span>
          </Typography>
        </Grid>
        <TableOrder onClick={handleClick} data={order} />
      </Container>
    </OrderContext.Provider>
  );
};

export default ListOrder;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { id } = query;
  if (!id) {
    return {
      redirect: {
        destination: "/app",
        permanent: false,
      },
    };
  }
  try {
    const options = {
      req,
      options: {
        url: `/orders/${id}`,
        method: "GET",
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
};
