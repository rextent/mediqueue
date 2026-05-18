import Categories from "@/components/home/Categories";
import FeaturedTutors from "@/components/home/FeaturedTutors";
import Hero from "@/components/home/Hero";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Footer from "@/components/shared/Footer";
import AppNavbar from "@/components/shared/Navbar";

export default function Home() {
  return (
    <div>
      <AppNavbar />
      <Hero/>
      <FeaturedTutors/>
      <WhyChooseUs/>
      <Categories/>
      <div className="min-h-screen">
        
      </div>
      <Footer></Footer>
    </div>
  );
}