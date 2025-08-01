import { useState } from "react";
import { Upload, Image, FileMusic, Wand2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

interface CreateProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateProject: (project: ProjectData) => void;
}

interface ProjectData {
  name: string;
  description: string;
  coverUrl?: string;
  tags: string[];
}

const genreTags = [
  "Synthwave", "Ambient", "Electronic", "Lo-Fi", "House", "Techno", 
  "Trap", "Hip-Hop", "R&B", "Jazz", "Rock", "Indie", "Experimental"
];

export function CreateProjectModal({ open, onOpenChange, onCreateProject }: CreateProjectModalProps) {
  const [formData, setFormData] = useState<ProjectData>({
    name: "",
    description: "",
    tags: []
  });
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // Handle file upload here
  };

  const toggleTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag) 
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const handleSubmit = () => {
    onCreateProject(formData);
    setFormData({ name: "", description: "", tags: [] });
    onOpenChange(false);
  };

  const generateProjectIdeas = () => {
    // Mock AI-generated suggestions
    const ideas = [
      "Neon Dreams Collection",
      "Midnight City Vibes", 
      "Retro Future Sounds",
      "Urban Atmospheric"
    ];
    const randomIdea = ideas[Math.floor(Math.random() * ideas.length)];
    setFormData(prev => ({ ...prev, name: randomIdea }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-popover border-border animate-scale-in">
        <DialogHeader>
          <DialogTitle className="text-vanta-white flex items-center gap-2">
            <FileMusic className="w-5 h-5 text-vanta-grey" />
            Create New Project
          </DialogTitle>
          <DialogDescription className="text-vanta-grey">
            Set up a new project to organize your tracks and creative ideas.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Project Name */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="name" className="text-vanta-white">Project Name</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={generateProjectIdeas}
                className="text-vanta-grey hover:text-vanta-white h-6 px-2"
              >
                <Wand2 className="w-3 h-3 mr-1" />
                AI Suggest
              </Button>
            </div>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter project name..."
              className="bg-input border-border text-vanta-white"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-vanta-white">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe your project vision..."
              className="bg-input border-border text-vanta-white min-h-[80px]"
            />
          </div>

          {/* Cover Art Upload */}
          <div className="space-y-2">
            <Label className="text-vanta-white">Cover Art</Label>
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                dragActive ? 'border-vanta-glow bg-vanta-glow/10' : 'border-border hover:border-vanta-grey'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="w-8 h-8 text-vanta-grey mx-auto mb-2" />
              <p className="text-vanta-grey text-sm">
                Drag & drop an image or{" "}
                <Button variant="link" className="text-vanta-grey underline p-0 h-auto">
                  browse files
                </Button>
              </p>
              <p className="text-muted-foreground text-xs mt-1">PNG, JPG up to 2MB</p>
            </div>
          </div>

          {/* Genre Tags */}
          <div className="space-y-2">
            <Label className="text-vanta-white">Genre Tags</Label>
            <div className="flex flex-wrap gap-2">
              {genreTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={formData.tags.includes(tag) ? "default" : "outline"}
                  className={`cursor-pointer transition-all hover:scale-105 ${
                    formData.tags.includes(tag)
                      ? "bg-vanta-grey text-vanta-white hover:bg-vanta-accent-hover"
                      : "border-border text-vanta-grey hover:border-vanta-grey hover:text-vanta-white"
                  }`}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="border-border text-vanta-grey hover:text-vanta-white"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!formData.name.trim()}
            className="bg-vanta-grey hover:bg-vanta-accent-hover text-vanta-white"
          >
            Create Project
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}