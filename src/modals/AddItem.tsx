import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { FormModal, FormBody, FormActions, FormTitle } from "./FormModal.tsx";
import type { PendingShoppingItem } from "../hooks/useShoppingList.tsx";

const initial: PendingShoppingItem = {
  name: "",
  description: "",
  quantity: 1,
  completed: false,
};

export default function AddItemModal({
  onClose,
  open,
  onAddTask,
}: {
  onClose: () => void;
  onAddTask: (item: PendingShoppingItem) => void;
  open: boolean;
}) {
  const [values, setValues] = useState<PendingShoppingItem>(initial);

  useEffect(() => {
    if (!open) setValues(initial);
  }, [open]);

  const update = (patch: Partial<PendingShoppingItem>) =>
    setValues((v) => ({ ...v, ...patch }));

  const handleSubmit = () => {
    const name = values.name.trim();
    if (!name) return;

    onAddTask({
      name,
      description: values.description?.trim() || undefined,
      quantity: Math.max(1, values.quantity | 0),
      completed: false,
    });
    onClose();
  };

  return (
    <FormModal open={open} onClose={onClose} minHeight={768} maxWidth={640}>
      <FormTitle>Shopping List</FormTitle>
      <FormBody>
        <Typography fontWeight={600}>Add an Item</Typography>
        <Typography variant="caption" color="text.secondary">
          Add your new item below
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
        </Stack>
      </FormBody>
      <FormActions>
        <Stack direction="row" justifyContent="flex-end" spacing={1}>
          <Button variant="text" onClick={onClose} sx={{ color: "black" }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!values.name.trim()}
          >
            Add Task
          </Button>
        </Stack>
      </FormActions>
    </FormModal>
  );
}
