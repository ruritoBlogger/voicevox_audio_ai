import { NextPage } from "next";
import { Container, Grid, IconButton, Stack, TextField } from "@mui/material";
import { Mic, Send, StopCircle } from "@mui/icons-material";
import { ChatList } from "@components/ChatList";

const Talk: NextPage = () => {
  return (
    <>
      <Container
        maxWidth={"lg"}
        style={{ width: "96%", height: "96%", margin: "auto" }}
      >
        <Stack spacing={2}>
          <ChatList chatList={["こんにちは", "テスト"]} />
          <Grid container spacing={1} alignItems={"center"}>
            <Grid item xs={11}>
              <TextField
                fullWidth
                multiline
                label={"メッセージを入力または音声入力"}
              />
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
