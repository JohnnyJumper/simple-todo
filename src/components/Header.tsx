import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Header() {
  return (
    <Box
      sx={{
        p: 0,
        width: "100%",
        bgcolor: "primary.main",
        color: "primary.contrastText",
        height: "64px",
      }}
    >
      <Typography
        variant="h6"
        fontSize="1.125em"
        letterSpacing="0.25px"
        fontWeight="600"
        fontFamily="Dosis"
        sx={{
          textTransform: "uppercase",
          paddingLeft: "30px",
          paddingTop: "20px",
          paddingBottom: "20px",
        }}
      >
        Shopping List
      </Typography>
    </Box>
  );
}
