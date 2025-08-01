import { useState } from "react";
import { Search, Clock, Mic, Music, Tag, Filter, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const recentSearches = [
  "Dark synthwave", "Lo-fi beats", "Ambient pads", "Bass heavy", "Retro"
];

const trendingTags = [
  "synthwave", "lo-fi", "ambient", "electronic", "experimental", 
  "dark", "atmospheric", "retrowave", "chill", "upbeat"
];

const searchResults = [
  {
    id: "1",
    type: "track",
    title: "Neon Dreams",
    project: "EP 2025",
    duration: "3:24",
    tags: ["synthwave", "dark"],
    lastPlayed: "2 hours ago"
  },
  {
    id: "2", 
    type: "project",
    title: "Dark Synthwave Collection",
    trackCount: 8,
    tags: ["synthwave", "retro", "electronic"],
    lastModified: "1 week ago"
  },
  {
    id: "3",
    type: "track", 
    title: "Midnight City",
    project: "Urban Vibes",
    duration: "4:12",
    tags: ["atmospheric", "dark"],
    lastPlayed: "1 day ago"
  }
];

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setShowResults(query.length > 0);
  };

  const filteredResults = searchResults.filter(result =>
    result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    result.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="p-6 pb-24 max-w-4xl mx-auto">
      {/* Search Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Search Your Music</h1>
        <p className="text-muted-foreground">Find tracks, projects, and creative inspiration</p>
      </div>

      {/* Search Input */}
      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
        <Input
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search for tracks, projects, or tags..."
          className="pl-12 h-12 bg-input border-border text-foreground text-lg"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleSearch("")}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          >
            Clear
          </Button>
        )}
      </div>

      {!showResults ? (
        <div className="space-y-8">
          {/* Recent Searches */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-vanta-grey" />
              Recent Searches
            </h2>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((search, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="cursor-pointer border-border text-vanta-grey hover:border-vanta-grey hover:text-vanta-white transition-all hover:scale-105"
                  onClick={() => handleSearch(search)}
                >
                  {search}
                </Badge>
              ))}
            </div>
          </div>

          {/* Trending Tags */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-vanta-grey" />
              Trending Tags
            </h2>
            <div className="flex flex-wrap gap-2">
              {trendingTags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="cursor-pointer bg-vanta-grey/20 text-vanta-grey hover:bg-vanta-grey/30 hover:text-vanta-white transition-all hover:scale-105"
                  onClick={() => handleSearch(tag)}
                >
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-card border-border hover:bg-secondary/50 transition-colors cursor-pointer">
              <CardContent className="p-6 text-center">
                <Music className="w-8 h-8 text-vanta-grey mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Browse Projects</h3>
                <p className="text-sm text-muted-foreground">Explore all your musical projects</p>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-border hover:bg-secondary/50 transition-colors cursor-pointer">
              <CardContent className="p-6 text-center">
                <Tag className="w-8 h-8 text-vanta-grey mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Browse Tags</h3>
                <p className="text-sm text-muted-foreground">Find music by mood and genre</p>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Search Filters */}
          <div className="flex items-center gap-2 pb-4 border-b border-border">
            <span className="text-sm text-muted-foreground">Filter by:</span>
            {["all", "tracks", "projects"].map((filter) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveFilter(filter === "all" ? null : filter)}
                className={`capitalize ${
                  activeFilter === filter 
                    ? "bg-vanta-grey text-vanta-white" 
                    : "text-muted-foreground hover:text-vanta-white"
                }`}
              >
                {filter}
              </Button>
            ))}
          </div>

          {/* Search Results */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">
              {filteredResults.length} result{filteredResults.length !== 1 ? 's' : ''} for "{searchQuery}"
            </h2>
            
            <div className="space-y-3">
              {filteredResults.map((result) => (
                <Card 
                  key={result.id} 
                  className="bg-card border-border hover:bg-secondary/50 transition-all cursor-pointer animate-fade-in"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded bg-muted flex items-center justify-center">
                        {result.type === "track" ? (
                          <Music className="w-6 h-6 text-muted-foreground" />
                        ) : (
                          <Mic className="w-6 h-6 text-muted-foreground" />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground truncate">{result.title}</h3>
                          <Badge variant="outline" className="text-xs border-border text-vanta-grey">
                            {result.type}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          {result.type === "track" ? (
                            <>
                              <span>{result.project}</span>
                              <span>•</span>
                              <span>{result.duration}</span>
                              <span>•</span>
                              <span>Last played {result.lastPlayed}</span>
                            </>
                          ) : (
                            <>
                              <span>{result.trackCount} tracks</span>
                              <span>•</span>
                              <span>Modified {result.lastModified}</span>
                            </>
                          )}
                        </div>
                        
                        <div className="flex flex-wrap gap-1 mt-2">
                          {result.tags.map((tag, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs bg-vanta-grey/20 text-vanta-grey"
                            >
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {filteredResults.length === 0 && (
              <div className="text-center py-12">
                <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-2">No results found for "{searchQuery}"</p>
                <p className="text-sm text-muted-foreground">Try different keywords or browse your projects</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}