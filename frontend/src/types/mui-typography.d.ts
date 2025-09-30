import "@mui/material/styles";
import "@mui/material/Typography";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    description: React.CSSProperties;
    header: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    description?: React.CSSProperties;
    header?: React.CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    description: true;
    header: true;
  }
}
