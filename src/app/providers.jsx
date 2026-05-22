"use client";

import { HeroUIProvider } from "@heroui/system";

import {
  ThemeProvider,
} from "next-themes";

export default function Providers({
  children,
}) {

  return (

    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
    >

      <HeroUIProvider>

        {children}

      </HeroUIProvider>

    </ThemeProvider>
  );
}