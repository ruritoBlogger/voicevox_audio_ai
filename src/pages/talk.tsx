import { NextPage } from "next";
import { Container, Grid, IconButton, Stack, TextField } from "@mui/material";
import { Mic, Send, StopCircle } from "@mui/icons-material";

const Talk: NextPage = () => {
  return (
    <>
      <Container maxWidth={"xl"}>
        <Stack spacing={2}>
          <Grid container spacing={1} alignItems={"center"}>
            <Grid item xs={11}>
              <TextField fullWidth label={"メッセージを入力または音声入力"} />
            </Grid>
            <Grid item xs>
              <IconButton>
                <Mic />
              </IconButton>
              <IconButton>
                <Send />
              </IconButton>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </>
  );
};

export default Talk;
