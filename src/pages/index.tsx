import { NextPage } from "next";
import { Box, Grid, Stack } from "@mui/material";
import { ChatList } from "@components/ChatList";
import { BottomBar } from "@components/BottomBar";
import { useFetchChatResponse } from "@hooks/useFetchChatResponse";
import { useFetchAudioData } from "@hooks/useFetchAudioData";
import { Suspense, useCallback } from "react";
import { usePlaySound } from "@hooks/usePlaySound";
import { useMutation } from "@apollo/client";
import {
  AddCommentDocument,
  CommentAuthorType,
  CommentsDocument,
} from "../../graphql/dist/client/graphql";
import Image from "next/image";

const Home: NextPage = () => {
  const { fetchChatGPT, loading } = useFetchChatResponse();
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

      await addComment({
        variables: { content: message, author: CommentAuthorType.User },
      });

      const aiMessage = await fetchChatGPT(originUrl, message);
      // TODO: refetch せずにキャッシュを書き換える
      await addComment({
        variables: { content: aiMessage, author: CommentAuthorType.Ai },
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
        maxHeight: "100vh",
        display: "flex",
      }}
    >
      <Grid container direction={"row"}>
        <Grid
          container
          item
          xs
          spacing={2}
          direction={"column"}
          style={{ padding: "3%" }}
        >
          <Suspense fallback={<div>loading...</div>}>
            <ChatList />
          </Suspense>
          <BottomBar onSubmit={handleSubmit} loading={loading} />
        </Grid>
        <Grid item xs={3}>
          <Stack justifyContent={"flex-end"} style={{ height: "100%" }}>
            <Box position={"relative"} width={"100%"} height={"700px"}>
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
