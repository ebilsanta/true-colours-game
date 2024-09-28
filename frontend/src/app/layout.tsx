import { ColorModeScript, Box } from "@chakra-ui/react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import theme from "./styles/theme";
import { ColorModeSwitcher } from "./components/ColorModeSwitcher";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "True Colours",
  description: "A True Colours digital clone created by Thaddeus Lee",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Providers>
          <ColorModeSwitcher />
          <Box display="flex" justifyContent="center">
            {children}
          </Box>
        </Providers>
      </body>
    </html>
  );
}
