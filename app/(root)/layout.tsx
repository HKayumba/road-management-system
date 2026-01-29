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
