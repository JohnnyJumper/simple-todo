import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    black: {
      main: string;
    };
  }

  interface PaletteOptions {
    black?: string;
  }
}
