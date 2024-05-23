import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ModeToggle } from '@/components/ui/modeToggle';

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['100', '400', '700', '900'],
});

export const metadata: Metadata = {
  title: 'Lehiho',
  description: "Lehiho's blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={notoSansKr.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange>
          <header className="w-full">
            <div className="flex justify-between m-1 items-center">
              <h1>lehiho's blog</h1>
              <ModeToggle />
            </div>
          </header>
          <hr />
          <main className="mx-auto max-w-screen-md">{children}</main>
          <hr />
          <footer className="w-full text-center py-4">
            <p>© 2024 Lehiho's Blog. All rights reserved.</p>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
