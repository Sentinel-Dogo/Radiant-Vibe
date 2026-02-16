
import React from 'react';
import { Topic } from '../types';
import { TOPICS } from '../constants';

interface TopicSelectorProps {
  activeTopic: Topic;
  onSelect: (topic: Topic) => void;
}

export const TopicSelector: React.FC<TopicSelectorProps> = ({ activeTopic, onSelect }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 md:gap-3">
      {TOPICS.map((topic) => (
        <button
          key={topic}
          onClick={() => onSelect(topic)}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
            activeTopic === topic
              ? 'bg-amber-400 text-white shadow-lg shadow-amber-200 scale-105'
              : 'glass text-slate-600 hover:bg-white hover:shadow-md'
          }`}
        >
          {topic}
        </button>
      ))}
    </div>
  );
};
