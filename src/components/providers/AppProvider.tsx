import { ThemeProvider } from "next-themes";
import React from "react";

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute={"class"} defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}
