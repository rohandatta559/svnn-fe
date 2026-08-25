import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";

export default function SiteLayout({ children }) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
