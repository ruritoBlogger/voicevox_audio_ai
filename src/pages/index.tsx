import { css } from "@emotion/css";
import { NextPage } from "next";
import { Typography } from "@mui/material";

const App: NextPage = () => {
  return (
    <div className={rootStyle}>
      <Typography>voicevox + chatGPT</Typography>
    </div>
  );
};

const rootStyle = css`
  && {
    height: 100vh;
    width: 100vw;
  }
`;

export default App;
