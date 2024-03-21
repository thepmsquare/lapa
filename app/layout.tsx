import type { Metadata } from "next";

import "../stylesheets/globals.css";
import { Providers } from "./providers";
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
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
