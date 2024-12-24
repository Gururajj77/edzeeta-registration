import BenefitsSection from "./components/BenefitsSection";
import CouponSection from "./components/CouponSection";
import HeroSection from "./components/HeroSection";
import ValuesSection from "./components/ValuesSection";
import WhyJoinSection from "./components/WhyJoinSection";
import './globals.css';
import Image from 'next/image';
import EdzeetaLogo from '../public/EdzeetaLogo.svg';
export default function RegistrationPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      {/* Header */}
      <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-4">
        <h1 className="text-[#1e3fac] text-3xl sm:text-4xl font-bold">
        <Image
            src={EdzeetaLogo}  
            alt="Edzeeta Logo"
            width={150} 
            height={75} 
            className="object-contain cursor-pointer"
          />
        </h1>
      </header>

      {/* Main content */}
      <main className="w-full flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-8">
          <div className="flex flex-col items-center gap-12 sm:gap-16 lg:gap-24">
            <HeroSection />
            <ValuesSection />
            <WhyJoinSection />
            <BenefitsSection />
            <CouponSection />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="text-center text-gray-500">
          © 2023 EDZEETA. All rights reserved.
        </div>
      </footer>
    </div>
  );
}