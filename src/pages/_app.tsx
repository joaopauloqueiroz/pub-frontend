import { ThemeProvider } from "@mui/material/styles";
import type { AppProps } from "next/app";
import "../styles/nprogress.css";
import theme from "../theme/theme";
import { SessionProvider } from "next-auth/react";
import Router from "next/router";
import NProgress from "nprogress";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;
