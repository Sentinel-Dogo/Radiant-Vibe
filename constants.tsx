
import { Topic, Instrument, MusicTrack } from './types';

export const TOPICS = Object.values(Topic);

export const INSTRUMENTS: Instrument[] = [
  {
    id: 'harp',
    name: 'Celestial Harp',
    description: 'Ethereal strings that resonate with the heart, bringing immediate serenity.',
    icon: '✨',
    vibe: 'Pure Peace'
  },
  {
    id: 'handpan',
    name: 'Earth Handpan',
    description: 'Deep, melodic rhythms that ground your spirit and focus your energy.',
    icon: '🥁',
    vibe: 'Grounded Focus'
  },
  {
    id: 'kalimba',
    name: 'Sun Kalimba',
    description: 'Playful, bright notes like raindrops on a sunny window, sparking joy.',
    icon: '🎹',
    vibe: 'Instant Joy'
  },
  {
    id: 'flute',
    name: 'Wood Flute',
    description: 'A breath of fresh air that clears the mind and opens the soul.',
    icon: '🌬️',
    vibe: 'Mental Clarity'
  }
];

export const MUSIC_TRACKS: MusicTrack[] = [
  {
    id: 'zen',
    name: 'Zen Garden',
    url: 'https://assets.mixkit.co/music/preview/mixkit-zen-meditation-atmosphere-601.mp3',
    icon: '🧘'
  },
  {
    id: 'nature',
    name: 'Morning Forest',
    url: 'https://assets.mixkit.co/music/preview/mixkit-forest-walk-71.mp3',
    icon: '🌲'
  },
  {
    id: 'ethereal',
    name: 'Cosmic Drift',
    url: 'https://assets.mixkit.co/music/preview/mixkit-ethereal-dreamy-ambient-701.mp3',
    icon: '🌌'
  }
];
