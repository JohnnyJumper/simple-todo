import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import { FormModal, FormBody, FormActions, FormTitle } from "./FormModal.tsx";
import type { ShoppingItem } from "../hooks/useShoppingList.tsx";

export default function EditItemModal({
  onClose,
  open,
  onEdit,
  item,
}: {
  onClose: () => void;
  onEdit: (item: ShoppingItem) => void;
  open: boolean;
  item: ShoppingItem;
}) {
  const [values, setValues] = useState<ShoppingItem>(item);

  useEffect(() => {
    if (!open) setValues(item);
  }, [open, item]);

  const update = (patch: Partial<ShoppingItem>) =>
    setValues((v) => ({ ...v, ...patch }));

  const handleSubmit = () => {
    const name = values.name.trim();
    if (!name) return;

    onEdit({
      id: item.id,
      name,
      description: values.description?.trim() || undefined,
      quantity: Math.max(1, values.quantity | 0),
      completed: values.completed,
    });
    onClose();
  };

  return (
    <FormModal open={open} onClose={onClose} minHeight={768} maxWidth={640}>
      <FormTitle>Shopping List</FormTitle>
      <FormBody>
        <Typography fontWeight={600}>Edit an Item</Typography>
        <Typography variant="caption" color="text.secondary">
          Edit your new item below
        </Typography>
        <Stack spacing={2} mt={2}>
          <TextField
            label="Item name"
            fullWidth
            value={values.name}
            onChange={(e) => update({ name: e.target.value })}
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            minRows={4}
            value={values.description}
            onChange={(e) => update({ description: e.target.value })}
          />
          <TextField
            label="How many?"
            type="number"
            fullWidth
            value={values.quantity}
            onChange={(e) => {
              const n = Number(e.target.value);
              update({ quantity: Number.isFinite(n) ? Math.max(1, n) : 1 });
            }}
          />
          <Box>
            <Checkbox
              checked={values.completed}
              onClick={() => update({ completed: !values.completed })}
            />
            <Typography variant="caption">Purchased</Typography>
          </Box>
        </Stack>
      </FormBody>
      <FormActions>
        <Stack direction="row" justifyContent="flex-end" spacing={1}>
          <Button variant="text" onClick={onClose} sx={{ color: "black" }}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Save Item
          </Button>
        </Stack>
      </FormActions>
    </FormModal>
  );
}
