
import React, { useState, useEffect, useCallback } from 'react';
import { Topic, MotivationData } from './types';
import { generateMotivation } from './services/geminiService';
import { Layout } from './components/Layout';
import { TopicSelector } from './components/TopicSelector';
import { MotivationDisplay } from './components/MotivationDisplay';
import { InstrumentSection } from './components/InstrumentSection';
import { MusicPlayer } from './components/MusicPlayer';

const App: React.FC = () => {
  const [activeTopic, setActiveTopic] = useState<Topic>(Topic.PEACE);
  const [motivation, setMotivation] = useState<MotivationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMotivation = useCallback(async (topic: Topic) => {
    setLoading(true);
    setError(null);
    try {
      const data = await generateMotivation(topic);
      setMotivation(data);
    } catch (err) {
      setError("The universe is busy breathing. Please try again in a moment.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMotivation(activeTopic);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTopic]);

  const handleRefresh = () => {
    fetchMotivation(activeTopic);
  };

  return (
    <Layout>
      <MusicPlayer />
      
      <div className="flex flex-col items-center gap-12 pt-12 pb-24">
        {/* Header Section */}
        <header className="text-center space-y-4 max-w-xl animate-in fade-in slide-in-from-top-4 duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-100 text-amber-700 text-sm font-bold tracking-tight mb-2">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
            LIVE POSITIVE ENERGY
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-slate-900 leading-tight">
            Radiant <span className="text-amber-500 italic">Vibe</span>
          </h1>
          <p className="text-slate-500 text-lg md:text-xl font-medium">
            Your daily oasis of light, inspiration, and pure upliftment.
          </p>
        </header>

        {/* Interaction Controls */}
        <div className="w-full flex flex-col items-center gap-8">
          <TopicSelector activeTopic={activeTopic} onSelect={setActiveTopic} />
          
          <div className="w-full relative group">
            <button 
              onClick={handleRefresh}
              className="absolute -top-4 -right-4 z-20 w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-amber-500 hover:rotate-180 transition-all duration-500 shadow-xl opacity-0 group-hover:opacity-100"
              title="Refresh Energy"
            >
              ✨
            </button>
            
            {error ? (
              <div className="w-full glass rounded-3xl p-12 text-center text-slate-600 border-red-100 bg-red-50/30">
                <p className="text-lg font-medium">{error}</p>
                <button 
                  onClick={handleRefresh}
                  className="mt-4 px-6 py-2 bg-slate-900 text-white rounded-full font-bold hover:bg-amber-500 transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : (
              motivation && <MotivationDisplay data={motivation} loading={loading} />
            )}
          </div>
        </div>

        {/* Instruments Section */}
        <InstrumentSection />

        {/* Daily Intention Button (Sticky Desktop / Bottom Mobile) */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
          <button 
            onClick={handleRefresh}
            className="px-8 py-4 bg-slate-900 text-white rounded-full font-bold shadow-2xl shadow-slate-400 hover:bg-amber-500 hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
          >
            <span>New Daily Intention</span>
            <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">SPACE</span>
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default App;
