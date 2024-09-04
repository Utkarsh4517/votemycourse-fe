import './globals.css';
import { Inter } from 'next/font/google';
import { GoogleOAuthProvider } from '@react-oauth/google';

const inter = Inter({ subsets: ['latin'] });
const google = process.env.GOOGLE_CLIENT_ID || '';

export const metadata = {
  title: 'VoteMyCourse',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <GoogleOAuthProvider clientId={google}>
        <body className={inter.className}>{children}</body>
      </GoogleOAuthProvider>
    </html>
  );
}