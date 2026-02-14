import { motion } from "motion/react";
import { Play } from "lucide-react";

interface LandingPageProps {
  onEnter: () => void;
  petName?: string;
}

export function LandingPage({ onEnter, petName = "Mints" }: LandingPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FAF8F5] via-[#F5F0F8] to-[#E8DFF0] relative overflow-hidden">
      {/* Subtle floating hearts background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-[#C8A2C8] opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${20 + Math.random() * 40}px`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            ♥
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-12 px-4">
        {/* Animated Vinyl Record */}
        <motion.div
          initial={{ scale: 0, rotate: 0 }}
          animate={{ scale: 1, rotate: 360 }}
          transition={{
            scale: { duration: 0.8, ease: "backOut" },
            rotate: { duration: 1.2, ease: "easeOut" },
          }}
          className="relative"
        >
          {/* Vinyl record */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
            className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-[#2a2a2a] via-[#1a1a1a] to-[#000000] shadow-2xl relative"
          >
            {/* Vinyl grooves */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute inset-0 rounded-full border border-[#333]/30"
                style={{
                  margin: `${8 + i * 6}px`,
                }}
              />
            ))}
            
            {/* Center label */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-[#C8A2C8] to-[#9B7FA8] shadow-xl flex items-center justify-center border-4 border-[#2a2a2a]">
                <div className="w-8 h-8 rounded-full bg-[#1a1a1a] shadow-inner" />
              </div>
            </div>
          </motion.div>

          {/* Vinyl sleeve peek */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 20, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute -right-8 top-1/2 -translate-y-1/2 w-56 h-56 md:w-72 md:h-72 bg-gradient-to-br from-[#C8A2C8] to-[#B89CC8] rounded-lg shadow-2xl -z-10 flex items-center justify-center"
          >
            <div className="text-white/20 text-6xl">♥</div>
          </motion.div>
        </motion.div>

        {/* Text content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl md:text-6xl font-serif text-[#6B5576]">
            {petName}
          </h1>
          <p className="text-lg md:text-xl text-[#9B7FA8]/80 max-w-md">
            If it isn't too late to be mine
          </p>
        </motion.div>

        {/* Press Play button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onEnter}
          className="group relative px-10 py-5 bg-gradient-to-r from-[#C8A2C8] to-[#B89CC8] text-white rounded-full shadow-2xl hover:shadow-[#C8A2C8]/50 transition-all duration-300"
        >
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            >
              <Play className="w-6 h-6 fill-white" />
            </motion.div>
            <span className="text-xl font-medium tracking-wide">Press Play</span>
          </div>
          
          {/* Needle animation on hover */}
          <motion.div
            className="absolute -top-3 right-12 w-1 h-12 bg-[#6B5576] origin-bottom rotate-45 opacity-0 group-hover:opacity-100 transition-opacity"
            style={{
              boxShadow: "0 0 10px rgba(107, 85, 118, 0.5)",
            }}
          />
        </motion.button>
      </div>
    </div>
  );
}
