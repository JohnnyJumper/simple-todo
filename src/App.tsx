import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Typography, Container } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import theme from "./theme";

function App() {
  return (
    <React.Fragment>
      <CssBaseline enableColorScheme />
      <ThemeProvider theme={theme}>
        <Container>
          <Typography variant="body1">Hello</Typography>
          <Button variant="contained"> hello </Button>
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
