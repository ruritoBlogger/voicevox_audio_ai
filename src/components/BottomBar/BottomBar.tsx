import { Mic, Send } from "@mui/icons-material";
import { Grid, IconButton, TextField } from "@mui/material";
import { useCallback, useState } from "react";

export const BottomBar = () => {
  const [message, setMessage] = useState<string>("");

  const handleTextFieldChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setMessage(event.target.value);
    },
    []
  );

  return (
    <>
      <Grid container spacing={1} alignItems={"center"}>
        <Grid item xs={10}>
          <TextField
            fullWidth
            multiline
            label={"メッセージを入力または音声入力"}
            onChange={handleTextFieldChange}
          />
        </Grid>
        <Grid item xs>
          <IconButton>
            <Mic />
          </IconButton>
          <IconButton>
            <Send />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
};
