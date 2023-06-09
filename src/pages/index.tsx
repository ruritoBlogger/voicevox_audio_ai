import { NextPage } from "next";
import { Box, Grid, Stack } from "@mui/material";
import { ChatList } from "@components/ChatList";
import { BottomBar } from "@components/BottomBar";
import { useFetchChatResponse } from "@hooks/useFetchChatResponse";
import { useFetchAudioData } from "@hooks/useFetchAudioData";
import { Suspense, useCallback, useMemo } from "react";
import { usePlaySound } from "@hooks/usePlaySound";
import { useMutation } from "@apollo/client";
import {
  AddCommentDocument,
  CommentAuthorType,
  CommentsDocument,
} from "../../graphql/dist/client/graphql";
import Image from "next/image";
import { Header } from "@components/Header";
import { Bubble } from "@components/Bubble";

const Home: NextPage = () => {
  const { fetchChatGPT, loading: loadingChatApi } = useFetchChatResponse();
  const { fetchAudioData, loading: loadingAudio } = useFetchAudioData();
  const { playSound } = usePlaySound();
  const [addComment] = useMutation(AddCommentDocument);
  const loading = useMemo(
    () => loadingChatApi || loadingAudio,
    [loadingAudio, loadingChatApi]
  );

  const originUrl =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";
  const ctx = typeof window !== "undefined" ? new AudioContext() : null;
  const audioNode = ctx?.createBufferSource() ?? null;

  const handleSubmit = useCallback(
    async (message: string) => {
      if (!ctx || !audioNode) return;

      await addComment({
        variables: { content: message, author: CommentAuthorType.User },
      });

      const aiMessage = await fetchChatGPT(originUrl, message);
      const audioData = await fetchAudioData(originUrl, aiMessage, ctx);

      // TODO: refetch せずにキャッシュを書き換える
      await addComment({
        variables: { content: aiMessage, author: CommentAuthorType.Ai },
        refetchQueries: [CommentsDocument],
      });

      playSound(audioData, audioNode, ctx);
    },
    [
      addComment,
      audioNode,
      ctx,
      fetchAudioData,
      fetchChatGPT,
      originUrl,
      playSound,
    ]
  );

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <Grid container direction={"row"} style={{ height: "100%" }}>
        <Grid item xs style={{ padding: "3%", height: "100%" }}>
          <Stack justifyContent={"flex-end"} style={{ height: "100%" }}>
            <Suspense fallback={<div>loading...</div>}>
              <div
                style={{
                  maxHeight: "calc(100% - 76px)",
                  padding: "0 3%",
                  overflowY: "auto",
                }}
              >
                <ChatList />
              </div>
            </Suspense>
            <div style={{ paddingTop: "20px" }}>
              <BottomBar onSubmit={handleSubmit} loading={loading} />
            </div>
          </Stack>
        </Grid>
        <Grid item xs={3}>
          <Stack justifyContent={"flex-end"} style={{ height: "100%" }}>
            <Box position={"relative"} width={"100%"} height={"700px"}>
              {loading && (
                <div style={{ paddingLeft: "50%" }}>
                  <Bubble />
                </div>
              )}
              <Image
                src={"/zundamon.png"}
                alt={"ずんだもんの立ち絵"}
                layout={"fill"}
                objectFit={"contain"}
              />
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
