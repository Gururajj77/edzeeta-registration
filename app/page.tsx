"use client"

import BenefitsSection from "./components/BenefitsSection";
import CouponSection from "./components/CouponSection";
import HeroSection from "./components/HeroSection";
import ValuesSection from "./components/ValuesSection";
import WhyJoinSection from "./components/WhyJoinSection";
import { EnrollmentNotifications } from "./components/EnrollmentNotifications";
import './globals.css';
import Image from 'next/image';
import EdzeetaBigLogo from '../public/EdzeetaBigLogo.svg';
import OfficialPartner from '../public/OfficialPartner.svg';
import { Toaster } from "@/components/ui/toaster";

export default function RegistrationPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      {/* Enrollment notifications */}
      <EnrollmentNotifications />
      
      {/* Toast container - place it at root level */}
      <Toaster />
      
      {/* Header */}
      <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-4">
        <div className="flex justify-between items-center">
          <div className="w-32 sm:w-40 md:w-48 lg:w-52">
            <Image
              src={EdzeetaBigLogo}  
              alt="Edzeeta Logo"
              width={200} 
              height={100} 
              className="object-contain cursor-pointer w-full h-auto"
            />
          </div>
          <div className="w-32 sm:w-40 md:w-48 lg:w-52">
            <Image
              src={OfficialPartner}  
              alt="Official Partner Logo"
              width={200} 
              height={100} 
              className="object-contain cursor-pointer w-full h-auto"
            />
          </div>
        </div>
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
          © 2024 EDZEETA. All rights reserved.
        </div>
      </footer>
    </div>
  );
}