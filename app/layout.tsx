import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Saishree Vitalife — Google Review',
  description: 'Send Google Review request to patient',
  themeColor: '#f47216',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
