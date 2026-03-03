import type { Metadata } from "next";
import { Geist, Geist_Mono } from 'next/font/google'
import {Toaster} from "react-hot-toast"
import "./globals.css";
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const _geist = Geist({ subsets: ["latin"] });
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  icons: {
    icon: "/me.jpeg"
  },
  applicationName: "Adam Hitzger",
  generator: "Next.ts",
  title: "Adam Hitzger",
  description: "Jmenuji se Adam Hitzger. Zabývám se vývojem webových stránek a aplikací.",
  authors: [{name: "Adam Hitzger"}],
  keywords: [
    "web",
    "webové stránky",
    "aplikace",
    "software",
    "eshopy",
    "programování",
    "Havlíčkův Brod",
    "Jihlava"
],
creator: "Adam Hitzger",
        publisher: "Adam Hitzger",
        formatDetection: {
            email: false,
            address: false,
            telephone: false,
          },
openGraph: {
  title: "Adam Hitzger",
  description: "Jmenuji se Adam Hitzger. Zabývám se vývojem webových stránek a aplikací.",
  url: "https://www.adamhitzger.com",
  siteName: "Adam Hitzger",
  locale: "cs_CZ",
  type: "website"
}

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` font-sans antialiased overflow-x-hidden`}
      >
        {children}
        <Toaster/>
      </body>
    </html>
  );
}
