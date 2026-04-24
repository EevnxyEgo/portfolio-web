import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/shared/CustomCursor";
import { NoiseOverlay } from "@/components/shared/NoiseOverlay";
import { ScrollProgress } from "@/components/shared/ScrollProgress";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NoiseOverlay />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
