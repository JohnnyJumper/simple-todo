import React from "react";
import { Typography, Container } from "@mui/material";
import Button from "@mui/material/Button";
import Header from "./components/Header";

function App() {
  return (
    <React.Fragment>
      <Header />
      <Container>
        <Typography variant="body1">Hello</Typography>
        <Button variant="contained"> hello </Button>
      </Container>
    </React.Fragment>
  );
}

export default App;
