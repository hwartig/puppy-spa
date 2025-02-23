import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";


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
              <Image src="/logo.png" alt="PuppySpa" width={74} height={52} />
              <Link href="/" className="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 [&_svg:not([class*='text-'])]:text-muted-foreground flex flex-col gap-1 rounded-sm p-2 text-sm transition-[color,box-shadow] focus-visible:ring-4 focus-visible:outline-1 [&_svg:not([class*='size-'])]:size-4">
                Waiting List
              </Link>
              {/* <Link href="/history">History</Link> */}
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
