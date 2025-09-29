import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Dosis, Nunito, sans-serif",
    caption: {
      fontFamily: "Nunito",
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
    grey: {
      500: "#87898C",
    },
  },
  components: {
    MuiTypography: {
      variants: [
        {
          props: { variant: "caption" },
          style: ({ theme }) => ({
            color: theme.palette.grey[500],
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
