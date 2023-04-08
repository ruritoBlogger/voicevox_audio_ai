import { prisma } from "../../prisma";
import {
  QueryResolvers,
  Comment,
} from "../../../graphql/dist/generated-server";
import { toBase64 } from "src/utils";

export const comments: QueryResolvers["comments"] = async (
  parent,
  args,
  context,
  info
) => {
  const comments = await prisma.comment.findMany();
  return comments.map<Comment>((comment) => ({
    ...comment,
    id: toBase64(`Comment:${comment.id}`),
  }));
};
