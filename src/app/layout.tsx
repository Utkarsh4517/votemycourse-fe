import './globals.css';
import { Inter, Vina_Sans, Playfair_Display } from 'next/font/google';
import { GoogleOAuthProvider } from '@react-oauth/google';

const inter = Inter({ subsets: ['latin'] });
const vinaSans = Vina_Sans({ subsets: ['latin'], weight: ['400']});
const playFairDisplay = Playfair_Display({ 
  subsets: ['latin'], 
  weight: ['400', '400'],
  style: ['normal', 'italic'],
});
const google = process.env.GOOGLE_CLIENT_ID || '';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <GoogleOAuthProvider clientId={google}>
        <body className={`${inter.className}`}>{children}</body>
      </GoogleOAuthProvider>
    </html>
  );
}
export {vinaSans, playFairDisplay};