import "./globals.css";
import { Inter } from "next/font/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleAdsense from "./GoogleAdsense";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

const google = process.env.GOOGLE_CLIENT_ID || "";
const pub = process.env.PUB || "";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          type="module"
          src="https://richinfo.co/richpartners/push/js/rp-cl-ob.js?pubid=940411&siteid=351360&niche=33"
          async
          data-cfasync="false"
        />
      </head>
      <GoogleOAuthProvider clientId={google}>
        <body className={`${inter.className}`}>{children}</body>
        <GoogleAdsense pId={pub} />
      </GoogleOAuthProvider>
    </html>
  );
}
