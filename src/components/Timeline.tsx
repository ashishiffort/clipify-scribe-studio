
import React, { useState } from 'react';
import { Scissors, Plus, Music, Video, Image, Type, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Track {
  id: number;
  name: string;
  type: 'video' | 'audio' | 'text';
  clips: {
    id: number;
    start: number;
    end: number;
    color: string;
    name: string;
  }[];
}

const Timeline = () => {
  const [tracks, setTracks] = useState<Track[]>([
    {
      id: 1,
      name: 'Video Track',
      type: 'video',
      clips: [
        { id: 1, start: 10, end: 100, color: '#8B5CF6', name: 'Intro clip' },
        { id: 2, start: 110, end: 230, color: '#8B5CF6', name: 'Main content' }
      ]
    },
    {
      id: 2,
      name: 'Audio Track',
      type: 'audio',
      clips: [
        { id: 3, start: 0, end: 150, color: '#10B981', name: 'Background music' },
        { id: 4, start: 160, end: 250, color: '#10B981', name: 'Voice over' }
      ]
    },
    {
      id: 3,
      name: 'Text Track',
      type: 'text',
      clips: [
        { id: 5, start: 30, end: 90, color: '#F59E0B', name: 'Caption 1' },
        { id: 6, start: 150, end: 210, color: '#F59E0B', name: 'Caption 2' }
      ]
    }
  ]);

  const [zoomLevel, setZoomLevel] = useState(1);

  const addNewTrack = (type: 'video' | 'audio' | 'text') => {
    const newTrack: Track = {
      id: tracks.length + 1,
      name: `${type.charAt(0).toUpperCase() + type.slice(1)} Track ${tracks.filter(t => t.type === type).length + 1}`,
      type,
      clips: []
    };
    
    setTracks([...tracks, newTrack]);
  };

  const getTrackIcon = (type: string) => {
    switch(type) {
      case 'video': return <Video className="h-4 w-4 text-blue-400" />;
      case 'audio': return <Music className="h-4 w-4 text-green-400" />;
      case 'text': return <Type className="h-4 w-4 text-yellow-400" />;
      default: return null;
    }
  };

  return (
    <div className="bg-editor-timeline rounded-md shadow-lg h-full flex flex-col border-t border-gray-700">
      <div className="p-2 border-b border-gray-700 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-white">Timeline</h2>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-1">
            <Scissors className="h-4 w-4 text-gray-300" />
          </Button>
          
          <div className="flex border border-gray-700 rounded-md overflow-hidden">
            <button 
              className={`px-2 py-1 text-xs ${zoomLevel <= 0.5 ? 'bg-gray-700 text-gray-400' : 'bg-editor-dark text-gray-300 hover:bg-gray-700'}`}
              onClick={() => setZoomLevel(Math.max(0.5, zoomLevel - 0.5))}
              disabled={zoomLevel <= 0.5}
            >
              -
            </button>
            <span className="px-2 py-1 text-xs border-l border-r border-gray-700 bg-editor-dark text-gray-300">
              {zoomLevel * 100}%
            </span>
            <button 
              className="px-2 py-1 text-xs bg-editor-dark text-gray-300 hover:bg-gray-700"
              onClick={() => setZoomLevel(zoomLevel + 0.5)}
            >
              +
            </button>
          </div>
          
          <div className="relative">
            <Button variant="ghost" size="sm" className="h-8 p-1">
              <Plus className="h-4 w-4 text-gray-300 mr-1" />
              <span className="text-xs">Track</span>
            </Button>
            <div className="absolute top-full right-0 mt-1 bg-editor-panel rounded shadow-lg z-10 hidden group-hover:block">
              <button className="flex items-center w-full text-left p-2 hover:bg-editor-dark text-sm" onClick={() => addNewTrack('video')}>
                <Video className="h-4 w-4 mr-2 text-blue-400" />
                <span>Video Track</span>
              </button>
              <button className="flex items-center w-full text-left p-2 hover:bg-editor-dark text-sm" onClick={() => addNewTrack('audio')}>
                <Music className="h-4 w-4 mr-2 text-green-400" />
                <span>Audio Track</span>
              </button>
              <button className="flex items-center w-full text-left p-2 hover:bg-editor-dark text-sm" onClick={() => addNewTrack('text')}>
                <Type className="h-4 w-4 mr-2 text-yellow-400" />
                <span>Text Track</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex-grow flex">
        <div className="w-48 bg-editor-panel border-r border-gray-700">
          <div className="h-8 border-b border-gray-700"></div>
          {tracks.map(track => (
            <div 
              key={track.id} 
              className="h-16 border-b border-gray-700 p-2 flex items-center"
            >
              <div className="flex items-center">
                {getTrackIcon(track.type)}
                <span className="ml-2 text-xs text-gray-300">{track.name}</span>
              </div>
            </div>
          ))}
        </div>
        
        <ScrollArea className="flex-grow h-full">
          <div className="relative">
            {/* Timeline ruler */}
            <div className="h-8 border-b border-gray-700 bg-editor-timeline relative">
              {Array(20).fill(0).map((_, i) => (
                <div key={i} className="absolute h-8 flex flex-col justify-between items-center" style={{ left: `${i * 50 * zoomLevel}px` }}>
                  <div className="h-2 w-px bg-gray-600"></div>
                  <span className="text-xs text-gray-500">{i}s</span>
                  <div className="h-2 w-px bg-gray-600"></div>
                </div>
              ))}
              {Array(100).fill(0).map((_, i) => (
                i % 5 !== 0 && (
                  <div key={i} className="absolute h-8 flex flex-col justify-between items-center" style={{ left: `${i * 10 * zoomLevel}px` }}>
                    <div className="h-1 w-px bg-gray-700"></div>
                    <div className="h-1 w-px bg-gray-700"></div>
                  </div>
                )
              ))}
            </div>
            
            {/* Track clips */}
            <div style={{ width: 1000 * zoomLevel }}>
              {tracks.map(track => (
                <div 
                  key={track.id} 
                  className="h-16 border-b border-gray-700 bg-editor-track relative"
                >
                  {track.clips.map(clip => (
                    <div 
                      key={clip.id}
                      className="absolute top-2 bottom-2 rounded-md border border-gray-600 cursor-pointer hover:brightness-110"
                      style={{ 
                        left: `${clip.start * zoomLevel}px`, 
                        width: `${(clip.end - clip.start) * zoomLevel}px`, 
                        backgroundColor: clip.color + '33',
                        borderColor: clip.color
                      }}
                    >
                      <div className="px-2 py-1 text-xs text-white truncate">{clip.name}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Timeline;
