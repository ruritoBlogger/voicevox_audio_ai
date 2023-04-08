import { CssBaseline } from "@mui/material";
import type { AppProps } from "next/app";
import Head from "next/head";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  SuspenseCache,
} from "@apollo/client";
import React from "react";

const client = new ApolloClient({
  uri: "http://localhost:3000/api/graphql",
  cache: new InMemoryCache(),
});

const cache = new SuspenseCache();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>LTSupportTool</title>
      </Head>
      <div>
        <CssBaseline />
        <React.StrictMode>
          <ApolloProvider client={client} suspenseCache={cache}>
            <Component {...pageProps} />
          </ApolloProvider>
        </React.StrictMode>
      </div>
    </>
  );
}

export default MyApp;
