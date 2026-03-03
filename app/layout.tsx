import type { Metadata } from "next";
import { Geist, Geist_Mono } from 'next/font/google'
import {Toaster} from "react-hot-toast"
import "./globals.css";
const BASE_URL = "https://adamhitzger.com"

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const _geist = Geist({ subsets: ["latin"] });
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Adam Hitzger | Webový & PLC vývojář',
  description: 'Full-stack webový vývojář a PLC programátor. Next.js, TypeScript, Beckhoff TwinCAT, B&R, Arduino, Fanuc FOCAS.',
  generator: 'nextjs',
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    alternateLocale: "en_US",
    url: BASE_URL,
    title: "Adam Hitzger | Webový & PLC vývojář",
    description: "Full-stack webový vývojář a PLC programátor. Next.js, TypeScript, Beckhoff TwinCAT, B&R, Arduino, Fanuc FOCAS.",
    siteName: "Adam Hitzger",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adam Hitzger | Webový & PLC vývojář",
    description: "Full-stack webový vývojář a PLC programátor. Next.js, TypeScript, Beckhoff TwinCAT, B&R, Arduino, Fanuc FOCAS.",
  },
  keywords: [
    "Adam Hitzger",
    "webový vývojář",
    "PLC programátor",
    "Next.js",
    "TypeScript",
    "Beckhoff",
    "TwinCAT",
    "B&R",
    "Arduino",
    "Fanuc FOCAS",
    "průmyslová automatizace",
    "full-stack vývojář",
  ],
  authors: [{ name: "Adam Hitzger", url: BASE_URL }],
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${BASE_URL}/#person`,
      name: "Adam Hitzger",
      url: BASE_URL,
      jobTitle: "Webový & PLC vývojář",
      description:
        "Full-stack webový vývojář a PLC programátor se specializací na Next.js, TypeScript, Beckhoff TwinCAT, B&R, Arduino a Fanuc FOCAS.",
      sameAs: [
        "https://www.linkedin.com/in/adam-hitzger-aa518622b/",
        "https://github.com/adamhitzger",
      ],
      email: "adam.hitzger@icloud.com",
      knowsAbout: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "React",
        "HTML",
        "CSS",
        "SQL",
        "REST API",
        "Sanity CMS",
        "Beckhoff TwinCAT",
        "B&R Automation",
        "Arduino",
        "Fanuc FOCAS",
        "PLC programování",
        "průmyslová automatizace",
        "IoT",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "Adam Hitzger | Webový & PLC vývojář",
      description:
        "Portfolio Adama Hitzgera – full-stack webového vývojáře a PLC programátora.",
      publisher: { "@id": `${BASE_URL}/#person` },
      inLanguage: ["cs", "en"],
    },
    {
      "@type": "WebPage",
      "@id": `${BASE_URL}/#webpage`,
      url: BASE_URL,
      name: "Adam Hitzger | Webový & PLC vývojář",
      isPartOf: { "@id": `${BASE_URL}/#website` },
      about: { "@id": `${BASE_URL}/#person` },
      inLanguage: ["cs", "en"],
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />   
      </head>
      <body
        className={`font-sans antialiased overflow-x-hidden`}
      >
        {children}
        <Toaster/>
      </body>
    </html>
  );
}
