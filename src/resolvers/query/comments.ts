import { prisma } from "../../prisma";
import { QueryResolvers } from "../../../graphql/dist/generated-server";

export const comments: QueryResolvers["comments"] = async (
  parent,
  args,
  context,
  info
) => {
  return await prisma.comment.findMany();
};
