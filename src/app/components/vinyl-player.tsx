import { motion } from "motion/react";
import { Lock } from "lucide-react";

export interface Track {
  id: number;
  title: string;
  subtitle: string;
  letter: {
    heading: string;
    message: string;
    photoUrl?: string;
  };
  isUnlocked: boolean;
}

interface VinylPlayerProps {
  tracks: Track[];
  onTrackSelect: (trackId: number) => void;
  currentTrack: number | null;
}

export function VinylPlayer({ tracks, onTrackSelect, currentTrack }: VinylPlayerProps) {
  const isPlaying = currentTrack !== null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF8F5] via-[#F5F0F8] to-[#E8DFF0] py-8 px-4 md:py-16">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-serif text-[#6B5576] mb-2">
            You've got mail
          </h2>
          <p className="text-[#9B7FA8]/70">
            Select each track to reveal the memory
          </p>
        </motion.div>

        {/* Vinyl player and tracklist */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-16 justify-center">
          {/* Spinning Vinyl */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative flex-shrink-0"
          >
            <motion.div
              animate={{
                rotate: isPlaying ? 360 : 0,
              }}
              transition={{
                rotate: {
                  duration: isPlaying ? 4 : 0,
                  repeat: isPlaying ? Infinity : 0,
                  ease: "linear",
                },
              }}
              className="w-72 h-72 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-[#2a2a2a] via-[#1a1a1a] to-[#000000] shadow-2xl relative"
            >
              {/* Vinyl grooves */}
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute inset-0 rounded-full border border-[#333]/30"
                  style={{
                    margin: `${8 + i * 8}px`,
                  }}
                />
              ))}
              
              {/* Center label */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-[#C8A2C8] to-[#9B7FA8] shadow-xl flex flex-col items-center justify-center border-4 border-[#2a2a2a] p-4">
                  <div className="text-white text-center">
                    <div className="text-xl md:text-2xl font-serif"></div>
                  </div>
                  <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#1a1a1a] shadow-inner mt-2" />
                </div>
              </div>
            </motion.div>

            {/* Tonearm when playing */}
            {isPlaying && (
              <motion.div
                initial={{ rotate: -45, x: 20 }}
                animate={{ rotate: -10, x: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute top-4 right-4 w-2 h-32 bg-gradient-to-b from-[#6B5576] to-[#9B7FA8] origin-top rounded-full shadow-lg"
                style={{
                  transformOrigin: "top center",
                }}
              >
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#6B5576] rounded-full shadow-lg" />
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#C8A2C8] rounded-full shadow-lg" />
              </motion.div>
            )}
          </motion.div>

          {/* Tracklist */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="w-full max-w-md"
          >
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 border border-[#C8A2C8]/20">
              <h3 className="text-xl md:text-2xl font-serif text-[#6B5576] mb-6">
                Tracklist
              </h3>
              
              <div className="space-y-3">
                {tracks.map((track, index) => (
                  <motion.button
                    key={track.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: track.isUnlocked ? 1 : 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => !track.isUnlocked && onTrackSelect(track.id)}
                    disabled={track.isUnlocked}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-300 relative overflow-hidden ${
                      track.isUnlocked
                        ? "bg-[#C8A2C8]/20 border-2 border-[#C8A2C8]/40"
                        : "bg-white/80 hover:bg-white border-2 border-transparent hover:border-[#C8A2C8]/30 cursor-pointer"
                    } ${currentTrack === track.id ? "ring-2 ring-[#C8A2C8]" : ""}`}
                  >
                    {/* Scratch overlay for locked tracks */}
                    {!track.isUnlocked && (
                      <div className="absolute inset-0 bg-gradient-to-br from-[#D4BFD4] to-[#C8A2C8] opacity-40 pointer-events-none" />
                    )}

                    <div className="flex items-center gap-4 relative z-10">
                      <div
                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                          track.isUnlocked
                            ? "bg-[#C8A2C8] text-white"
                            : "bg-[#6B5576] text-white"
                        }`}
                      >
                        {track.isUnlocked ? (
                          <span className="text-sm">✓</span>
                        ) : (
                          <Lock className="w-4 h-4" />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs text-[#9B7FA8] font-medium">
                            Track {track.id}
                          </span>
                          {index === tracks.length - 1 && (
                            <span className="text-xs bg-[#C8A2C8] text-white px-2 py-0.5 rounded-full">
                              ✨ Special
                            </span>
                          )}
                        </div>
                        <div className="font-medium text-[#6B5576] truncate">
                          {track.title}
                        </div>
                        <div className="text-sm text-[#9B7FA8]/70 truncate">
                          {track.subtitle}
                        </div>
                      </div>
                    </div>

                    {!track.isUnlocked && (
                      <motion.div
                        className="absolute bottom-2 right-2 text-xs text-[#6B5576]/60"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        Tap to view
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Progress indicator */}
              <div className="mt-6 pt-6 border-t border-[#C8A2C8]/20">
                <div className="flex items-center justify-between text-sm text-[#9B7FA8]">
                  <span>Progress</span>
                  <span className="font-medium">
                    {tracks.filter((t) => t.isUnlocked).length} / {tracks.length}
                  </span>
                </div>
                <div className="mt-2 h-2 bg-[#C8A2C8]/20 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${(tracks.filter((t) => t.isUnlocked).length / tracks.length) * 100}%`,
                    }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-[#C8A2C8] to-[#9B7FA8] rounded-full"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
