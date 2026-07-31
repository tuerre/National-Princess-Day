'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface PlaylistProps {
  onContinue?: () => void;
}

interface Track {
  id: number;
  title: string;
  description: string;
  image: string;
  spotifyUrl: string;
}

const tracks: Track[] = [
  {
    id: 1,
    title: 'Corazón de melón — Los Panchos',
    description:
      'Dulce y clásica, como ese amor tierno que me recuerda a ti, mi shell. 💖',
    image: '/assets/music1.png',
    spotifyUrl:
      'https://open.spotify.com/track/7HSYmqzZHulD6UnvPHDJEt?si=RxQtJ8GGSoitTkcCeHMuRQ&utm_source=copy-link',
  },
  {
    id: 2,
    title: 'Gongoli — Álvaro Díaz',
    description:
      'Con vibra moderna y atrevida, igual de única y especial como tú. ✨',
    image: '/assets/music2.png',
    spotifyUrl:
      'https://open.spotify.com/track/1tqqMC9aITEAnp0MjWvVky?si=nNRqOiKxQyK_mYcyltZklA&utm_source=copy-link',
  },
  {
    id: 3,
    title: 'Con los dos en la cabeza — Pedro Guerra, Cruzzi',
    description:
      'Una canción que habla de llevar a alguien en la mente y el corazón, siempre. 🌙',
    image: '/assets/music3.png',
    spotifyUrl:
      'https://open.spotify.com/track/26LELuiC7gAN0IjILbam2I?si=gstYCagyRQq7mLfbIgkIMA&utm_source=copy-link',
  },
];

export default function Playlist({ onContinue }: PlaylistProps) {
  const [selectedTrack, setSelectedTrack] = useState<number | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollButtons);
      return () => container.removeEventListener('scroll', checkScrollButtons);
    }
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const handleTrackClick = (track: Track) => {
    setSelectedTrack(track.id);
    window.open(track.spotifyUrl, '_blank', 'noopener,noreferrer');
  };

  const selectedTrackData = selectedTrack
    ? tracks.find((track) => track.id === selectedTrack)
    : null;

  return (
    <div className="page-container font-display relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-6">
      <svg
        className="absolute top-16 left-8 w-10 h-10 animate-float-slow"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M12 2l2.39 4.84L19 8.1l-3.5 3.41.82 5.04L12 15.77 7.68 16.55l.82-5.04L5 8.1l4.61-1.26L12 2z"
          fill="#FFF7A1"
        />
      </svg>

      <svg
        className="absolute right-10 top-20 w-12 h-12 opacity-80 animate-float"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M20 17.58A4.42 4.42 0 0115.58 22H7.42A4.42 4.42 0 013 17.58 4.5 4.5 0 017.5 13H8a5 5 0 019.9-1.2A3.5 3.5 0 0120 17.58z"
          fill="#B0E0E6"
        />
      </svg>

      <svg
        className="absolute left-16 bottom-32 w-8 h-8 animate-float-slow"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M12 21s-6-4.35-8.5-6.5C1.85 12.73 3 9 6 8c2.28-.75 3.5 1 6 1s3.72-1.75 6-1c3 1 4.15 4.73 2.5 6.5C18 16.65 12 21 12 21z"
          fill="#FFD1DC"
        />
      </svg>

      <div className="w-full max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="text-center">
            <h2 className="text-[#f04299] text-lg font-bold leading-tight">
              Tres canciones para ti
            </h2>
            <div className="text-xs text-[#9a4c73]">
              Toca una tarjeta y se abrirá su enlace en Spotify
            </div>
          </div>
        </div>

        <div className="bg-[#FFF8E7] rounded-2xl p-4 sm:p-5 md:p-6 border border-pink-200 shadow-md animate-fadeIn mx-auto">
          <div className="mb-6 h-20 flex items-center justify-center">
            <div className="text-base text-[#9a4c73] font-medium text-center max-w-lg">
              {selectedTrackData
                ? `Abriendo: ${selectedTrackData.title}`
                : 'Elige una canción para abrirla en una pestaña nueva ✨'}
            </div>
          </div>

          <div className="mb-8">
            <div className="relative max-w-4xl mx-auto">
              <button
                onClick={scrollLeft}
                disabled={!canScrollLeft}
                className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-pink-200 flex items-center justify-center transition-all focus:outline-none focus:ring-4 focus:ring-pink-300 ${
                  canScrollLeft
                    ? 'text-[#f04299] hover:bg-pink-50 cursor-pointer'
                    : 'text-gray-300 cursor-not-allowed'
                }`}
                aria-label="Desplazar a la izquierda"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M15 18l-6-6 6-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <button
                onClick={scrollRight}
                disabled={!canScrollRight}
                className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-pink-200 flex items-center justify-center transition-all focus:outline-none focus:ring-4 focus:ring-pink-300 ${
                  canScrollRight
                    ? 'text-[#f04299] hover:bg-pink-50 cursor-pointer'
                    : 'text-gray-300 cursor-not-allowed'
                }`}
                aria-label="Desplazar a la derecha"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 18l6-6-6-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <div
                ref={scrollContainerRef}
                className="flex gap-4 overflow-x-auto scrollbar-hide px-14 py-2 justify-start"
                style={{ scrollbarWidth: 'none' }}
              >
                {tracks.map((track) => (
                  <div
                    key={track.id}
                    className={`group relative cursor-pointer transform transition-all duration-300 flex-shrink-0 w-56 h-full hover:scale-105 hover:z-10 ${
                      selectedTrack === track.id
                        ? 'ring-2 ring-[#f04299] ring-offset-2 rounded-xl'
                        : ''
                    }`}
                    onClick={() => handleTrackClick(track)}
                  >
                    <div className="relative bg-white rounded-xl p-4 border-2 shadow-lg transition-all border-pink-100 hover:border-pink-200 hover:shadow-xl group-hover:shadow-pink-200/30 h-full flex flex-col">
                      <div className="relative mb-3">
                        <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-pink-200 via-purple-200 to-pink-300 shadow-md">
                          <Image
                            src={track.image}
                            alt={track.title}
                            fill
                            className="object-cover"
                            sizes="224px"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                          <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-30 pointer-events-none">
                            🎵
                          </div>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center transition-opacity opacity-0 group-hover:opacity-100">
                          <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                              <path
                                d="M12 2L2 7l10 5 10-5-10-5Zm0 9L2 6v11l10 5 10-5V6l-10 5Z"
                                fill="#f04299"
                              />
                            </svg>
                          </div>
                        </div>
                        {selectedTrack === track.id && (
                          <div className="absolute top-2 right-2 w-3 h-3 bg-[#f04299] rounded-full animate-pulse"></div>
                        )}
                      </div>
                      <div className="text-center flex-1 flex flex-col justify-center">
                        <div className="font-bold text-[#1b0d14] mb-1 text-sm min-h-[1.25rem]">
                          {track.title}
                        </div>
                        <div className="text-xs text-[#9a4c73] leading-relaxed min-h-[3.25rem] flex items-center justify-center">
                          {track.description}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {onContinue && (
          <div className="text-center mt-8 sm:mt-10">
            <button
              onClick={onContinue}
              className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-[#f04299] text-white font-semibold shadow-md transition-all transform hover:scale-105 active:scale-95 hover:shadow-pink-300/50 focus:outline-none focus:ring-4 focus:ring-pink-300 cursor-pointer"
              aria-label="Continuar al siguiente"
            >
              Continuar al siguiente ✨
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
