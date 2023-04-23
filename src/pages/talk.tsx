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

const Talk: NextPage = () => {
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
        <BottomBar />
      </Container>
    </div>
  );
};

export default Talk;
