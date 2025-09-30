import { useCallback } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { FormModal, FormBody, FormActions } from "./FormModal.tsx";
import type { ShoppingItem } from "../hooks/useShoppingList.tsx";

export default function DeleteItemModal({
  onClose,
  open,
  onDelete,
  item,
}: {
  onClose: () => void;
  onDelete: (id: string) => void;
  open: boolean;
  item: ShoppingItem;
}) {
  const handleDelete = useCallback(() => {
    onDelete(item.id);
    onClose?.();
  }, [onDelete, item, onClose]);

  return (
    <FormModal open={open} onClose={onClose} minHeight={240} maxWidth={410}>
      <FormBody>
        <Container sx={{ p: 2 }}>
          <Typography variant="body1" color="#2A323C" sx={{ pb: "10px" }}>
            Delete Item?
          </Typography>
          <Typography variant="caption">
            Are you sure you want to delete this item? this can not be undone.
          </Typography>
        </Container>
      </FormBody>
      <FormActions>
        <Button
          variant="text"
          onClick={onClose}
          sx={{ color: "black", pr: "10px" }}
        >
          Cancel
        </Button>
        <Button variant="contained" onClick={handleDelete}>
          Delete
        </Button>
      </FormActions>
    </FormModal>
  );
}
