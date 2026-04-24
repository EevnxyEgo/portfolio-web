import type { Metadata } from "next";
import {
  Space_Grotesk,
  DM_Sans,
  JetBrains_Mono,
  Instrument_Serif,
  Bebas_Neue,
} from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arsenius Audley | Fullstack Developer & ML Engineer",
  description:
    "Portfolio of Arsenius Audley W.D. — Computer Engineering graduate from ITS Surabaya. Building fullstack web apps with AI at their core. Next.js, Python, TensorFlow. Alumni Bangkit Academy ML Cohort.",
  keywords: [
    "Arsenius Audley",
    "Fullstack Developer Indonesia",
    "Machine Learning Engineer Indonesia",
    "Next.js Developer",
    "React Developer",
    "TensorFlow Developer",
    "Bangkit Academy Alumni",
    "ITS Surabaya",
    "AI Engineer Indonesia",
    "Portfolio Website",
    "arsendev.net",
  ],
  authors: [{ name: "Arsenius Audley Wahyu Djatmiko" }],
  creator: "Arsenius Audley Wahyu Djatmiko",
  metadataBase: new URL("https://arsendev.net"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://arsendev.net",
    siteName: "Arsenius Audley Portfolio",
    title: "Arsenius Audley | Fullstack Developer & ML Engineer",
    description:
      "Computer Engineering graduate from ITS Surabaya. Building fullstack web apps with AI at their core.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Arsenius Audley Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arsenius Audley | Fullstack Developer & ML Engineer",
    description:
      "Computer Engineering graduate from ITS Surabaya. Building fullstack web apps with AI at their core.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${spaceGrotesk.variable} ${dmSans.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable}`}
    >
      <body className="min-h-screen flex flex-col antialiased">{children}</body>
    </html>
  );
}
