import { Alert, Box, Button, Container, TextField } from "@mui/material";
import type { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { FormEvent } from "react";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { UserAuthSchema } from "./UserAuthSchema";

const Login: NextPage = () => {
  const router = useRouter();
  const { error } = router.query;

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: UserAuthSchema,
    validateOnChange: false,
    enableReinitialize: true,
    onSubmit: async (values) => {
      await signIn("credentials", {
        redirect: true,
        ...values,
        callbackUrl: "/app",
      });
    },
  });

  const { errors, values, handleChange, handleSubmit } = formik;
  return (
    <Container component="main" maxWidth="xs">
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Image
            src="/assets/LogoArchCod.png"
            alt="Logo do site"
            width={600}
            height={200}
          />
        </Box>
        {error && (
          <Box>
            <Alert severity="error">Erro, e-mail ou senhas inválidos</Alert>
          </Box>
        )}
        <Box>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="E-mail"
            name="email"
            autoComplete="email"
            autoFocus
            value={values.email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            value={values.password}
            onChange={handleChange}
          />
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          width="100%"
          alignItems="center"
          justifyItems="center"
        >
          <Button
            type="submit"
            size="large"
            fullWidth={true}
            variant="outlined"
          >
            Login
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default Login;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  if (session) {
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
