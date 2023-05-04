import { NextPage } from "next";
import { Container, Grid } from "@mui/material";
import { ChatList } from "@components/ChatList";
import { BottomBar } from "@components/BottomBar";
import { useFetchChatResponse } from "@hooks/useFetchChatResponse";
import { useFetchAudioData } from "@hooks/useFetchAudioData";
import { Suspense, useCallback } from "react";
import { usePlaySound } from "@hooks/usePlaySound";
import { useMutation } from "@apollo/client";
import {
  AddCommentDocument,
  CommentsDocument,
} from "../../graphql/dist/client/graphql";

const Home: NextPage = () => {
  const { fetchChatGPT } = useFetchChatResponse();
  const { fetchAudioData } = useFetchAudioData();
  const { playSound } = usePlaySound();
  const [addComment] = useMutation(AddCommentDocument);

  const originUrl =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";
  const ctx = typeof window !== "undefined" ? new AudioContext() : null;
  const audioNode = ctx?.createBufferSource() ?? null;

  const handleSubmit = useCallback(
    async (message: string) => {
      if (!ctx || !audioNode) return;

      // TODO: refetch せずにキャッシュを書き換える
      await addComment({
        variables: { content: message },
        refetchQueries: [CommentsDocument],
      });

      const aiMessage = await fetchChatGPT(originUrl, message);
      await addComment({
        variables: { content: aiMessage },
        refetchQueries: [CommentsDocument],
      });

      const audioData = await fetchAudioData(originUrl, aiMessage, ctx);

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
          style={{ flex: "1", padding: "0 10%" }}
        >
          <Suspense fallback={<div>loading...</div>}>
            <ChatList />
          </Suspense>
        </Grid>
        <BottomBar onSubmit={handleSubmit} />
      </Container>
    </div>
  );
};

export default Home;
