import React from "react";
import { Container } from "@mui/material";
import Header from "./components/Header";
import ShoppingList from "./components/ShoppingList";

function App() {
  return (
    <React.Fragment>
      <Header />
      <Container>
        <ShoppingList />
      </Container>
    </React.Fragment>
  );
}

export default App;
