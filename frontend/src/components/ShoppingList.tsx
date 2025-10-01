import { useState, useMemo } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useShopping } from "../hooks/useShopping";
import ShopItem from "./ShopItem";
import AddItemModal from "../modals/AddItem";
import { createHttpShoppingApi } from "../api/httpShoppingApi";
import CircularProgress from "@mui/material/CircularProgress";

export default function ShoppingList() {
  const api = useMemo(() => createHttpShoppingApi("http://localhost:3000"), []);
  const { list, create, update, remove } = useShopping(api);

  const items = list.data ?? [];
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [selectedItem, setSelectedItem] = useState<number | null>(
    items[0]?.id ?? null,
  );

  if (list.isLoading && items.length === 0) {
    return (
      <Container
        sx={{
          marginTop: "110px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  if (items.length === 0) {
    return (
      <Container
        sx={{
          marginTop: "110px",
        }}
      >
        <EmptyShoppingList handleOpen={handleOpen} />
        <AddItemModal
          onClose={handleClose}
          open={open}
          onAddTask={(item) => create(item)}
        />
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
        <AddItemModal
          open={open}
          onClose={handleClose}
          onAddTask={(item) => create(item)}
        />
      </Container>
      <Container>
        {items.map((item, index) => (
          <ShopItem
            item={item}
            key={index}
            selected={selectedItem === item.id}
            onClick={() => setSelectedItem(item.id)}
            onItemToggle={(id) =>
              update({ id, patch: { completed: !item.completed } })
            }
            onItemEdit={(id, patch) => update({ id, patch })}
            onItemRemoval={(id) => remove(id)}
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
