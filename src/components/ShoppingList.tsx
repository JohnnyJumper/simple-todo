import { useState } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useShoppingList } from "../hooks/useShoppingList";
import ShopItem from "./ShopItem";

export default function ShoppingList() {
  const { items, editItem, removeItem, toggleItem } = useShoppingList();

  const [selectedItem, setSelectedItem] = useState<string | null>(
    items[0]?.id ?? null,
  );
  if (items.length === 0) {
    return (
      <Container
        sx={{
          marginTop: "110px",
        }}
      >
        <EmptyShoppingList />
      </Container>
    );
  }

  return (
    <Container>
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          width: "100%",
          marginTop: "35px",
        }}
      >
        <Typography variant="body1">Your Items</Typography>
        <Button variant="contained" size="large" sx={{ p: "8px 15px" }}>
          Add Item
        </Button>
      </Container>
      <Container>
        {items.map((item, index) => (
          <ShopItem
            item={item}
            key={index}
            selected={selectedItem === item.id}
            onClick={() => setSelectedItem(item.id)}
            onItemToggle={(id) => toggleItem(id)}
            onItemEdit={(id) => editItem(id, {})}
            onItemRemoval={(id) => removeItem(id)}
          />
        ))}
      </Container>
    </Container>
  );
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
