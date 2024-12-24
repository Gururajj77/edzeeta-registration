export default function BenefitsSection() {
    const benefits = [
      "Training from Basics",
      "Projects/Assignments",
      "3 Certificates",
      "Letter of Recommendation",
      "Resume Building",
      "LinkedIn Profile Building",
      "100% Placement Assistance"
    ];
  
    return (
      <div className="max-w-5xl w-full mt-24 px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-3">What You Will Get from This Training?</h2>
          <div className="w-24 h-1 bg-[#1e3fac] mx-auto"></div>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 relative">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-[#1e3fac] text-white rounded-full py-4 px-8 text-xl font-semibold 
                       shadow-lg transform hover:scale-105 transition-transform duration-300
                       min-w-[250px] text-center"
            >
              {benefit}
            </div>
          ))}
        </div>
  
        <div className="mt-12 bg-gray-50 rounded-3xl p-8 shadow-lg">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4 text-[#1e3fac]">Ready to Start Your Journey?</h3>
            <p className="text-gray-700 text-lg">
              Join our comprehensive training program and get access to all these benefits 
              designed to kickstart your career in the industry.
            </p>
          </div>
        </div>
      </div>
    );
  }