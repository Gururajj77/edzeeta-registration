export default function ValuesSection() {
    const edzetaValues = [
      { letter: 'E', word: 'Education', description: 'that builds from the basics' },
      { letter: 'D', word: 'Development', description: 'of essential industry skills' },
      { letter: 'Z', word: 'Zeal', description: 'for continuous learning and improvement' },
      { letter: 'E', word: 'Excellence', description: 'in delivering hands-on, practical knowledge' },
      { letter: 'E', word: 'Employment', description: 'support with career-focused training' },
      { letter: 'T', word: 'Training', description: 'through real-world projects and assignments' },
      { letter: 'A', word: 'Aspiration', description: 'support, guiding freshers towards career success' },
    ];
  
    return (
      <div className="w-full max-w-4xl mx-auto mt-12 sm:mt-16 lg:mt-24 px-4">
        <div className="space-y-4 sm:space-y-6">
          {edzetaValues.map(({ letter, word, description }, index) => (
            <div 
              key={index} 
              className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 
                         text-center sm:text-left p-4 rounded-lg
                         hover:bg-gray-50 transition-colors duration-300"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#1e3fac]  
                            text-white flex items-center justify-center 
                            text-2xl sm:text-3xl font-bold flex-shrink-0 
                            mx-auto sm:mx-0 rounded-lg sm:rounded-none
                            shadow-sm"
              >
                {letter}
              </div>
              <div className="flex-grow space-y-1 sm:space-y-0">
                <span className="text-[#1e3fac] text-xl sm:text-2xl font-bold block sm:inline">{word}</span>
                <span className="text-lg sm:text-2xl text-gray-700 block sm:inline"> {description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }