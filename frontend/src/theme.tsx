import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Nunito, sans-serif",
    caption: {
      fontSize: "18px",
      lineHeight: "24px",
      letterSpacing: "0px",
      textAlign: "center",
    },
  },
  palette: {
    primary: {
      main: "#4D81B7",
    },
    black: "#000000",
    grey: {
      300: "#FAFAFA",
      400: "#7D7A7A",
      500: "#87898C",
    },
    dark3: "#5C6269",
  },
  components: {
    MuiTypography: {
      variants: [
        {
          props: { variant: "caption" },
          style: ({ theme }) => ({
            fontFamily: "Nunito, sans-serif",
            color: theme.palette.grey[500],
          }),
        },
        {
          props: { variant: "description" },
          style: ({ theme }) => ({
            color: theme.palette.grey[400],
            fontFamily: "Nunito, sans-serif",
            fontWeight: 600,
            fontSize: "14px",
            letterSpacing: "0px",
            lineHeight: "20px",
          }),
        },
        {
          props: { variant: "header" },
          style: ({ theme }) => ({
            color: theme.palette.grey[300],
            display: "block",
            fontFamily: "Dosis",
            fontWeight: 600,
            fontSize: "1.125rem",
            letterSpacing: "0.25px",
            textTransform: "uppercase",
          }),
        },
        {
          props: { variant: "body1" },
          style: () => ({
            fontWeight: 600,
            fontSize: "1.125rem",
            lineHeight: "24px",
            letterSpacing: "0px",
            fontFamily: "Nunito, sans-serif",
          }),
        },
      ],
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
      variants: [
        {
          props: { variant: "contained", color: "primary" },
          style: {
            backgroundColor: "#1871E8",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#1255b0", // darker shade for hover
            },
            fontFamily: "Nunito",
          },
        },
      ],
    },
  },
});

export default theme;
