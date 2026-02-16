
export enum Topic {
  CAREER = 'Career & Purpose',
  HEALTH = 'Body & Energy',
  RELATIONSHIPS = 'Love & Connection',
  GROWTH = 'Personal Growth',
  CREATIVITY = 'Creative Spark',
  PEACE = 'Inner Peace'
}

export interface MotivationData {
  quote: string;
  author: string;
  pepTalk: string;
  challenge: string;
  affirmation: string;
}

export interface Instrument {
  id: string;
  name: string;
  description: string;
  icon: string;
  vibe: string;
}

export interface MusicTrack {
  id: string;
  name: string;
  url: string;
  icon: string;
}
