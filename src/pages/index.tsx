import { css } from "@emotion/css";
import { NextPage } from "next";
import {
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useState } from "react";
import { useRouter } from "next/router";
import { CommentList } from "@components/CommentList";

const App: NextPage = () => {
  const [message, setMessage] = useState<string>("");
  const { asPath } = useRouter();

  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";
  const originUrl: string = `${origin}${asPath}`;
  const ctx = typeof window !== "undefined" ? new AudioContext() : null;
  const playSound = ctx?.createBufferSource() ?? null;

  const handleTextFieldChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setMessage(event.target.value);
    },
    []
  );

  const handleSubmit = useCallback(async () => {
    const rawData = await fetch(`${originUrl}/api/voicevox`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: message }),
    });
    const rawAudio = await rawData.arrayBuffer();
    if (!ctx || !playSound) return;

    const audio = await ctx.decodeAudioData(rawAudio);
    playSound.buffer = audio;
    playSound.connect(ctx.destination);
    playSound.start(ctx.currentTime);
  }, [ctx, message, originUrl, playSound]);

  return (
    <Container maxWidth={"xl"}>
      <Stack id={"test"} spacing={2}>
        <Typography variant={"h4"}>
          VoiceVox + ChatGPT でお手軽会話App
        </Typography>
        <Grid container spacing={1} alignItems={"center"}>
          <Grid item xs={8}>
            <TextField
              fullWidth
              label={"VoiceVoxにしゃべらせたい内容"}
              variant={"outlined"}
              onChange={handleTextFieldChange}
            />
          </Grid>
          <Grid item xs>
            <Button variant={"contained"} size={"large"} onClick={handleSubmit}>
              再生
            </Button>
          </Grid>
        </Grid>
        <CommentList />
      </Stack>
    </Container>
  );
};

export default App;
