// app/ClientLayout.tsx
"use client";

import { ThemeProvider } from "@/contexts/theme-context";
import { Header } from "@/components/layout/header";
import { Box } from "@mui/material";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
        <Header />
        <main>{children}</main>
      </Box>
    </ThemeProvider>
  );
}
