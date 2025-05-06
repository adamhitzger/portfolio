import type { Metadata } from "next";
import { Spline_Sans_Mono } from "next/font/google";
import {Toaster} from "react-hot-toast"
import "./globals.css";

const splineMono = Spline_Sans_Mono({
  variable: "--spline-sans-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  icons: {
    icon: "/me.jpeg"
  },
  applicationName: "Adam Hitzger",
  generator: "Next.ts",
  title: "Adam Hitzger",
  description: "Jmenuji se Adam Hitzger. Zabývám se vývojem webových stránek a aplikací.",
  authors: [{name: "Adam Hitzger"}, {name: "Petr Krajcigr"}],
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
        className={`${splineMono.variable} ${splineMono.variable} flex flex-col min-h-screen w-full items-center antialiased`}
      >
        {children}
        <Toaster/>
      </body>
    </html>
  );
}
