import {
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { useSuspenseQuery_experimental as useSuspenseQuery } from "@apollo/client";
import { CommentsDocument } from "../../../graphql/dist/client/graphql";
import { PlayArrow } from "@mui/icons-material";

export const CommentList = (): JSX.Element => {
  const { data } = useSuspenseQuery(CommentsDocument);

  return (
    <>
      <List>
        {data.comments.map((comment) => (
          <ListItem key={comment.id}>
            <ListItemAvatar>
              <IconButton>
                <PlayArrow />
              </IconButton>
            </ListItemAvatar>
            <ListItemText
              primary={comment.content}
              secondary={comment.createdAt.toString()}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
};
