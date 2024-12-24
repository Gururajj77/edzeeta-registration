import { Lightbulb, BookOpenCheck, Brain, Users, HandHeart } from "lucide-react";

const features = [
  {
    icon: <Lightbulb className="text-[#1e3fac]" />,
    title: "Learn from the Basics:",
    description: "Start with foundational knowledge, ensuring you build a strong understanding of core concepts."
  },
  {
    icon: <BookOpenCheck className="text-[#1e3fac]" />,
    title: "Flexible and Convenient Learning:",
    description: "Enjoy the freedom to study anytime and anywhere, making learning accessible and adaptable to your schedule."
  },
  {
    icon: <Brain className="text-[#1e3fac]" />,
    title: "Hands-On Projects and Assignments:",
    description: "Gain practical experience through real-world projects and assignments that enhance your skills."
  },
  {
    icon: <Users className="text-[#1e3fac]" />,
    title: "Comprehensive Career Development Support:",
    description: "Receive guidance on resume building, LinkedIn optimization, and interview preparation to boost your career prospects."
  },
  {
    icon: <HandHeart className="text-[#1e3fac]" />,
    title: "100% Placement Assistance:",
    description: "Benefit from dedicated support to secure job placements and kick-start your career with confidence."
  }
];

export default function WhyJoinSection() {
  return (
    <div className="w-full max-w-4xl mx-auto mt-12 sm:mt-16 lg:mt-24 px-4">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12">
        Why Join Edzeeta?
      </h2>
      
      <div className="relative">
        {/* Vertical line - hidden on mobile */}
        <div className="hidden sm:block absolute top-24 left-1/2 w-0.5 h-[80%] bg-[#1e3fac] transform -translate-x-1/2 -z-10" />
        
        <div className="space-y-8 sm:space-y-12">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6
                         p-4 rounded-lg hover:bg-gray-50 transition-colors duration-300"
            >
              <div className="bg-white p-2 rounded-lg shadow-sm">
                <div className="w-12 h-12 sm:w-[48px] sm:h-[48px]">
                  {feature.icon}
                </div>
              </div>
              
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-[#1e3fac] font-bold text-lg sm:text-xl mb-2">
                  {feature.title}
                </h3>
                <p className="text-base sm:text-lg text-gray-700">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}