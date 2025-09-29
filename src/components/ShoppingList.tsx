import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useShoppingList } from "../hooks/useShoppingList";

export default function ShoppingList() {
  const { items } = useShoppingList();

  if (items.length === 0)
    return (
      <Container
        sx={{
          marginTop: "110px",
        }}
      >
        <EmptyShoppingList />
      </Container>
    );
  return <Container></Container>;
}

function EmptyShoppingList() {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "5px",
        border: "1px solid #C6C6C6",
        minHeight: "290px",
        maxWidth: "614px",
      }}
    >
      <Typography variant="caption">Your shopping list is empty :(</Typography>
      <Button variant="contained" size="large" sx={{ marginTop: "16px" }}>
        Add your first item
      </Button>
    </Container>
  );
}
