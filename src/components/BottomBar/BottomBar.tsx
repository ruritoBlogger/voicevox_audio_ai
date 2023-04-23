import { Mic, Send, Stop } from "@mui/icons-material";
import { Grid, IconButton, TextField } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useAudioInput } from "./useAudioInput";

export const BottomBar = () => {
  const [message, setMessage] = useState<string>("");
  const {
    isListening,
    message: audioMessage,
    startListening,
    stopListening,
  } = useAudioInput();

  const handleTextFieldChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setMessage(event.target.value);
    },
    []
  );

  useEffect(() => {
    if (audioMessage !== "") {
      setMessage(audioMessage);
    }
  }, [audioMessage]);

  const handleMicClick = useCallback(() => {
    startListening();
  }, [startListening]);

  const handleStopClick = useCallback(() => {
    stopListening();
  }, [stopListening]);

  return (
    <>
      <Grid container spacing={1} alignItems={"center"}>
        <Grid item xs={10}>
          <TextField
            fullWidth
            multiline
            label={"メッセージを入力または音声入力"}
            value={message}
            onChange={handleTextFieldChange}
          />
        </Grid>
        <Grid item xs>
          {isListening ? (
            <IconButton onClick={handleStopClick}>
              <Stop />
            </IconButton>
          ) : (
            <IconButton onClick={handleMicClick}>
              <Mic />
            </IconButton>
          )}
          <IconButton>
            <Send />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
};
