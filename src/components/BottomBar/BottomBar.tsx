import { Mic, Send, Stop } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useAudioInput } from "./useAudioInput";

interface BottomBarProps {
  onSubmit(message: string): Promise<void>;
  loading: boolean;
}

export const BottomBar = ({ onSubmit, loading }: BottomBarProps) => {
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

  const handleSubmit = useCallback(async () => {
    await onSubmit(message);
    setMessage("");
  }, [message, onSubmit]);

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
          <Button
            variant={"outlined"}
            onClick={handleSubmit}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : <Send />}
          >
            送信
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
