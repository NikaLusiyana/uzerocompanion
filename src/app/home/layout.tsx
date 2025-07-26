import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex items-center sm:px-6 md:px-8">{children}</main>
      <Footer />
    </>
  );
}
