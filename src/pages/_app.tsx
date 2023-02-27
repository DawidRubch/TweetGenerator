import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

import { api } from "../utils/api";

import { AnimatePresence } from "framer-motion";
import { type NextPage } from "next";
import Head from "next/head";
import type { ReactElement, ReactNode } from "react";
import { SnackbarProvider } from "../hooks/useSnackbar";
import "../styles/globals.css";

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
      </Head>
      <SnackbarProvider>
        <SessionProvider session={session as Session}>
          <AnimatePresence
            mode="wait"
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
