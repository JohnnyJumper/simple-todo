import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { FormModal, FormBody, FormActions, FormTitle } from "./FormModal.tsx";

export default function AddItemModal({
  onClose,
  open,
}: {
  onClose: () => void;
  open: boolean;
}) {
  return (
    <FormModal open={open} onClose={onClose} minHeight={768} maxWidth={640}>
      <FormTitle>Shopping List</FormTitle>
      <FormBody>
        <Typography fontWeight={600}>Add an Item</Typography>
        <Typography variant="caption" color="text.secondary">
          Add your new item below
        </Typography>
        <Stack spacing={2} mt={2}>
          <TextField label="Item name" fullWidth />
          <TextField label="Description" fullWidth multiline minRows={2} />
          <TextField label="How many?" type="number" fullWidth />
        </Stack>
      </FormBody>
      <FormActions>
        <Stack direction="row" justifyContent="flex-end" spacing={1}>
          <Button variant="text" onClick={onClose} sx={{ color: "black" }}>
            Cancel
          </Button>
          <Button variant="contained">Add Task</Button>
        </Stack>
      </FormActions>
    </FormModal>
  );
}
