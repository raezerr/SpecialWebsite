import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

interface MusicPlayerProps {
  audioUrl?: string;
}

export function MusicPlayer({ audioUrl }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => {
          // Auto-play might be blocked, user needs to interact
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // If no audio URL is provided, don't render the player
  if (!audioUrl) return null;

  return (
    <>
      <audio ref={audioRef} src={audioUrl} loop />

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-6 right-6 z-50"
        onHoverStart={() => setIsExpanded(true)}
        onHoverEnd={() => setIsExpanded(false)}
      >
        <motion.div
          animate={{
            width: isExpanded ? 240 : 64,
          }}
          className="bg-gradient-to-r from-[#C8A2C8] to-[#B89CC8] rounded-full shadow-2xl backdrop-blur-sm border-2 border-white/20 overflow-hidden"
        >
          <div className="flex items-center gap-3 p-3">
            {/* Play/Pause button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={togglePlay}
              className="flex-shrink-0 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-white" />
              ) : (
                <Play className="w-5 h-5 fill-white ml-0.5" />
              )}
            </motion.button>

            {/* Expanded content */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="flex items-center gap-3 overflow-hidden"
                >
                  {/* Song info */}
                  <div className="flex-1 min-w-0 text-white">
                    <div className="text-xs font-medium truncate">Common Burn - Mazzy Star</div>
                    <div className="text-xs opacity-80 truncate">Playing...</div>
                  </div>

                  {/* Mute button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleMute}
                    className="flex-shrink-0 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                  >
                    {isMuted ? (
                      <VolumeX className="w-4 h-4" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Playing indicator */}
          {isPlaying && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 overflow-hidden">
              <motion.div
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="h-full w-1/3 bg-white/60"
              />
            </div>
          )}
        </motion.div>

        {/* Pulsing ring when playing */}
        {isPlaying && (
          <motion.div
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="absolute inset-0 rounded-full border-2 border-[#C8A2C8] -z-10"
          />
        )}
      </motion.div>
    </>
  );
}
