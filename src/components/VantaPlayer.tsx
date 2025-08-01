import { useState } from "react";
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  Shuffle, 
  Repeat,
  Heart,
  Maximize2,
  MoreHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

export function VantaPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([75]);
  const [progress, setProgress] = useState([30]);
  const [isLiked, setIsLiked] = useState(false);

  // Mock current track data
  const currentTrack = {
    title: "Neon Dreams",
    artist: "Project EP 2025",
    album: "Dark Synthwave",
    coverUrl: "/lovable-uploads/c6d15258-2b98-4625-9216-0e8684fc39c0.png",
    duration: "3:24",
    currentTime: "1:12"
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-vanta-black border-t border-border h-20 flex items-center px-4 z-50">
      {/* Track Info */}
      <div className="flex items-center gap-3 w-80">
        <div className="w-12 h-12 rounded bg-vanta-grey flex items-center justify-center">
          <img 
            src={currentTrack.coverUrl} 
            alt={currentTrack.title}
            className="w-full h-full rounded object-cover"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-vanta-white text-sm font-medium truncate">
            {currentTrack.title}
          </p>
          <p className="text-vanta-grey text-xs truncate">
            {currentTrack.artist}
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsLiked(!isLiked)}
          className={`p-1 ${isLiked ? 'text-red-500' : 'text-vanta-grey hover:text-vanta-white'}`}
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
        </Button>
      </div>

      {/* Player Controls */}
      <div className="flex-1 flex flex-col items-center gap-2 max-w-md mx-auto">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-vanta-grey hover:text-vanta-white">
            <Shuffle className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-vanta-grey hover:text-vanta-white">
            <SkipBack className="w-5 h-5" />
          </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 rounded-full bg-vanta-white text-vanta-black hover:bg-vanta-grey hover:text-vanta-white transition-all duration-300 hover:scale-110 shadow-lg"
            >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          <Button variant="ghost" size="sm" className="text-vanta-grey hover:text-vanta-white">
            <SkipForward className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="sm" className="text-vanta-grey hover:text-vanta-white">
            <Repeat className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Progress Bar */}
        <div className="flex items-center gap-2 w-full">
          <span className="text-xs text-vanta-grey">{currentTrack.currentTime}</span>
          <Slider
            value={progress}
            onValueChange={setProgress}
            max={100}
            step={1}
            className="flex-1"
          />
          <span className="text-xs text-vanta-grey">{currentTrack.duration}</span>
        </div>
      </div>

      {/* Volume and Options */}
      <div className="flex items-center gap-2 w-80 justify-end">
        <Button variant="ghost" size="sm" className="text-vanta-grey hover:text-vanta-white">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" className="text-vanta-grey hover:text-vanta-white">
          <Maximize2 className="w-4 h-4" />
        </Button>
        <div className="flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-vanta-grey" />
          <Slider
            value={volume}
            onValueChange={setVolume}
            max={100}
            step={1}
            className="w-24"
          />
        </div>
      </div>
    </div>
  );
}