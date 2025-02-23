import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PuppySpa",
  description: "Waiting List management for animal spa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen w-full flex-col bg-muted/40">
        <main className="flex min-h-screen w-full flex-col ">
          {children}
        </main>
      </body>
    </html>
  );
}
