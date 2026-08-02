import React, { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Video from 'yet-another-react-lightbox/plugins/video';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import { Play } from 'lucide-react';

export default function MediaGallery({ items = [] }) {
  const [index, setIndex] = useState(-1);

  if (!items.length) return null;

  const slides = items.map((item) => {
    if (item.type === 'video') {
      return {
        type: 'video',
        title: item.title,
        description: item.alt,
        sources: [{ src: item.src, type: 'video/mp4' }]
      };
    }
    return {
      src: item.src,
      alt: item.alt,
      title: item.title
    };
  });

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 my-6">
        {items.map((item, idx) => (
          <div
            key={idx}
            onClick={() => setIndex(idx)}
            className="group relative aspect-square overflow-hidden rounded-xl bg-zinc-800 cursor-pointer border border-zinc-800/80 hover:border-zinc-700 transition"
          >
            {item.type === 'video' ? (
              <div className="w-full h-full flex items-center justify-center bg-zinc-900 relative">
                <div className="p-3 rounded-full bg-emerald-500/90 text-black group-hover:scale-110 transition shadow-lg">
                  <Play size={24} fill="currentColor" className="ml-0.5" />
                </div>
              </div>
            ) : (
              <img
                src={item.src}
                alt={item.alt || ''}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500 ease-out"
              />
            )}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition duration-300" />
          </div>
        ))}
      </div>

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        plugins={[Video, Captions]}
        slides={slides}
      />
    </div>
  );
}