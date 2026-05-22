import "./globals.css";
import { Inter, Poppins } from "next/font/google";
import Providers from "./providers";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import AppNavbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "MediQueue",
  description: "Tutor Booking System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${poppins.variable} font-body`}
      >
        <Providers>
          <AppNavbar/>
          {children}
          </Providers>
          <Footer></Footer>
        <ToastContainer/>

      </body>
    </html>
  );
}