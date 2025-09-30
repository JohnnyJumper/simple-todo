import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CssBaseline enableColorScheme />
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>,
);
