import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Code, Zap } from 'lucide-react';

function App() {
  const [isUnfolded, setIsUnfolded] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Start the unfolding animation after component mounts
    const timer1 = setTimeout(() => setIsUnfolded(true), 500);
    const timer2 = setTimeout(() => setShowContent(true), 1500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Origami Paper Animation */}
        <div className="relative mb-8">
          <div
            className={`relative bg-white/80 backdrop-blur-xl rounded-lg shadow-2xl border border-white/20 overflow-hidden transition-all duration-1000 ease-out ${
              isUnfolded
                ? 'transform rotate-0 scale-100 opacity-100'
                : 'transform rotate-12 scale-95 opacity-0'
            }`}
            style={{
              boxShadow: isUnfolded
                ? '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)'
                : '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
            }}
          >
            {/* Paper fold lines */}
            <div className="absolute inset-0">
              <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
              <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent"></div>
            </div>

            {/* Content */}
            <div className={`p-8 md:p-12 text-center transition-all duration-500 ${
              showContent ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
            }`}>
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Hello World
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 mb-6">
                  Built with the <span className="font-semibold text-purple-600">Origami Protocol</span>
                </p>
              </div>

              {/* Feature cards */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-white/40 hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <Code className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Clean Architecture</h3>
                  <p className="text-gray-600 text-sm">Built with React, TypeScript, and modern tools</p>
                </div>

                <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-white/40 hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <Zap className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Lightning Fast</h3>
                  <p className="text-gray-600 text-sm">Optimized with Vite for instant loading</p>
                </div>

                <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-white/40 hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <Heart className="w-8 h-8 text-pink-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Beautiful Design</h3>
                  <p className="text-gray-600 text-sm">Glassmorphism effects and smooth animations</p>
                </div>
              </div>

              {/* CTA Button */}
              <button
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 hover:scale-105"
                onClick={() => window.open('https://github.com/cyserman/origami-protocol', '_blank')}
              >
                <Code className="w-5 h-5 mr-2" />
                Learn the Origami Protocol
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`text-center transition-all duration-500 delay-500 ${
          showContent ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
        }`}>
          <p className="text-gray-500 text-sm">
            Built with ❤️ using the Origami Protocol • Phase 1-4 Complete
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;

