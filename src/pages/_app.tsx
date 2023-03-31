import { CssBaseline } from "@mui/material";
import type { AppProps } from "next/app";
import Head from "next/head";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  SuspenseCache,
} from "@apollo/client";

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
        <ApolloProvider client={client} suspenseCache={cache}>
          <Component {...pageProps} />
        </ApolloProvider>
      </div>
    </>
  );
}

export default MyApp;
