import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import type { ShoppingItem } from "../hooks/useShoppingList";

type ShopItemProps = {
  item: ShoppingItem;
  onItemEdit: (id: string) => void;
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
        <Button
          variant="text"
          color="inherit"
          onClick={() => onItemEdit(item.id)}
        >
          <span className="material-icons">create</span>
        </Button>
        <Button
          variant="text"
          color="inherit"
          onClick={() => onItemRemoval(item.id)}
        >
          <span className="material-icons">delete_outlined</span>
        </Button>
      </Box>
    </Container>
  );
}
