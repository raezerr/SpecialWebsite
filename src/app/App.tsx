import { useState } from "react";
import { LandingPage } from "./components/landing-page";
import { VinylPlayer, Track } from "./components/vinyl-player";
import { LoveLetter } from "./components/love-letter";
import { MusicPlayer } from "./components/music-player";

// Sample tracks - customize these with your own messages!
const INITIAL_TRACKS: Track[] = [
  {
    id: 1,
    title: "A Burning Image",
    subtitle: "",
    isUnlocked: false,
    letter: {
      heading: "A Burning Image",
      message: `There are some people you do not stop seeing, even in their absence. They remain impressed upon you. 'Don't regret. Remember.' And I will, not because I try to hold on, but because something in me was permanently rearranged by knowing you existed. Some pieces of you are not only meant to be kept, but carried.`,
      photoUrl: "src/resources/img1.jpg",
    },
  },
  {
    id: 2,
    title: "The Hour That Belongs Only to You",
    subtitle: "",
    isUnlocked: false,
    letter: {
      heading: "The Hour That Belongs Only to You",
      message: `If I listen closely enough, I can almost hear the hour that belongs to you. It arrives differently than the others, softer, more golden, as if the world itself lowers its voice out of respect. Before you, time was something that simply passed. Now it waits. Now it gathers itself around the idea of you. And I understand, at last, why sunsets exist, they were waiting for someone like you to be witnessed beside`,
      photoUrl: "src/resources/img2.jpg",
    },
  },
  {
    id: 3,
    title: "A temporary convergance",
    subtitle: "",
    isUnlocked: false,
    letter: {
      heading: "A temporary convergance",
      message: `The city was stalled in red, endless lines of cars, flickering brake light and sort of droning against the backdrop of traffic. Inside that suspended moment i accidentally catch your frequency. Nothing moved forward. Outside, strangers waited to arrive somewhere else. Inside, I was somewhere else. Somewhere between one second and the next, i existed at the same time as you. And it felt like a secret the night was keeping for itself. Fragile, ephemeral, and illuminated only in passing`,
      photoUrl: "src/resources/img3.png",
    },
  },
];

type AppState = "landing" | "vinyl-player" | "letter";

export default function App() {
  const [appState, setAppState] = useState<AppState>("landing");
  const [tracks, setTracks] = useState<Track[]>(INITIAL_TRACKS);
  const [selectedTrack, setSelectedTrack] = useState<number | null>(null);

  // You can customize these values
  const petName = "A good day for a valentine"; // Change this to her name or pet name
  const audioUrl = "src/resources/track0.mp3"; // Add your audio URL here (optional)

  const handleEnter = () => {
    setAppState("vinyl-player");
  };

  const handleTrackSelect = (trackId: number) => {
    setSelectedTrack(trackId);
    setAppState("letter");
  };

  const handleLetterClose = () => {
    // Mark track as unlocked
    setTracks((prevTracks) =>
      prevTracks.map((track) =>
        track.id === selectedTrack ? { ...track, isUnlocked: true } : track
      )
    );
    setSelectedTrack(null);
    setAppState("vinyl-player");
  };

  const currentTrack = tracks.find((t) => t.id === selectedTrack) || null;
  const isLastTrack = selectedTrack === tracks.length;

  return (
    <div className="min-h-screen">
      {/* Landing Page */}
      {appState === "landing" && (
        <LandingPage onEnter={handleEnter} petName={petName} />
      )}

      {/* Vinyl Player */}
      {appState === "vinyl-player" && (
        <VinylPlayer
          tracks={tracks}
          onTrackSelect={handleTrackSelect}
          currentTrack={tracks.find((t) => t.isUnlocked)?.id || null}
        />
      )}

      {/* Love Letter */}
      {appState === "letter" && currentTrack && (
        <LoveLetter
          track={currentTrack}
          onClose={handleLetterClose}
          isLastTrack={isLastTrack}
        />
      )}

      {/* Music Player (always available after landing) */}
      {appState !== "landing" && <MusicPlayer audioUrl={audioUrl} />}
    </div>
  );
}
