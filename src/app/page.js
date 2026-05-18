import Categories from "@/components/home/Categories";
import FeaturedTutors from "@/components/home/FeaturedTutors";
import FinalCTA from "@/components/home/FinalCTA";
import Hero from "@/components/home/Hero";
import Testimonials from "@/components/home/Testimonials";
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
      <Testimonials/>
      <FinalCTA/>
      <Footer></Footer>
    </div>
  );
}