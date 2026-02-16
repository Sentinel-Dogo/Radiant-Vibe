
import React, { useState } from 'react';
import { INSTRUMENTS } from '../constants';
import { Instrument } from '../types';

export const InstrumentSection: React.FC = () => {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="w-full space-y-6 mt-8">
      <div className="flex flex-col items-center text-center space-y-2">
        <h3 className="text-2xl font-bold text-slate-800">Uplifting Frequencies</h3>
        <p className="text-slate-500 max-w-md">Instruments that heal, ground, and inspire. Click one to feel its vibration.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {INSTRUMENTS.map((inst) => (
          <button
            key={inst.id}
            onClick={() => setActive(active === inst.id ? null : inst.id)}
            className={`p-6 rounded-3xl transition-all duration-300 text-left relative overflow-hidden group ${
              active === inst.id 
                ? 'bg-white shadow-xl scale-[1.02] border-2 border-amber-300' 
                : 'glass hover:bg-white/80 hover:shadow-lg'
            }`}
          >
            <div className="flex flex-col gap-3 relative z-10">
              <div className="text-3xl transition-transform duration-300 group-hover:scale-110">
                {inst.icon}
              </div>
              <div>
                <h4 className="font-bold text-slate-800">{inst.name}</h4>
                <p className="text-amber-600 text-[10px] font-bold uppercase tracking-wider">{inst.vibe}</p>
              </div>
              {active === inst.id && (
                <p className="text-xs text-slate-600 mt-2 leading-relaxed animate-in fade-in slide-in-from-top-1">
                  {inst.description}
                </p>
              )}
            </div>
            
            {/* Visual ripple effect on active */}
            {active === inst.id && (
              <div className="absolute inset-0 bg-amber-50/30 animate-pulse pointer-events-none"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
