
import React, { useState } from 'react';
import { MotivationData } from '../types';
import { generateSpeech } from '../services/geminiService';

interface MotivationDisplayProps {
  data: MotivationData;
  loading: boolean;
}

export const MotivationDisplay: React.FC<MotivationDisplayProps> = ({ data, loading }) => {
  const [playing, setPlaying] = useState(false);
  const [vocalMode, setVocalMode] = useState<'none' | 'loading' | 'playing'>('none');

  const handleVocalizeContent = async () => {
    if (vocalMode !== 'none') return;
    try {
      setVocalMode('loading');
      // Full session script: Pep talk + Affirmation
      const script = `Hello. Here is your daily motivation. ${data.pepTalk}. Now, repeat this after me: ${data.affirmation}. You've got this.`;
      const audioBase64 = await generateSpeech(script);
      
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      const binary = atob(audioBase64);
      const len = binary.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i);
      
      const dataInt16 = new Int16Array(bytes.buffer);
      const frameCount = dataInt16.length;
      const buffer = audioCtx.createBuffer(1, frameCount, 24000);
      const channelData = buffer.getChannelData(0);
      for (let i = 0; i < frameCount; i++) channelData[i] = dataInt16[i] / 32768.0;

      const source = audioCtx.createBufferSource();
      source.buffer = buffer;
      source.connect(audioCtx.destination);
      source.onended = () => setVocalMode('none');
      source.start();
      setVocalMode('playing');
    } catch (err) {
      console.error(err);
      setVocalMode('none');
    }
  };

  if (loading) {
    return (
      <div className="w-full glass rounded-3xl p-12 flex flex-col items-center justify-center gap-6 animate-pulse min-h-[400px]">
        <div className="w-16 h-16 bg-amber-100 rounded-full"></div>
        <div className="h-4 w-64 bg-slate-100 rounded"></div>
        <div className="h-4 w-48 bg-slate-100 rounded"></div>
        <div className="h-4 w-56 bg-slate-100 rounded"></div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <div className="glass rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-100 transition-all duration-500 hover:shadow-2xl relative overflow-hidden">
        {/* Play Full Session Overlay/Button */}
        <div className="absolute top-6 right-6">
          <button 
            onClick={handleVocalizeContent}
            disabled={vocalMode === 'loading'}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all shadow-md active:scale-95 ${
              vocalMode === 'playing' 
                ? 'bg-amber-500 text-white animate-pulse' 
                : vocalMode === 'loading'
                ? 'bg-slate-100 text-slate-400'
                : 'bg-white text-slate-800 hover:bg-slate-50'
            }`}
          >
            {vocalMode === 'loading' ? 'Preparing...' : vocalMode === 'playing' ? '🎙️ Reading Session' : '🎧 Play Vocal Session'}
          </button>
        </div>

        <div className="flex flex-col items-center text-center space-y-8">
          <div className="space-y-4 pt-4 md:pt-0">
            <h2 className="font-serif italic text-3xl md:text-5xl text-slate-800 leading-tight">
              "{data.quote}"
            </h2>
            <p className="text-amber-500 font-bold tracking-widest uppercase text-sm">
              — {data.author}
            </p>
          </div>

          <div className="w-full h-px bg-slate-100"></div>

          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-slate-800 flex items-center justify-center gap-2">
              Deep Insight
            </h3>
            <p className="text-slate-600 leading-relaxed text-xl max-w-2xl mx-auto font-medium">
              {data.pepTalk}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full pt-4">
            <div className="bg-amber-50/50 p-8 rounded-3xl border border-amber-100 text-left relative overflow-hidden">
              <span className="text-amber-600 text-xs font-black uppercase mb-3 block">Daily Power Mantra</span>
              <p className="text-slate-900 font-bold text-2xl leading-tight">
                {data.affirmation}
              </p>
              <div className="absolute -bottom-4 -right-4 text-amber-200/20 text-8xl font-black italic select-none">AM</div>
            </div>

            <div className="bg-blue-50/50 p-8 rounded-3xl border border-blue-100 text-left relative overflow-hidden">
              <span className="text-blue-600 text-xs font-black uppercase mb-3 block">Energy Challenge</span>
              <p className="text-slate-900 font-bold text-2xl leading-tight">
                {data.challenge}
              </p>
              <div className="absolute -bottom-4 -right-4 text-blue-200/20 text-8xl font-black italic select-none">GO</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
