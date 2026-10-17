import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cse-gate.vercel.app"),
  title: {
    default: "CheckMate College - CSE GATE Prep, PYQs & DSA Placement Preparation",
    template: "%s | CheckMate College",
  },
  description:
    "Comprehensive preparation platform for CSE GATE with previous year questions (PYQ), detailed solutions, topic-wise DSA roadmaps, and campus placement interview prep.",
  keywords: [
    "CSE GATE",
    "GATE CSE",
    "GATE CSE PYQ",
    "GATE PYQ with solutions",
    "DSA placement preparation",
    "GATE Computer Science test series",
    "Campus placement preparation",
    "DSA roadmap",
    "GATE CSE mock test",
    "GATE CSE subjects",
  ],
  authors: [{ name: "CheckMate College" }],
  creator: "CheckMate College",
  publisher: "CheckMate College",
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
  openGraph: {
    title: "CheckMate College - CSE GATE, PYQs & DSA Placement Preparation",
    description:
      "Practice CSE GATE previous year questions, take mock tests, and master DSA & aptitude for tech placements.",
    url: "https://cse-gate.vercel.app",
    siteName: "CheckMate College",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CheckMate College - CSE GATE, PYQs & DSA Placement Preparation",
    description:
      "Practice CSE GATE previous year questions, take mock tests, and master DSA & aptitude for campus placements.",
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.MathJax = {
                tex: {
                  inlineMath: [['$', '$'], ['\\\\(', '\\\\)']],
                  displayMath: [['$$', '$$'], ['\\\\[', '\\\\]']],
                  processEscapes: true
                },
                svg: { fontCache: 'global' },
                options: { skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code'] }
              };
            `,
          }}
        />
        <script
          id="MathJax-script"
          async
          src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#f8fafc] text-[#0f172a] selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
