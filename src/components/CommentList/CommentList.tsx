import { List, ListItem, ListItemText } from "@mui/material";
import { useSuspenseQuery_experimental as useSuspenseQuery } from "@apollo/client";
import { CommentsDocument } from "../../../graphql/dist/client/graphql";

export const CommentList = (): JSX.Element => {
  const { data } = useSuspenseQuery(CommentsDocument);
  return (
    <>
      <List>
        {data.comments.map((comment) => (
          <ListItem key={comment.id}>
            <ListItemText primary={comment.content} />
          </ListItem>
        ))}
      </List>
    </>
  );
};
