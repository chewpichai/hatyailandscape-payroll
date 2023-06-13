"use client";
import Navigation from "@/components/navigation";
import { darkTheme } from "./theme/themes";
import { ThemeProvider, CssBaseline, Container } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AuthProvider } from "@/hooks/auth";
import { getPath } from "@/libs/utils";
import "./globals.css";
import QueryProvider from "@/components/provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Hatyai Landscape Payroll</title>
        <meta
          name="description"
          content="Payroll system for Hatyai LandScape."
        />
        <link rel="icon" href={getPath("/favicon.ico")} />
      </head>
      <ThemeProvider theme={darkTheme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <AuthProvider>
            <CssBaseline />
            <body id="root">
              <Navigation />
              <Container maxWidth="md" className="pb-4">
                <QueryProvider>{children}</QueryProvider>
              </Container>
            </body>
          </AuthProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </html>
  );
}
