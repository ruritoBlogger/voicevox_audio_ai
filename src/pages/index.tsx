import { css } from "@emotion/css";
import { NextPage } from "next";
import {
  Button,
  Container,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { CommentList } from "@components/CommentList";
import { useMutation } from "@apollo/client";
import {
  AddCommentDocument,
  CommentsDocument,
} from "../../graphql/dist/client/graphql";
import { PlayArrow, StopCircle } from "@mui/icons-material";

const App: NextPage = () => {
  const [message, setMessage] = useState<string>("");
  const [listening, setListening] = useState<boolean>(false);
  const [recognizer, setRecognizer] = useState<any>(null);
  const [prevListenMessage, setPrevListenMessage] = useState<string>("");
  const [listenMessageLength, setListenMessageLength] = useState<number>(0);
  const [listenMessage, setListenMessage] = useState<Array<string>>([]);
  const [addComment] = useMutation(AddCommentDocument);
  const { asPath } = useRouter();

  // @ts-ignore
  const Recognition =
    typeof window !== "undefined"
      ? window?.SpeechRecognition || window?.webkitSpeechRecognition
      : null;

  useEffect(() => {
    if (!Recognition) {
      return;
    }
    const recognizer = new Recognition();
    recognizer.lang = "ja-JP";
    recognizer.continuous = true;
    recognizer.onresult = function (event: any) {
      const results = event.results;
      const resultText = results[results.length - 1][0].transcript.trim();
      if (prevListenMessage === resultText) {
        return;
      }
      if (
        results.length !== listenMessageLength &&
        results.length > 1 &&
        results[results.length - 2][0].transcript.trim() !==
          listenMessage[listenMessage.length - 1]
      ) {
        console.log(results.length);
        setListenMessageLength(results.length);
        setListenMessage((prev) => [
          ...prev,
          results[results.length - 2][0].transcript.trim(),
        ]);
      }
      setPrevListenMessage(resultText);
    };
    setRecognizer(recognizer);
  }, [
    Recognition,
    listenMessage,
    listenMessageLength,
    listening,
    prevListenMessage,
  ]);

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

  const handleSpeechStart = useCallback(() => {
    if (recognizer && !listening) {
      setListenMessage([]);
      setListenMessageLength(0);
      setListening(true);
      recognizer.start();
    }
  }, [listening, recognizer]);

  const handleSpeechStop = useCallback(() => {
    if (recognizer && listening) {
      setListening(false);
      recognizer.stop();
    }
  }, [listening, recognizer]);

  return (
    <Container maxWidth={"xl"}>
      <Stack id={"test"} spacing={2}>
        <Typography variant={"h4"}>
          VoiceVox + ChatGPT でお手軽会話App
        </Typography>
        <Grid container spacing={1} alignItems={"center"}>
          <Grid item>
            <Typography variant={"h6"}>音声入力</Typography>
          </Grid>
          <Grid item>
            <Typography variant={"body2"}>
              {listenMessage.map((message) => {
                return (
                  <>
                    <span>{message}</span>
                    <br />
                  </>
                );
              })}
              {(listenMessage.length === 0 ||
                listenMessage[listenMessage.length - 1] !==
                  prevListenMessage) && <span>{prevListenMessage}</span>}
            </Typography>
          </Grid>
          <Grid item>
            {listening ? (
              <IconButton onClick={handleSpeechStop}>
                <StopCircle />
              </IconButton>
            ) : (
              <IconButton onClick={handleSpeechStart}>
                <PlayArrow />
              </IconButton>
            )}
          </Grid>
        </Grid>
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
