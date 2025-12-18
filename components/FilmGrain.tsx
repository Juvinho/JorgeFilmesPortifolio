import React from 'react';

const FilmGrain: React.FC = () => {
  return (
    <>
      <style>{`
        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -10%); }
          20% { transform: translate(-15%, 5%); }
          30% { transform: translate(7%, -25%); }
          40% { transform: translate(-5%, 25%); }
          50% { transform: translate(-15%, 10%); }
          60% { transform: translate(15%, 0%); }
          70% { transform: translate(0%, 15%); }
          80% { transform: translate(3%, 35%); }
          90% { transform: translate(-10%, 10%); }
        }
        .animate-grain {
          animation: grain 8s steps(10) infinite;
        }
        /* Custom Scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #0a0a0a;
        }
        ::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #D4AF37;
        }
      `}</style>
      <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden opacity-[0.05] mix-blend-overlay">
        <div className="absolute inset-[-200%] h-[400%] w-[400%] animate-grain bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/Noise.png')] bg-[length:256px_256px]"></div>
      </div>
    </>
  );
};

export default FilmGrain;
