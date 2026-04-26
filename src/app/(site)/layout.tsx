import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { NoiseOverlay } from "@/components/shared/NoiseOverlay";
import { BackToTop } from "@/components/shared/BackToTop";
import { ToastContainer } from "@/components/shared/Toast";
import { EasterEggs } from "@/components/shared/EasterEggs";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NoiseOverlay />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <BackToTop />
      <ToastContainer />
      <EasterEggs />
    </>
  );
}
