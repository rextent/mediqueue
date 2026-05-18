import Hero from "@/components/home/Hero";
import Footer from "@/components/shared/Footer";
import AppNavbar from "@/components/shared/Navbar";

export default function Home() {
  return (
    <div>
      <AppNavbar />
      <Hero/>
      <div className="min-h-screen">
        
      </div>
      <Footer></Footer>
    </div>
  );
}