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
import { useMutation } from "@apollo/client";
import {
  AddCommentDocument,
  CommentsDocument,
} from "../../graphql/dist/client/graphql";

const App: NextPage = () => {
  const [message, setMessage] = useState<string>("");
  const [addComment] = useMutation(AddCommentDocument);
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

  const handlePlay = useCallback(
    async (playedMessage: string) => {
      const rawData = await fetch(`${originUrl}/api/voicevox`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: playedMessage }),
      });
      const rawAudio = await rawData.arrayBuffer();
      if (!ctx || !playSound) return;

      const audio = await ctx.decodeAudioData(rawAudio);
      playSound.buffer = audio;
      playSound.connect(ctx.destination);
      playSound.start(ctx.currentTime);
    },
    [ctx, originUrl, playSound]
  );

  const handleSubmit = useCallback(async () => {
    const rawData = await fetch(`${originUrl}/api/voicevox`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: message }),
    });
    // TODO: キャッシュ更新して反映させたい
    await addComment({
      variables: { content: message },
      refetchQueries: [CommentsDocument],
    });
    const rawAudio = await rawData.arrayBuffer();
    if (!ctx || !playSound) return;

    const audio = await ctx.decodeAudioData(rawAudio);
    playSound.buffer = audio;
    playSound.connect(ctx.destination);
    playSound.start(ctx.currentTime);
  }, [addComment, ctx, message, originUrl, playSound]);

  const handleSubmitWithAi = useCallback(async () => {
    const rawChatData = await fetch(`${originUrl}/api/chatgpt`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: message }),
    });
    const chatData = await rawChatData.json();
    const chatDataMessage = chatData.message.content;

    const rawData = await fetch(`${originUrl}/api/voicevox`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: chatDataMessage }),
    });
    // TODO: キャッシュ更新して反映させたい
    await addComment({
      variables: { content: chatDataMessage },
      refetchQueries: [CommentsDocument],
    });
    const rawAudio = await rawData.arrayBuffer();
    if (!ctx || !playSound) return;

    const audio = await ctx.decodeAudioData(rawAudio);
    playSound.buffer = audio;
    playSound.connect(ctx.destination);
    playSound.start(ctx.currentTime);
  }, [addComment, ctx, message, originUrl, playSound]);

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
          <Grid item xs>
            <Button
              variant={"contained"}
              size={"large"}
              onClick={handleSubmitWithAi}
            >
              chatGPT に聞いてみる
            </Button>
          </Grid>
        </Grid>
        <CommentList onPlayButtonClick={handlePlay} />
      </Stack>
    </Container>
  );
};

export default App;
