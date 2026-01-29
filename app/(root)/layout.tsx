/**
 * Root Layout Component (Public Pages)
 * 
 * Layout wrapper for all public-facing pages (homepage, report form, etc.).
 * Provides:
 * - Global header with navigation
 * - Global footer
 * - HTML structure
 * 
 * Used by routes in the (root) route group:
 * - / (homepage)
 * - /report (public issue reporting)
 */
import Header from "@/components/section/Header";
import Footer from "@/components/section/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <main>
        <Header />
        {children}
        <Footer />
      </main>
    </html>
  );
}
