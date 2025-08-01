import { useState } from "react";
import { 
  StickyNote, 
  Lightbulb, 
  Palette, 
  Music, 
  Wand2,
  Save,
  Plus,
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

interface VisionBoardProps {
  projectId: string;
  projectName: string;
}

interface Note {
  id: string;
  type: 'note' | 'idea' | 'mood' | 'reference';
  content: string;
  color?: string;
}

const noteTypes = [
  { type: 'note' as const, icon: StickyNote, label: 'Note', color: 'bg-yellow-500/20 border-yellow-500/30' },
  { type: 'idea' as const, icon: Lightbulb, label: 'Idea', color: 'bg-blue-500/20 border-blue-500/30' },
  { type: 'mood' as const, icon: Palette, label: 'Mood', color: 'bg-purple-500/20 border-purple-500/30' },
  { type: 'reference' as const, icon: Music, label: 'Reference', color: 'bg-green-500/20 border-green-500/30' },
];

const moodSuggestions = [
  "Dark & Atmospheric", "Energetic & Uplifting", "Nostalgic & Dreamy", 
  "Aggressive & Powerful", "Calm & Meditative", "Mysterious & Cinematic",
  "Retro & Vintage", "Futuristic & Clean", "Organic & Natural"
];

export function VisionBoard({ projectId, projectName }: VisionBoardProps) {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      type: 'mood',
      content: 'Dark synthwave vibes with neon aesthetics. Think Blade Runner meets modern electronic music.'
    },
    {
      id: '2', 
      type: 'idea',
      content: 'Opening track should build slowly with ambient pads, then drop into heavy bass at 1:30'
    }
  ]);
  const [newNote, setNewNote] = useState('');
  const [selectedType, setSelectedType] = useState<Note['type']>('note');
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);

  const addNote = () => {
    if (!newNote.trim()) return;
    
    const note: Note = {
      id: Date.now().toString(),
      type: selectedType,
      content: newNote
    };
    
    setNotes(prev => [...prev, note]);
    setNewNote('');
  };

  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  const generateAISuggestions = () => {
    // Mock AI suggestions based on project context
    const suggestions = [
      "Add atmospheric reverb to create depth",
      "Try layering multiple synth arpeggios",
      "Consider adding vinyl crackle for lo-fi texture",
      "Use side-chain compression on pads"
    ];
    setAiSuggestions(suggestions);
  };

  const addSuggestionAsNote = (suggestion: string) => {
    const note: Note = {
      id: Date.now().toString(),
      type: 'idea',
      content: suggestion
    };
    setNotes(prev => [...prev, note]);
    setAiSuggestions(prev => prev.filter(s => s !== suggestion));
  };

  const getTypeConfig = (type: Note['type']) => {
    return noteTypes.find(t => t.type === type) || noteTypes[0];
  };

  return (
    <div className="p-6 pb-24 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Vision Board</h1>
          <p className="text-muted-foreground">{projectName} - Creative workspace</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={generateAISuggestions}
            className="border-border text-vanta-grey hover:text-vanta-white"
          >
            <Wand2 className="w-4 h-4 mr-2" />
            AI Inspire
          </Button>
          <Button className="bg-vanta-grey hover:bg-vanta-accent-hover text-vanta-white">
            <Save className="w-4 h-4 mr-2" />
            Save Board
          </Button>
        </div>
      </div>

      {/* Quick Mood Tags */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg text-foreground">Mood & Vibe</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {moodSuggestions.map((mood) => (
              <Badge
                key={mood}
                variant="outline"
                className="cursor-pointer border-border text-vanta-grey hover:border-vanta-grey hover:text-vanta-white transition-all hover:scale-105"
                onClick={() => {
                  const note: Note = {
                    id: Date.now().toString(),
                    type: 'mood',
                    content: mood
                  };
                  setNotes(prev => [...prev, note]);
                }}
              >
                {mood}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Suggestions */}
      {aiSuggestions.length > 0 && (
        <Card className="bg-card border-border animate-fade-in">
          <CardHeader>
            <CardTitle className="text-lg text-foreground flex items-center gap-2">
              <Wand2 className="w-5 h-5 text-vanta-grey" />
              AI Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {aiSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-muted rounded-md"
                >
                  <span className="text-foreground text-sm">{suggestion}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => addSuggestionAsNote(suggestion)}
                    className="text-vanta-grey hover:text-vanta-white"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Add New Note */}
      <Card className="bg-card border-border">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex gap-2">
              {noteTypes.map((type) => (
                <Button
                  key={type.type}
                  variant={selectedType === type.type ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedType(type.type)}
                  className={`${
                    selectedType === type.type
                      ? "bg-vanta-grey text-vanta-white"
                      : "border-border text-vanta-grey hover:text-vanta-white"
                  }`}
                >
                  <type.icon className="w-4 h-4 mr-2" />
                  {type.label}
                </Button>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder={`Add a new ${selectedType}...`}
                className="bg-input border-border text-foreground"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    addNote();
                  }
                }}
              />
              <Button
                onClick={addNote}
                disabled={!newNote.trim()}
                className="bg-vanta-grey hover:bg-vanta-accent-hover text-vanta-white"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map((note) => {
          const typeConfig = getTypeConfig(note.type);
          const Icon = typeConfig.icon;
          
          return (
            <Card
              key={note.id}
              className={`bg-card border-border hover:shadow-lg transition-all duration-300 group animate-scale-in ${typeConfig.color}`}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-vanta-grey" />
                    <Badge variant="outline" className="text-xs border-border text-vanta-grey">
                      {typeConfig.label}
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteNote(note.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-foreground text-sm leading-relaxed">{note.content}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {notes.length === 0 && (
        <div className="text-center py-12">
          <StickyNote className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground mb-4">No notes yet. Start capturing your creative ideas!</p>
        </div>
      )}
    </div>
  );
}