import React from 'react';
import { useStore } from '@nanostores/react';
import { currentTrack, isPlaying, playTrack } from '../stores/audioStore';
import { Play, Pause } from 'lucide-react';

export default function PlayButton({ track }) {
  const activeTrack = useStore(currentTrack);
  const activePlaying = useStore(isPlaying);

  const isThisTrack = activeTrack?.src === track.src;
  const currentlyPlaying = isThisTrack && activePlaying;

  return (
    <button
      onClick={() => playTrack(track)}
      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm transition transform hover:scale-102 active:scale-98 ${
        currentlyPlaying
          ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/25'
          : 'bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700'
      }`}
    >
      {currentlyPlaying ? (
        <>
          <Pause size={18} fill="currentColor" />
          <span>Pause Track</span>
        </>
      ) : (
        <>
          <Play size={18} fill="currentColor" className="ml-0.5" />
          <span>Play Audio</span>
        </>
      )}
    </button>
  );
}