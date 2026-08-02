import React, { useEffect, useRef, useState } from 'react';

export default function PianoSheet({ fileUrl }) {
  const containerRef = useRef(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let osmdInstance = null;

    async function loadSheet() {
      try {
        const { OpenSheetMusicDisplay } = await import('opensheetmusicdisplay');
        if (!containerRef.current) return;

        containerRef.current.innerHTML = '';
        osmdInstance = new OpenSheetMusicDisplay(containerRef.current, {
          autoResize: true,
          drawTitle: true,
          drawSubtitle: false,
          drawComposer: true,
          drawingParameters: 'compacttight'
        });

        await osmdInstance.load(fileUrl);
        await osmdInstance.render();
        setLoading(false);
      } catch (err) {
        console.error('Sheet music render error:', err);
        setError('Failed to render sheet music file.');
        setLoading(false);
      }
    }

    if (fileUrl) {
      loadSheet();
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [fileUrl]);

  return (
    <div className="my-6 p-4 md:p-6 bg-white text-zinc-900 rounded-2xl shadow-xl border border-zinc-200 overflow-x-auto min-h-[250px] flex items-center justify-center">
      {loading && <p className="text-zinc-500 text-sm font-mono animate-pulse">Loading sheet music...</p>}
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div ref={containerRef} className="w-full" />
    </div>
  );
}