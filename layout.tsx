import type { Metadata } from "next";
import { DM_Sans, Noto_Sans_SC } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["200", "400", "700"],
});

const notoSc = Noto_Sans_SC({
  subsets: ["latin"],
  variable: "--font-noto-sc",
  display: "swap",
  weight: ["200", "400", "700"],
});

export const metadata: Metadata = {
  title: "坐的设计 | DESIGN OF SITTING",
  description: "Find the right chair through a short questionnaire.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hans" className={`${dmSans.variable} ${notoSc.variable}`}>
      <body className="min-h-screen antialiased font-[family-name:var(--font-noto-sc)]">
        {children}
      </body>
    </html>
  );
}
