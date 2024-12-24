import Link from "next/link";
import { Sparkles } from 'lucide-react';

export default function HeroSection() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 sm:space-y-8 lg:space-y-6 text-center px-4 py-12 sm:py-16 lg:py-4">
      <div className="bg-gray-50 rounded-3xl p-8 sm:p-10 lg:p-12 shadow-lg">
        <div className="space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl text-black font-bold leading-tight tracking-tight">
            <span className="text-[#1e3fac]">Claim</span> Your Exclusive <br className="hidden sm:block" />
            Enrollment Spot Today
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-600 max-w-2xl mx-auto">
            Unlock Your Potential with Industry-Leading Courses and Internship training.
          </p>
        </div>
      </div>

      <div className="pt-4">
        <p className="text-gray-500 mb-8">
          Join hundreds of successful students who have already secured their spots
        </p>
        
        <div className="flex justify-center">
          <Link
             href="#coupon-section"
            className="inline-flex items-center gap-2 bg-[#1e3fac] text-white 
                       px-8 sm:px-10 py-4 sm:py-5 
                       text-lg sm:text-xl 
                       rounded-lg font-semibold 
                       hover:bg-[#162c7c] 
                       transform hover:scale-105 transition-all duration-300
                       shadow-lg hover:shadow-xl"
          >
            <Sparkles className="w-5 h-5" />
            <span>Register Now</span>
          </Link>
        </div>
      </div>
    </div>
  );
}