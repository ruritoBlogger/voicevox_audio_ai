import { AppBar, Toolbar, Typography } from "@mui/material";

export const Header = (): JSX.Element => {
  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Chatずんだもん
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};
