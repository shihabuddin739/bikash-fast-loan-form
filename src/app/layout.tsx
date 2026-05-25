import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LoanProvider } from "@/context/LoanContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Dynamically determine the site URL for Open Graph absolute paths.
// To use a custom domain, set NEXT_PUBLIC_SITE_URL in your .env or environment variables (e.g. NEXT_PUBLIC_SITE_URL=https://your-domain.com).
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "বিকাশ লোন - সিটি ব্যাংক থেকে তাৎক্ষণিক লোন",
  description: "বিকাশ অ্যাপের মাধ্যমে সিটি ব্যাংক থেকে তাৎক্ষণিক লোন নিন",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/bikash.jpeg", type: "image/jpeg" }
    ],
    shortcut: "/bikash.jpeg",
    apple: "/bikash.jpeg",
  },
  openGraph: {
    title: "বিকাশ লোন - সিটি ব্যাংক থেকে তাৎক্ষণিক লোন",
    description: "বিকাশ অ্যাপের মাধ্যমে সিটি ব্যাংক থেকে তাৎক্ষণিক লোন নিন",
    images: [
      {
        url: "/bikash.jpeg",
        width: 1200,
        height: 630,
        alt: "বিকাশ লোন",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "বিকাশ লোন - সিটি ব্যাংক থেকে তাৎক্ষণিক লোন",
    description: "বিকাশ অ্যাপের মাধ্যমে সিটি ব্যাংক থেকে তাৎক্ষণিক লোন নিন",
    images: ["/bikash.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="bn"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LoanProvider>
          {children}
        </LoanProvider>
      </body>
    </html>
  );
}

