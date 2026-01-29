/**
 * Root Layout Component (App-Level)
 * 
 * The top-level layout for the entire Next.js application.
 * Provides:
 * - Global font configuration (Geist Sans and Geist Mono)
 * - Global CSS styles
 * - HTML document structure
 * - SEO metadata
 * 
 * This layout wraps all pages in the application.
 */
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
  title: "Road Maintenance Management System",
  description: "A web system for reporting and managing road maintenance issues.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        
        {children}
        
      </body>
    </html>
  );
}
