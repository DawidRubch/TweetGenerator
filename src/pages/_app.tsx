import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { AppProps, type AppType } from "next/app";

import { api } from "../utils/api";

import Head from "next/head";
import BaseLayout from "../components/BaseLayout";
import { SnackbarProvider } from "../hooks/useSnackbar";
import "../styles/globals.css";
import { AnimatePresence } from "framer-motion";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);
  const layout = getLayout(<Component {...pageProps} />);
  return (
    <>
      <Head>
        <title>TweetGenerator</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins&display=swap"
          rel="stylesheet"
        ></link>
        <link rel=""></link>
      </Head>
      <SnackbarProvider>
        <SessionProvider session={session as Session}>
          <AnimatePresence
            exitBeforeEnter
            initial={true}
            onExitComplete={() => window.scrollTo(0, 0)}
          >
            <div id="modal-root"></div>
            {layout}
          </AnimatePresence>
        </SessionProvider>
      </SnackbarProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
