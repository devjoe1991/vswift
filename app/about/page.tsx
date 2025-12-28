import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AboutContent from "@/components/sections/AboutContent";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

export default function About() {
  return (
    <>
      <main className="min-h-screen bg-[#fafafa]">
        <Header />
        <AboutContent />
        <Footer />
        <WhatsAppButton />
      </main>
    </>
  );
}

