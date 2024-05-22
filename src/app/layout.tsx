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
      <body className={`${notoSansKr.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
