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
import { useCallback } from "react";

interface CommentListInput {
  onPlayButtonClick(message: string): void;
}

export const CommentList = ({
  onPlayButtonClick,
}: CommentListInput): JSX.Element => {
  const { data } = useSuspenseQuery(CommentsDocument);

  const handleButtonClick = useCallback(
    (message: string) => () => {
      onPlayButtonClick(message);
    },
    [onPlayButtonClick]
  );

  return (
    <>
      <List>
        {data.comments.map((comment) => (
          <ListItem key={comment.id}>
            <ListItemAvatar>
              <IconButton onClick={handleButtonClick(comment.content)}>
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
