
import React, { useEffect, useRef, useState } from 'react';
import { videoData } from "../data/homepage/homepageData";
import type { VideoText } from "../data/homepage/homepageData";

type Props = {
  className?: string;
  stopAtSec?: number; // default 60
};

export default function VideoSection({ className = '', stopAtSec = 40 }: Props) {
  const wrapperRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [positionClass, setPositionClass] = useState<string>('items-center justify-center text-center');
  const [visibleText, setVisibleText] = useState<VideoText | null>(null);
  const textTimeoutRef = useRef<number | null>(null);
  const hasFinishedTextsRef = useRef(false);
  const lastTimeRef = useRef(0);
  const hasStoppedRef = useRef(false);
  const [showRestart, setShowRestart] = useState(false);

  // inject small keyframes for fadeIn once
  useEffect(() => {
    const styleId = 'video-section-fade-style';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.innerHTML = `
        @keyframes fadeIn {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn { animation: fadeIn 1s ease forwards; }
      `;
      document.head.appendChild(style);
    }
  }, []);

  // helper to clear text timeout
  const clearTextTimer = () => {
    if (textTimeoutRef.current !== null) {
      window.clearTimeout(textTimeoutRef.current);
      textTimeoutRef.current = null;
    }
  };

  const applyPositionClass = (pos: VideoText['position']) => {
    switch (pos) {
      case 'center':
        return 'items-center justify-center text-center';
      case 'left-top':
        return 'items-start justify-start text-left pl-6 pt-6';
      case 'left-bottom':
        return 'items-end justify-start text-left pl-6 pb-6';
      default:
        return 'items-center justify-center text-center';
    }
  };

  const setText = React.useCallback((index: number) => {
    const texts = videoData.texts;
    if (index < 0 || index >= texts.length) return;

    const t = texts[index];
    setPositionClass(applyPositionClass(t.position));
    setVisibleText(t);

    clearTextTimer();

    if (index + 1 < texts.length) {
      // advance after 3.5s
      textTimeoutRef.current = window.setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 3500);
    } else {
      hasFinishedTextsRef.current = true;
      textTimeoutRef.current = window.setTimeout(() => {
        setVisibleText(null);
        // nothing else here; inset blur will be handled via class toggles in render
      }, 3500);
    }
  }, []);

  // watch currentIndex changes to update text
  useEffect(() => {
    if (currentIndex >= 0) setText(currentIndex);
  }, [currentIndex, setText]);

  // Play event handler
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onPlay = () => {
      if (!hasFinishedTextsRef.current) {
        setCurrentIndex(0);
        clearTextTimer();
      }
    };

    video.addEventListener('play', onPlay);
    return () => video.removeEventListener('play', onPlay);
  }, []);

  // timeupdate handler
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => {
      const currentSec = Math.floor(video.currentTime);

      // Replay manual (user rewind)
      if (video.currentTime < lastTimeRef.current && hasFinishedTextsRef.current) {
        clearTextTimer();
        setCurrentIndex(0);
        hasFinishedTextsRef.current = false;
        hasStoppedRef.current = false;
        setShowRestart(false);
      }

      // Stop automatically at configured second
      if (currentSec >= stopAtSec && !hasStoppedRef.current) {
        hasStoppedRef.current = true;
        video.pause();
        setShowRestart(true);
      }

      lastTimeRef.current = video.currentTime;
    };

    video.addEventListener('timeupdate', onTimeUpdate);
    return () => video.removeEventListener('timeupdate', onTimeUpdate);
  }, [stopAtSec]);

  // IntersectionObserver for auto play/pause when scrolled in view
  useEffect(() => {
    const el = wrapperRef.current;
    const video = videoRef.current;
    if (!el || !video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          video.currentTime = 0;
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.6 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // cleanup timeouts on unmount
  useEffect(() => {
    return () => clearTextTimer();
  }, []);

  const handleRestart = () => {
    const video = videoRef.current;
    clearTextTimer();
    setShowRestart(false);
    hasFinishedTextsRef.current = false;
    hasStoppedRef.current = false;
    setCurrentIndex(0);
    if (!video) return;
    video.currentTime = 0;
    video.play().catch(() => {});
  };

  // render text block
  const TextBlock = () => {
    if (!visibleText) return null;
    return (
      <div className={`text-white animate-fadeIn max-w-3xl drop-shadow-md`}>
        <h2 className="text-xl md:text-3xl font-semibold">{visibleText.title}</h2>
        <p className="text-sm md:text-base mt-2 text-gray-200">{visibleText.subtitle}</p>
      </div>
    );
  };

  return (
    <section
      ref={wrapperRef}
      id="video"
      className={` relative w-full h-[220px] md:h-[400px] lg:h-[450px] overflow-hidden my-12 shadow-xl group ${className}`}
    >
      <video
        ref={videoRef}
        id="videoBG"
        src={videoData.src}
        autoPlay
        muted
        loop
        playsInline
        className="absolute w-full h-full object-cover pointer-events-none select-none transition-opacity duration-700"
      >
        <p>Browser kamu tidak mendukung pemutaran video.</p>
      </video>

      <div id="videoInset" className={`absolute inset-0 bg-black/40 backdrop-blur-sm ${visibleText ? '' : 'hidden'}`} />
      <div
        id="videoOverlay"
        className={`absolute inset-0 bg-black/0 transition-all duration-1000 pointer-events-none z-20 ${showRestart ? 'bg-black/100' : ''}`}
      />

      <div id="videoTextContainer" className={`absolute inset-0 flex transition-all duration-700 z-30 ${positionClass}`}>
        <TextBlock />
      </div>

      <button
        id="videoRestartBtn"
        onClick={handleRestart}
        className={`absolute bottom-4 right-4 z-40 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg transition-all ${showRestart ? '' : 'opacity-0 pointer-events-none'}`}
      >
        Putar Ulang
      </button>
    </section>
  );
}
