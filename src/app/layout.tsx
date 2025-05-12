import type { Metadata } from 'next';
import './globals.css';

import { Montserrat, Vollkorn } from 'next/font/google';

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
});

const volkorn = Vollkorn({
  variable: '--font-volkorn',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'A Garden Path',
  description: 'The Digital Garden of Caitlin Donahue',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${montserrat.variable} ${volkorn.variable}`}>
        {children}
      </body>
    </html>
  );
}
