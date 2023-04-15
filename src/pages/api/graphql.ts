import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { Resolvers } from "../../../graphql/dist/generated-server";
import gql from "graphql-tag";
import * as query from "../../resolvers/query";
import * as mutation from "../../resolvers/mutation";
import { readFileSync } from "fs";
import path from "path";

const typeDefs = gql`
  ${readFileSync(path.join(process.cwd(), "/graphql/schema.graphql"), "utf8")}
`;

const resolvers: Resolvers = {
  Query: query,
  Mutation: mutation,
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export default startServerAndCreateNextHandler(apolloServer);
