import React, { useRef, useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { currentTrack, isPlaying } from '../stores/audioStore';
import { Play, Pause, Volume2, VolumeX, Music } from 'lucide-react';

export default function SpotifyPlayer() {
  const track = useStore(currentTrack);
  const playing = useStore(isPlaying);
  const audioRef = useRef(null);

  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.play().catch(() => isPlaying.set(false));
    } else {
      audioRef.current.pause();
    }
  }, [playing, track]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleSeek = (e) => {
    const time = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setProgress(time);
    }
  };

  const formatTime = (secs) => {
    if (!secs || isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (!track) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 h-24 bg-zinc-950/95 backdrop-blur-xl border-t border-zinc-800/80 text-white px-4 md:px-8 flex items-center justify-between z-50 shadow-2xl">
      {/* Track Info */}
      <div className="flex items-center gap-3 w-1/3 min-w-[180px]">
        {track.cover ? (
          <img src={track.cover} alt={track.title} className="w-14 h-14 rounded-lg object-cover shadow-md border border-zinc-800" />
        ) : (
          <div className="w-14 h-14 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400">
            <Music size={24} />
          </div>
        )}
        <div className="truncate">
          <p className="font-semibold text-sm truncate text-zinc-100">{track.title}</p>
          <p className="text-xs text-zinc-400 truncate">{track.artist}</p>
        </div>
      </div>

      {/* Controls & Scrubber */}
      <div className="flex flex-col items-center justify-center gap-1.5 w-1/3 max-w-xl">
        <button
          onClick={() => isPlaying.set(!playing)}
          className="p-3 bg-emerald-500 hover:bg-emerald-400 text-black rounded-full transition transform hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/20"
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-0.5" />}
        </button>

        <div className="flex items-center gap-2 w-full text-xs text-zinc-400 font-mono">
          <span>{formatTime(progress)}</span>
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={progress}
            onChange={handleSeek}
            className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500 hover:accent-emerald-400"
          />
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Mute Toggle */}
      <div className="flex items-center justify-end w-1/3 min-w-[100px]">
        <button
          onClick={() => {
            if (audioRef.current) {
              audioRef.current.muted = !isMuted;
              setIsMuted(!isMuted);
            }
          }}
          className="p-2 text-zinc-400 hover:text-white transition"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      </div>

      <audio
        ref={audioRef}
        src={track.src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        onEnded={() => isPlaying.set(false)}
      />
    </div>
  );
}