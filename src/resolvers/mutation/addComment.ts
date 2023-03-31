import { MutationResolvers } from "../../../graphql/dist/generated-server";
import { prisma } from "../../prisma";

export const addComment: MutationResolvers["addComment"] = async (
  parent,
  args,
  context,
  info
) => {
  return await prisma.comment.create({
    data: {
      content: args.data.content,
    },
  });
};
