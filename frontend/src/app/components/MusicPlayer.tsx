"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemaeContext";

// Royalty-free ambient/lofi track (CC0 from pixabay CDN)
const MUSIC_URL = "/aa23.mp3";

const BAR_COUNT = 5;

export default function MusicPlayer() {
  const { isDarkMode } = useTheme();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false); // triggered by scroll
  const [isMuted, setIsMuted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [volume, setVolume] = useState(0.35);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const scrollTriggeredRef = useRef(false);

  // Initialise audio element once
  useEffect(() => {
    const audio = new Audio(MUSIC_URL);
    audio.loop = true;
    audio.volume = volume;
    audio.preload = "auto";
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync volume / mute
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  const startPlayback = useCallback(async () => {
    if (!audioRef.current || hasStarted) return;
    try {
      await audioRef.current.play();
      setIsPlaying(true);
      setHasStarted(true);
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 3000);
    } catch {
      // autoplay blocked — user will click the button
    }
  }, [hasStarted]);

  // Trigger on scroll past ~30 vh
  useEffect(() => {
    const handleScroll = () => {
      if (scrollTriggeredRef.current) return;
      const threshold = window.innerHeight * 0.3;
      if (window.scrollY > threshold) {
        scrollTriggeredRef.current = true;
        startPlayback();
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [startPlayback]);

  const togglePlay = async () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
        if (!hasStarted) setHasStarted(true);
      } catch {
        /* ignore */
      }
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted((m) => !m);
  };

  // ── Styles ──────────────────────────────────────────────────────────────────
  const glass = isDarkMode
    ? "bg-gray-950/70 border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
    : "bg-white/70 border-gray-200/60 shadow-[0_8px_32px_rgba(0,0,0,0.12)]";

  const accent = isDarkMode ? "#22d3ee" : "#0891b2"; // cyan-400 / cyan-600

  return (
    <div className="fixed bottom-32 right-5 z-[200] md:bottom-8 md:right-6 flex flex-col items-end gap-2">
      {/* ── Tooltip ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className={`backdrop-blur-xl border rounded-xl px-4 py-2 text-xs font-black tracking-widest uppercase whitespace-nowrap ${glass} ${isDarkMode ? "text-cyan-400" : "text-cyan-600"
              }`}
          >
            🎵 Ambient music on
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Volume Slider ───────────────────────────────────────────── */}
      <AnimatePresence>
        {showVolumeSlider && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 8 }}
            className={`backdrop-blur-xl border rounded-2xl px-4 py-3 ${glass} flex flex-col items-center gap-2`}
          >
            <span
              className="text-[9px] font-black tracking-widest uppercase"
              style={{ color: accent }}
            >
              Volume
            </span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                const v = parseFloat(e.target.value);
                setVolume(v);
                if (v > 0 && isMuted) setIsMuted(false);
                if (v === 0) setIsMuted(true);
              }}
              className="w-24 accent-cyan-400 cursor-pointer"
              style={{ accentColor: accent }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main Button ─────────────────────────────────────────────── */}
      <div className="flex items-center gap-2">
        {/* Mute toggle */}
        <AnimatePresence>
          {hasStarted && (
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onClick={toggleMute}
              title={isMuted ? "Unmute" : "Mute"}
              className={`w-9 h-9 rounded-full backdrop-blur-xl border flex items-center justify-center transition-all duration-300 ${glass}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
            >
              {isMuted ? (
                <MutedIcon color={accent} />
              ) : (
                <VolumeIcon color={accent} />
              )}
            </motion.button>
          )}
        </AnimatePresence>

        {/* Main play/stop + equalizer */}
        <motion.button
          onClick={togglePlay}
          onContextMenu={(e) => {
            e.preventDefault();
            setShowVolumeSlider((v) => !v);
          }}
          title={`${isPlaying ? "Pause" : "Play"} ambient music (right-click for volume)`}
          className={`relative w-12 h-12 rounded-full backdrop-blur-xl border flex items-center justify-center transition-all duration-300 overflow-hidden ${glass}`}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.93 }}
          animate={
            isPlaying && !isMuted
              ? {
                boxShadow: [
                  `0 0 0px ${accent}40`,
                  `0 0 16px ${accent}60`,
                  `0 0 0px ${accent}40`,
                ],
              }
              : {}
          }
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Pulsing ring when playing */}
          {isPlaying && !isMuted && (
            <motion.span
              className="absolute inset-0 rounded-full"
              style={{ border: `1.5px solid ${accent}` }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}

          {/* Equalizer bars or pause icon */}
          {isPlaying && !isMuted ? (
            <Equalizer color={accent} />
          ) : (
            <NoteIcon color={accent} paused={!isPlaying} />
          )}
        </motion.button>
      </div>
    </div>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────────

// Animated equalizer bars
function Equalizer({ color }: { color: string }) {
  const heights = [12, 18, 10, 20, 14];
  return (
    <div className="flex items-end gap-[2.5px] h-5">
      {heights.map((h, i) => (
        <motion.span
          key={i}
          className="w-[3px] rounded-full"
          style={{ backgroundColor: color, height: h }}
          animate={{ height: [h * 0.4, h, h * 0.6, h * 0.8, h * 0.3, h] }}
          transition={{
            duration: 0.8 + i * 0.12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  );
}

// Music note SVG
function NoteIcon({ color, paused }: { color: string; paused: boolean }) {
  if (paused) {
    // Play icon
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill={color}>
        <path d="M8 5v14l11-7z" />
      </svg>
    );
  }
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  );
}

// Volume icon
function VolumeIcon({ color }: { color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    </svg>
  );
}

// Muted icon
function MutedIcon({ color }: { color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  );
}
