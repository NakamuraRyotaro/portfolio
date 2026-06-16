"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  cssVariables: true,
  palette: {
    mode: "light",
    primary: {
      main: "#0F172A",
    },
    secondary: {
      main: "#2563EB",
    },
    background: {
      default: "#FAFAF9",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#0F172A",
      secondary: "#475569",
    },
  },
  typography: {
    fontFamily: [
      "Inter",
      '"Noto Sans JP"',
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      "sans-serif",
    ].join(","),
    h1: { fontWeight: 700, letterSpacing: "-0.02em" },
    h2: { fontWeight: 700, letterSpacing: "-0.02em" },
    h3: { fontWeight: 700, letterSpacing: "-0.01em" },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: "1px solid #E2E8F0",
        },
      },
    },
    MuiAppBar: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255,255,255,0.85)",
          backdropFilter: "saturate(180%) blur(8px)",
          borderBottom: "1px solid #E2E8F0",
          color: "#0F172A",
        },
      },
    },
  },
});

export default theme;
