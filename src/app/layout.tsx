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
          <header className="w-full px-10 py-3">
            <div className="flex justify-between m-1 items-center">
              <a href="/" className="text-2xl font-extrabold">
                lehiho&apos;s blog
              </a>
              <ModeToggle />
            </div>
          </header>
          <hr />
          <main>{children}</main>
          <hr />
          <footer className="w-full text-center py-4">
            <p>© 2024 Lehiho&apos;s Blog. All rights reserved.</p>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
