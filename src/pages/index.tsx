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

const App: NextPage = () => {
  const [message, setMessage] = useState<string>("");

  const handleTextFieldChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setMessage(event.target.value);
    },
    []
  );

  const handleSubmit = useCallback(() => {
    console.log(message);
  }, [message]);

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
