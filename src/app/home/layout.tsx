import Navbar from "@/src/components/ui/Navbar"; // Komponen navigasi atas
import Footer from "@/src/components/ui/Footer"; // Komponen footer bawah

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex items-center sm:px-6 md:px-8">{children}</main>
      <Footer />
    </>
  );
}
