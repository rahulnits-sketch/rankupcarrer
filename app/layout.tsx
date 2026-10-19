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
  metadataBase: new URL("https://rankupcarrer.vercel.app"),
  title: {
    default: "RankUp Career - All Engineering GATE Prep (CSE, ME, CE, EE, ECE), DSA & Placements",
    template: "%s | RankUp Career",
  },
  description:
    "Comprehensive preparation platform for all GATE engineering branches (CSE, Mechanical, Civil, Electrical, ECE) with 38-year PYQs (1987-2026), chapter-wise tests, curated DSA sheets, and campus placement prep.",
  keywords: [
    "GATE Preparation All Branches",
    "GATE CSE PYQ with solutions",
    "GATE Mechanical PYQ solved papers",
    "GATE Civil Engineering test series",
    "GATE Electrical Engineering mock test",
    "GATE ECE previous year questions",
    "GATE chapter wise questions 1987 to 2026",
    "Striver A2Z DSA sheet practice",
    "Blind 75 NeetCode roadmap",
    "Topic wise DSA practice problems",
    "Campus placement aptitude questions",
    "TCS NQT Infosys placement mock test",
    "Software engineer interview questions with answers",
    "GATE CBT mock test 2026"
  ],
  authors: [{ name: "RankUp Career" }],
  creator: "RankUp Career",
  publisher: "RankUp Career",
  alternates: {
    canonical: "./",
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
  openGraph: {
    title: "RankUp Career - All Engineering GATE Prep, PYQs, DSA & Placements",
    description:
      "Practice 38 years of GATE PYQs across CSE, ME, CE, EE & ECE with detailed step-by-step solutions, CBT mock tests, curated DSA sheets, and aptitude tests.",
    url: "https://rankupcarrer.vercel.app",
    siteName: "RankUp Career",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RankUp Career - All Engineering GATE Prep, PYQs, DSA & Placements",
    description:
      "Practice 38 years of GATE PYQs across CSE, ME, CE, EE & ECE with detailed step-by-step solutions, CBT mock tests, curated DSA sheets, and aptitude tests.",
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
            __html: `window.MathJax = ${JSON.stringify({
              tex: {
                inlineMath: [["$", "$"], ["\\(", "\\)"]],
                displayMath: [["$$", "$$"], ["\\[", "\\]"]],
                processEscapes: true,
                packages: { "[+]": ["ams", "color", "base"] }
              },
              chtml: {
                fontURL: "https://cdn.jsdelivr.net/npm/mathjax@3/es5/output/chtml/fonts/woff-v2"
              },
              startup: {
                typeset: false
              },
              options: {
                skipHtmlTags: ["script", "noscript", "style", "textarea", "pre", "code"]
              }
            })};`,
          }}
        />
        <script
          id="MathJax-script"
          async
          src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "EducationalOrganization",
                  "@id": "https://rankupcarrer.vercel.app/#organization",
                  "name": "RankUp Career",
                  "url": "https://rankupcarrer.vercel.app",
                  "logo": "https://rankupcarrer.vercel.app/Glossy%20Blue%20Gradient%20Checkmark.png",
                  "description": "All-in-one preparation portal for GATE (CSE, ME, CE, EE, ECE), chapter-wise PYQs (1987-2026), DSA coding sheets, and campus placements."
                },
                {
                  "@type": "WebSite",
                  "@id": "https://rankupcarrer.vercel.app/#website",
                  "url": "https://rankupcarrer.vercel.app",
                  "name": "RankUp Career",
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": "https://rankupcarrer.vercel.app/gate/pyq?q={search_term_string}",
                    "query-input": "required name=search_term_string"
                  }
                }
              ]
            })
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#f8fafc] text-[#0f172a] selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
