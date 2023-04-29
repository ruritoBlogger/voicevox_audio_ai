import { toBase64 } from "src/utils";
import { MutationResolvers } from "../../../graphql/dist/generated-server";
import { prisma } from "../../prisma";

export const addComment: MutationResolvers["addComment"] = async (
  parent,
  args,
  context,
  info
) => {
  const comment = await prisma.comment.create({
    data: {
      content: args.data.content,
      // TODO: 引数を用いて設定する
      author: "AI",
    },
  });
  return {
    ...comment,
    id: toBase64(`Comment:${comment.id}`),
  };
};
