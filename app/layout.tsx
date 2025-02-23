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
          <div className="flex flex-col sm:gap-4 sm:py-4 sm:p-14">
            <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
              {/* <Logo/> <Nav/> */}
            </header>
            <main className="grid flex-1 items-start gap-2 p-4 sm:px-6 sm:py-0 md:gap-4">
              {children}
            </main>
          </div>
        </main>
      </body>
    </html >
  );
}
