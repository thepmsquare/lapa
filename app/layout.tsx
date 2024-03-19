import type { Metadata } from "next";

import "../stylesheets/globals.css";
import "@fontsource/roboto-slab/300.css";
import "@fontsource/roboto-slab/400.css";
import "@fontsource/roboto-slab/500.css";
import "@fontsource/roboto-slab/700.css";

import "@fontsource/fira-mono/400.css";
import "@fontsource/fira-mono/500.css";
import "@fontsource/fira-mono/700.css";
export const metadata: Metadata = {
  title: "lapa",
  description: "List of Repositories for lapa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
