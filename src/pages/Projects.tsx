import { useState } from "react";
import { Grid, List, Plus, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProjectCard } from "@/components/ProjectCard";

const mockProjects = [
  {
    id: "1",
    name: "EP 2025",
    description: "5-track dark synthwave EP with heavy bass and atmospheric pads",
    trackCount: 5,
    coverUrl: "/lovable-uploads/c6d15258-2b98-4625-9216-0e8684fc39c0.png",
    lastModified: "2 days ago"
  },
  {
    id: "2", 
    name: "Dark Synthwave",
    description: "Cyberpunk-inspired instrumentals with retro-futuristic vibes",
    trackCount: 8,
    lastModified: "1 week ago"
  },
  {
    id: "3",
    name: "Ambient Sessions", 
    description: "Meditation and focus tracks with ethereal soundscapes",
    trackCount: 3,
    lastModified: "3 days ago"
  },
  {
    id: "4",
    name: "Bass Experiments",
    description: "Heavy sub-bass explorations and rhythmic patterns",
    trackCount: 12,
    lastModified: "5 days ago"
  },
  {
    id: "5",
    name: "Vocal Chops",
    description: "Experimental vocal processing and manipulation",
    trackCount: 7,
    lastModified: "1 day ago"
  },
  {
    id: "6",
    name: "Lo-Fi Beats",
    description: "Chill hop instrumentals for late night coding sessions",
    trackCount: 15,
    lastModified: "2 weeks ago"
  }
];

export default function Projects() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = mockProjects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Your Projects</h1>
          <p className="text-muted-foreground">
            {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
          </p>
        </div>
        
        <Button className="bg-vanta-grey hover:bg-vanta-accent-hover text-vanta-white">
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-input border-border text-foreground"
          />
        </div>
        
        <Button variant="outline" size="sm" className="border-border text-muted-foreground">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
        
        <div className="flex items-center border border-border rounded-md">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('grid')}
            className={viewMode === 'grid' ? 'bg-vanta-grey text-vanta-white' : 'text-muted-foreground'}
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('list')}
            className={viewMode === 'list' ? 'bg-vanta-grey text-vanta-white' : 'text-muted-foreground'}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Projects Grid */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              {...project}
              onClick={() => console.log('Opening project:', project.name)}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="flex items-center gap-4 p-4 bg-card border border-border rounded-md hover:bg-secondary/50 transition-colors cursor-pointer"
            >
              <div className="w-12 h-12 rounded bg-muted flex items-center justify-center">
                {project.coverUrl ? (
                  <img 
                    src={project.coverUrl} 
                    alt={project.name}
                    className="w-full h-full rounded object-cover"
                  />
                ) : (
                  <span className="text-muted-foreground font-bold text-sm">
                    {project.name.charAt(0)}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground truncate">{project.name}</h3>
                <p className="text-sm text-muted-foreground truncate">{project.description}</p>
              </div>
              <div className="text-right text-sm text-muted-foreground">
                <p>{project.trackCount} tracks</p>
                <p>{project.lastModified}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No projects found</p>
          <Button className="bg-vanta-grey hover:bg-vanta-accent-hover text-vanta-white">
            <Plus className="w-4 h-4 mr-2" />
            Create Your First Project
          </Button>
        </div>
      )}
    </div>
  );
}