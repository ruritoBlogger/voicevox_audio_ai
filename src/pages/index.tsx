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

const App: NextPage = () => {
  const [message, setMessage] = useState<string>("");
  const { asPath } = useRouter();
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";
  const originUrl: string = `${origin}${asPath}`;

  const handleTextFieldChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setMessage(event.target.value);
    },
    []
  );

  const handleSubmit = useCallback(async () => {
    const result = await fetch(`${originUrl}/api/voicevox`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: message }),
    });
    console.log(result);
  }, [message, originUrl]);

  return (
    <Container maxWidth={"xl"}>
      <Stack spacing={2}>
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
      </Stack>
    </Container>
  );
};

export default App;
