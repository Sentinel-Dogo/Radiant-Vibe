
import React from 'react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen relative flex flex-col items-center p-4 md:p-8 overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-orange-100 rounded-full blur-[120px] opacity-40 animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-100 rounded-full blur-[120px] opacity-40 animate-pulse pointer-events-none"></div>
      
      <main className="relative z-10 w-full max-w-4xl flex flex-col gap-8">
        {children}
      </main>
      
      <footer className="mt-auto py-8 text-slate-400 text-sm font-medium">
        Radiating positivity since 2024 • Powered by Gemini
      </footer>
    </div>
  );
};
