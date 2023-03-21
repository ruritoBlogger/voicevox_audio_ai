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

const App: NextPage = () => {
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
            />
          </Grid>
          <Grid item xs>
            <Button variant={"contained"} size={"large"}>
              再生
            </Button>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
};

export default App;
