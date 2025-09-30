import { useState } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useShoppingList } from "../hooks/useShoppingList";
import ShopItem from "./ShopItem";
import AddItemModal from "../modals/AddItem";

export default function ShoppingList() {
  const { items, editItem, removeItem, toggleItem, addItem } =
    useShoppingList();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
        <EmptyShoppingList handleOpen={handleOpen} />
        <AddItemModal onClose={handleClose} open={open} onAddTask={addItem} />
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
        <Button
          variant="contained"
          size="large"
          sx={{ p: "8px 15px" }}
          onClick={handleOpen}
        >
          Add Item
        </Button>
        <AddItemModal open={open} onClose={handleClose} onAddTask={addItem} />
      </Container>
      <Container>
        {items.map((item, index) => (
          <ShopItem
            item={item}
            key={index}
            selected={selectedItem === item.id}
            onClick={() => setSelectedItem(item.id)}
            onItemToggle={(id) => toggleItem(id)}
            onItemEdit={editItem}
            onItemRemoval={(id) => removeItem(id)}
          />
        ))}
      </Container>
    </Container>
  );
}

function EmptyShoppingList({ handleOpen }: { handleOpen: () => void }) {
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
      <Button
        variant="contained"
        size="large"
        sx={{ marginTop: "16px" }}
        onClick={handleOpen}
      >
        Add your first item
      </Button>
    </Container>
  );
}
