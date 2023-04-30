import { NextPage } from "next";
import {
  AppBar,
  Box,
  Container,
  Grid,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import { Mic, Send, StopCircle } from "@mui/icons-material";
import { ChatList } from "@components/ChatList";
import { BottomBar } from "@components/BottomBar";
import { useFetchChatResponse } from "@hooks/useFetchChatResponse";
import { useFetchAudioData } from "@hooks/useFetchAudioData";
import { useCallback } from "react";
import { usePlaySound } from "@hooks/usePlaySound";

const Talk: NextPage = () => {
  const { fetchChatGPT } = useFetchChatResponse();
  const { fetchAudioData } = useFetchAudioData();
  const { playSound } = usePlaySound();

  const originUrl =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";
  const ctx = typeof window !== "undefined" ? new AudioContext() : null;
  const audioNode = ctx?.createBufferSource() ?? null;

  const handleSubmit = useCallback(
    async (message: string) => {
      if (!ctx || !audioNode) return;

      const aiMessage = await fetchChatGPT(originUrl, message);
      const audioData = await fetchAudioData(originUrl, aiMessage, ctx);

      playSound(audioData, audioNode, ctx);
    },
    [audioNode, ctx, fetchAudioData, fetchChatGPT, originUrl, playSound]
  );

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        minHeight: "100vh",
      }}
    >
      <Container
        maxWidth={"lg"}
        style={{
          height: "100%",
          padding: "32px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Grid
          container
          spacing={2}
          direction={"column"}
          justifyContent={"flex-end"}
          style={{ flex: "1" }}
        >
          <ChatList chatList={["こんにちは", "テスト"]} />
        </Grid>
        <BottomBar onSubmit={handleSubmit} />
      </Container>
    </div>
  );
};

export default Talk;
