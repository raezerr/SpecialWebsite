import { motion, AnimatePresence } from "motion/react";
import { X, Heart } from "lucide-react";
import { Track } from "./vinyl-player";

interface LoveLetterProps {
  track: Track | null;
  onClose: () => void;
  isLastTrack: boolean;
}

export function LoveLetter({ track, onClose, isLastTrack }: LoveLetterProps) {
  if (!track) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative w-full max-w-lg my-8"
        >
          {/* Close button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="absolute -top-3 -right-3 z-10 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center text-[#6B5576] hover:bg-[#C8A2C8] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </motion.button>

          {/* Letter content */}
          <div className="bg-gradient-to-br from-[#FFF9F5] to-[#FFF5F9] rounded-2xl shadow-2xl p-6 md:p-8 border-2 border-[#C8A2C8]/20">
            {/* Decorative header */}
            <div className="flex items-center justify-center mb-4">
              {isLastTrack ? (
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                >
                  <Heart className="w-8 h-8 text-[#C8A2C8] fill-[#C8A2C8]" />
                </motion.div>
              ) : (
                <div className="flex gap-2 items-center">
                  <div className="w-8 h-px bg-gradient-to-r from-transparent via-[#C8A2C8] to-transparent" />
                  <Heart className="w-4 h-4 text-[#C8A2C8] fill-[#C8A2C8]" />
                  <div className="w-8 h-px bg-gradient-to-r from-transparent via-[#C8A2C8] to-transparent" />
                </div>
              )}
            </div>

            {/* Track info */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center mb-5"
            >
              <div className="text-xs text-[#9B7FA8] mb-1">Track {track.id}</div>
              <h3 className="text-xl md:text-2xl font-serif text-[#6B5576] mb-1">
                {track.letter.heading}
              </h3>
              <div className="text-xs text-[#9B7FA8] italic">{track.subtitle}</div>
            </motion.div>

            {/* Photo placeholder */}
            {track.letter.photoUrl && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-5 rounded-lg overflow-hidden shadow-md"
              >
                <img
                  src={track.letter.photoUrl}
                  alt="Memory"
                  className="w-full h-40 object-cover"
                />
              </motion.div>
            )}

            {/* Letter message */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-5"
            >
              <p className="text-[#6B5576] leading-relaxed whitespace-pre-line text-sm md:text-base text-center">
                {track.letter.message}
              </p>
            </motion.div>

            {/* Special finale animation */}
            {isLastTrack && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-6 pt-6 border-t border-[#C8A2C8]/30 text-center"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.03, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                  className="text-2xl md:text-3xl font-serif text-[#C8A2C8] mb-3"
                >
                 
                </motion.div>
                
                {/* Floating hearts */}
                <div className="relative h-16 overflow-hidden">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ y: 60, x: 0, opacity: 0 }}
                      animate={{
                        y: -80,
                        x: [0, 15, -15, 0],
                        opacity: [0, 1, 1, 0],
                      }}
                      transition={{
                        duration: 4,
                        delay: i * 0.4,
                        repeat: Infinity,
                      }}
                      className="absolute left-1/2 -translate-x-1/2 text-xl"
                      style={{ left: `${35 + i * 10}%` }}
                    >
                      ♥
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Decorative footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-5 flex items-center justify-center gap-2"
            >
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#C8A2C8]/50" />
              <div className="text-xs text-[#9B7FA8]"></div>
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#C8A2C8]/50" />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
