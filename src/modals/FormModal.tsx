import React, {
  isValidElement,
  type ReactElement,
  type PropsWithChildren,
  type ReactNode,
} from "react";
import Modal, { type ModalProps } from "@mui/material/Modal";
import Paper, { type PaperProps } from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import Divider from "@mui/material/Divider";

export type FormModalProps = Omit<ModalProps, "children"> & {
  children: ReactNode;
  paperProps?: PaperProps;
  maxWidth?: number | string;
  minHeight?: number | string;
  withDivider?: boolean;
};

export const FormTitle: React.FC<PropsWithChildren> = ({ children }) => (
  <>{children}</>
);
export const FormBody: React.FC<PropsWithChildren> = ({ children }) => (
  <>{children}</>
);
export const FormActions: React.FC<PropsWithChildren> = ({ children }) => (
  <>{children}</>
);

function isElementOf<T extends React.ElementType>(
  element: ReactNode,
  type: T,
): element is ReactElement<React.ComponentProps<T>, T> {
  return isValidElement(element) && element.type === type;
}

/**
 * This high order compount component expects to receive FormTitle, FormBody and FormActions nodes to properly display itself.
 **/
export function FormModal({
  children,
  open,
  onClose,
  paperProps,
  maxWidth = 640,
  minHeight = 768,
  withDivider = false,
  ...modalProps
}: FormModalProps) {
  const theme = useTheme();

  let titleNode: ReactNode = null;
  let bodyNode: ReactNode = null;
  let actionsNode: ReactNode = null;

  React.Children.forEach(children, (child: ReactNode) => {
    if (isElementOf(child, FormTitle)) titleNode = child.props.children;
    else if (isElementOf(child, FormBody)) bodyNode = child.props.children;
    else if (isElementOf(child, FormActions))
      actionsNode = child.props.children;
  });

  const labelId = "form-modal-title";
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby={labelId}
      {...modalProps}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          maxWidth,
          display: "grid",
          placeItems: "center",
          p: 2,
          outline: "none",
          pointerEvents: "none",
        }}
      >
        <Paper
          elevation={8}
          {...paperProps}
          sx={{
            pointerEvents: "auto",
            borderRadius: 2,
            minHeight,
            width: "100%",
            maxWidth,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            ...paperProps?.sx,
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            p={2}
            width="100%"
            bgcolor={(theme) => theme.palette.grey[300]}
          >
            <Typography
              id={labelId}
              variant="header"
              color={theme.palette.dark3}
            >
              {titleNode}
            </Typography>
            <IconButton
              aria-label="close"
              onClick={() => onClose?.({}, "escapeKeyDown")}
              size="small"
            >
              <span className="material-icons">close</span>
            </IconButton>
          </Stack>

          <Box p={2} sx={{ flex: "1 1 auto", minHeight: 0 }}>
            {bodyNode}
          </Box>

          {withDivider && <Divider />}
          {actionsNode && (
            <Box p={2} sx={{ pt: withDivider ? 2 : 0 }}>
              {actionsNode}
            </Box>
          )}
        </Paper>
      </Box>
    </Modal>
  );
}
