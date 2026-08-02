import { atom } from 'nanostores';

export interface Track {
  title: string;
  artist: string;
  src: string;
  cover: string;
}

export const currentTrack = atom<Track | null>(null);
export const isPlaying = atom<boolean>(false);

export function playTrack(track: Track) {
  const active = currentTrack.get();
  if (active?.src === track.src) {
    isPlaying.set(!isPlaying.get());
  } else {
    currentTrack.set(track);
    isPlaying.set(true);
  }
}