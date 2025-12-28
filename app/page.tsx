import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import ServiceNavigator from "@/components/sections/ServiceNavigator";
import GlobalBottomSheet from "@/components/overlay/GlobalBottomSheet";
import StructuredData from "@/components/seo/StructuredData";
import { services } from "@/data/services";

export default function Home() {
  return (
    <>
      <StructuredData />
      <main className="min-h-screen bg-[#fafafa]">
        <Header />
        <Hero />
        <About />
        <ServiceNavigator services={services} />
        <Footer />
        <GlobalBottomSheet />
      </main>
    </>
  );
}
