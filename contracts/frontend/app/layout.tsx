import "./globals.css";
import type { Metadata } from "next";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "ControlledToken zkSync",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-fuchsia-950">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
