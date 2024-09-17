import './globals.css';
import { Inter} from 'next/font/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleAdsense from './GoogleAdsense';

const inter = Inter({ subsets: ['latin'] });

const google = process.env.GOOGLE_CLIENT_ID || '';
const pub = process.env.PUB || '';


export default function RootLayout({

  
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <GoogleOAuthProvider clientId={google}>
        <body className={`${inter.className}`}>{children}</body>
        <GoogleAdsense pId={pub} />
      </GoogleOAuthProvider>

    </html>
  );
}

