import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";

import { Resolvers } from "../../../graphql/dist/generated-server";
import gql from "graphql-tag";
import * as query from "../../resolvers/query";
import * as mutation from "../../resolvers/mutation";

// TODO: schemaから取得したい
const typeDefs = gql`
  scalar Date

  type Query {
    comments: [Comment!]!
  }
  type Mutation {
    addComment(data: AddCommentInput!): Comment!
  }
  input AddCommentInput {
    content: String!
  }
  type Comment {
    id: ID!
    content: String!
    createdAt: Date!
    updatedAt: Date!
  }
`;

const resolvers: Resolvers = {
  Query: query,
  Mutation: mutation,
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export default startServerAndCreateNextHandler(apolloServer);
