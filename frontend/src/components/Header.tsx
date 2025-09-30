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
        variant="header"
        color="#FFFFFF"
        sx={{
          padding: "20px 0px 20px 30px",
        }}
      >
        Shopping List
      </Typography>
    </Box>
  );
}
