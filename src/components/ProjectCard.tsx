import { useState } from "react";
import { Play, MoreHorizontal, Music } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
  id: string;
  name: string;
  description: string;
  trackCount: number;
  coverUrl?: string;
  lastModified: string;
  onClick?: () => void;
}

export function ProjectCard({ 
  name, 
  description, 
  trackCount, 
  coverUrl, 
  lastModified,
  onClick 
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className="bg-card border-border hover:bg-secondary/50 transition-all duration-300 cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <CardContent className="p-4">
        {/* Cover Art */}
        <div className="relative mb-4">
          <div className="aspect-square rounded-md bg-muted flex items-center justify-center overflow-hidden">
            {coverUrl ? (
              <img 
                src={coverUrl} 
                alt={name}
                className="w-full h-full object-cover"
              />
            ) : (
              <Music className="w-12 h-12 text-muted-foreground" />
            )}
          </div>
          
          {/* Play Button Overlay */}
          <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 rounded-md ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <Button
              variant="default"
              size="sm"
              className="w-12 h-12 rounded-full bg-vanta-white text-vanta-black hover:bg-vanta-grey hover:text-vanta-white shadow-lg"
            >
              <Play className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Project Info */}
        <div className="space-y-1">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-foreground truncate pr-2">{name}</h3>
            <Button 
              variant="ghost" 
              size="sm"
              className="text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
          
          <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
            <span>{trackCount} track{trackCount !== 1 ? 's' : ''}</span>
            <span>{lastModified}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}