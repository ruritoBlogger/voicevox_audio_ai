import { Grid, Typography } from "@mui/material";
import { useSuspenseQuery_experimental as useSuspenseQuery } from "@apollo/client";
import { CommentsDocument } from "../../../graphql/dist/client/graphql";

export const ChatList = (): JSX.Element => {
  const { data } = useSuspenseQuery(CommentsDocument);

  return (
    <>
      <Grid container spacing={1} direction={"column"} alignItems={"center"}>
        {data.comments.map((comment) => {
          // TODO: author の情報を用いて表示内容を変更する
          return (
            <Grid item key={comment.id}>
              <Typography variant={"body2"}>{comment.content}</Typography>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
