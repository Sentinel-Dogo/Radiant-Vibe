
import React, { useState, useRef, useEffect } from 'react';
import { MUSIC_TRACKS } from '../constants';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = MUSIC_TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3; // Low background volume
    }
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % MUSIC_TRACKS.length);
    // Auto play next track if it was already playing
    if (isPlaying) {
      setTimeout(() => audioRef.current?.play(), 100);
    }
  };

  return (
    <div className="fixed top-6 right-6 z-[60] flex items-center gap-3 glass p-2 rounded-full pr-6 shadow-xl transition-all hover:pr-8 group">
      <audio 
        ref={audioRef} 
        src={currentTrack.url} 
        loop 
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      
      <button 
        onClick={togglePlay}
        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
          isPlaying ? 'bg-amber-500 text-white animate-pulse' : 'bg-slate-800 text-white'
        }`}
      >
        {isPlaying ? '⏸' : '▶'}
      </button>

      <div className="flex flex-col">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Ambient Vibe</span>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-slate-700 whitespace-nowrap">
            {currentTrack.icon} {currentTrack.name}
          </span>
          <button 
            onClick={nextTrack}
            className="text-xs text-slate-400 hover:text-amber-500 transition-colors"
          >
            ⏭
          </button>
        </div>
      </div>
    </div>
  );
};
