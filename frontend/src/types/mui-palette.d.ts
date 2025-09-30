import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    black: string;
    dark3: string;
  }

  interface PaletteOptions {
    black?: string;
    dark3?: string;
  }
}
