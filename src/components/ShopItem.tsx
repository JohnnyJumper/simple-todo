import { useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import type {
  ShoppingItem,
  PendingShoppingItem,
} from "../hooks/useShoppingList";
import EditItemModal from "../modals/EditItem";
import DeleteItemModal from "../modals/DeleteItem";

type ShopItemProps = {
  item: ShoppingItem;
  onItemEdit: (id: string, update: Partial<PendingShoppingItem>) => void;
  onItemToggle: (id: string) => void;
  onItemRemoval: (id: string) => void;
  selected: boolean;
} & React.ComponentProps<typeof Container>;

/**
 * To-do: move backgroundColor into the theme
 * To-do: find better replacement for the create icon. it needs to be outlined.
 **/
export default function ShopItem({
  item,
  selected,
  onItemEdit,
  onItemToggle,
  onItemRemoval,
  ...props
}: ShopItemProps) {
  const [editOpen, setEditOpen] = useState(false);
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const handleDeleteOpen = () => setDeleteOpen(true);
  const handleDeleteClose = () => setDeleteOpen(false);

  const handleEdit = (item: ShoppingItem) => {
    onItemEdit(item.id, {
      ...item,
    });
  };

  const handleDelete = (id: string) => {
    onItemRemoval(id);
  };

  return (
    <Container
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 1,
        backgroundColor: selected ? "#D5DFE92B" : "#FFFFFF",
        padding: "16px 8px",
        border: "0.5px solid #D5DFE9",
        borderRadius: "4px",
        marginY: "10px",
        minHeight: 87,
      }}
      {...props}
    >
      <Checkbox
        checked={item.completed}
        onClick={() => onItemToggle(item.id)}
      />
      <Container>
        <Typography
          fontWeight="600"
          color={selected ? "primary" : "black"}
          sx={{ textDecoration: item.completed ? "line-through" : "inherit" }}
        >
          {item.name}
        </Typography>
        <Typography
          variant="description"
          sx={{ textDecoration: item.completed ? "line-through" : "inherit" }}
        >
          {item.description}
        </Typography>
      </Container>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Button variant="text" color="inherit" onClick={handleEditOpen}>
          <span className="material-icons">create</span>
        </Button>
        <Button variant="text" color="inherit" onClick={handleDeleteOpen}>
          <span className="material-icons">delete_outlined</span>
        </Button>
      </Box>

      <DeleteItemModal
        open={deleteOpen}
        item={item}
        onClose={handleDeleteClose}
        onDelete={handleDelete}
      />
      <EditItemModal
        open={editOpen}
        item={item}
        onClose={handleEditClose}
        onEdit={handleEdit}
      />
    </Container>
  );
}
