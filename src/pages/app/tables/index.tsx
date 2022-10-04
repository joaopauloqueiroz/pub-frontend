import {
  Container,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import { GetServerSideProps } from "next";
import Api from "../../api/base";
import { useRouter } from "next/router";
import { useState } from "react";
import NestedModal from "../../../components/modal/createOrder";
import { Box } from "@mui/system";
import { getSession, signOut } from "next-auth/react";

export interface IOrder {
  id: string;
  status: string;
  responsible?: string;
  discount: string;
  closedBy: string;
  user: {
    name: string;
  };
}
export interface ITable {
  id: string;
  name: string;
  status: string;
  order: IOrder[];
}

const colors: any = {
  open: "#ce4119",
  closed: "green",
  reserved: "#f09c30",
};

const statusTable: any = {
  open: "Em uso",
  closed: "Disponivel",
  reserved: "Reservada",
};

export default function ListTable({ data, user }: any) {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const [tables, setTables] = useState(data);

  const router = useRouter();
  function handleClick({ orderId, tableId }: any) {
    if (!orderId) {
      setId(tableId);
      setOpen(true);
      return;
    }
    router.push(`/app/order/${orderId}`);
  }

  function handleModal(open: boolean) {
    setOpen(false);
  }

  async function handleCreate({ name }: any) {
    try {
      const options = {
        options: {
          url: `/api/orders`,
          method: "POST",
          data: {
            tableId: id,
            responsible: name,
            status: "open",
          },
        },
      };
      const { data } = await Api(options);
      const newTables = tables.map((t: any) => {
        if (t.id === id) {
          t = data;
        }
        return t;
      });
      setTables(newTables);
      router.push(`/app/order/${data.order[0].id}`);
    } catch (error) {
      console.log(error);
    }
    setOpen(false);
  }

  return (
    <Container maxWidth="md">
      <NestedModal open={open} onClick={handleModal} onCreate={handleCreate} />
      <Grid
        container
        mt={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        m={2}
      >
        <Grid item>
          <Box>
            <Typography variant="h4">Mesas</Typography>
          </Box>
        </Grid>
        <Grid item mr={4}>
          <Box>
            <Button
              variant="outlined"
              onClick={(e) => signOut({ callbackUrl: "/" })}
            >
              Sair
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Grid
        container
        mt={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        m={2}
      >
        <Grid item>
          <Box>
            <Typography>Olá, {user?.name}</Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid container>
        {tables.map((table: ITable) => (
          <Grid item xs={12} md={4} lg={4} key={table.id}>
            <Card
              key={table.id}
              onClick={(_) =>
                handleClick({ orderId: table.order[0]?.id, tableId: table.id })
              }
              sx={{
                minWidth: 275,
                maxWidth: "100%",
                m: 2,
                backgroundColor: colors[table.status],
                cursor: "pointer",
              }}
            >
              <CardContent>
                <Typography color="texPrimary" gutterBottom>
                  {table.name}
                </Typography>
                <Typography variant="body2" component="p">
                  Stataus: {statusTable[table.status]}
                </Typography>
                <Typography variant="body2" component="p">
                  Responsavel:{" "}
                  {table.order?.length > 0 && table.order[0].responsible}
                </Typography>
                <Typography variant="body2" component="p">
                  Atendente:{" "}
                  {table.order?.length > 0 && table.order[0].user.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const { user }: any | null = await getSession({ req });
  const options = {
    req,
    options: {
      url: "/tables/all",
      method: "GET",
    },
  };
  const { data } = await Api(options);
  return {
    props: {
      data,
      user,
    },
  };
};
