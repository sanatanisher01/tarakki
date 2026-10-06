import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tarakki — Your business, online",
  description: "Create your shop website, manage products and prepare your social posts with Tarakki.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
