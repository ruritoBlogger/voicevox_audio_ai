import { Grid, Typography } from "@mui/material";
import { useSuspenseQuery_experimental as useSuspenseQuery } from "@apollo/client";
import { CommentsDocument } from "../../../graphql/dist/client/graphql";
import { css } from "@emotion/css";
import Image from "next/image";
import { AccountCircle } from "@mui/icons-material";

export const ChatList = (): JSX.Element => {
  const { data } = useSuspenseQuery(CommentsDocument);

  return (
    <>
      <Grid container spacing={1} direction={"column"} alignItems={"center"}>
        {data.comments.map((comment) => {
          // TODO: 文章が長い時の対応
          return (
            <Grid
              container
              item
              key={comment.id}
              alignItems={"center"}
              spacing={2}
              justifyContent={comment.author === "USER" ? "left" : "right"}
            >
              <div className={paperStyle} data-author={comment.author}>
                <Typography variant={"body2"}>{comment.content}</Typography>
              </div>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

const paperStyle = css`
  && {
    position: relative;
    display: inline-block;
    margin: 1.5em 0 1.5em 15px;
    padding: 7px 10px;
    border: solid 3px #555;
    box-sizing: border-box;
  }

  &&:before,
  &&:after {
    content: "";
    position: absolute;
    top: 50%;
  }

  &&[data-author="USER"]:before {
    left: -24px;
    margin-top: -12px;
    border: 12px solid transparent;
    border-right: 12px solid #fff;
    z-index: 2;
  }

  &&[data-author="USER"]:after {
    left: -30px;
    margin-top: -14px;
    border: 14px solid transparent;
    border-right: 14px solid #555;
    z-index: 1;
  }

  &&[data-author="AI"]:before {
    right: -24px;
    margin-top: -12px;
    border: 12px solid transparent;
    border-left: 12px solid #fff;
    z-index: 2;
  }

  &&[data-author="AI"]:after {
    right: -30px;
    margin-top: -14px;
    border: 14px solid transparent;
    border-left: 14px solid #555;
    z-index: 1;
  }
`;
