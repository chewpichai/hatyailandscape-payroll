"use client";
import { createTheme } from "@mui/material/styles";
import { Noto_Sans_Thai } from "next/font/google";

const noto = Noto_Sans_Thai({
  weight: ["300", "400", "500", "700"],
  subsets: ["thai", "latin"],
  display: "swap",
});

export const darkTheme = createTheme({
  typography: { fontFamily: noto.style.fontFamily },
  palette: {
    mode: "light",
  },
});
