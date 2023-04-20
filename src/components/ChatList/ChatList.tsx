import { Grid, Typography } from "@mui/material";

export const ChatList = ({
  chatList,
}: {
  chatList: Array<string>;
}): JSX.Element => {
  return (
    <>
      <Grid container spacing={1} direction={"column"} alignItems={"center"}>
        {chatList.map((chat) => {
          return (
            <Grid item>
              <Typography variant={"body2"}>{chat}</Typography>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
