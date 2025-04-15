
import React, { useState } from 'react';
import { Edit3, Copy, Search, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TranscriptSegment {
  id: number;
  startTime: string;
  text: string;
  isEditing: boolean;
}

const TranscriptPanel = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [transcript, setTranscript] = useState<TranscriptSegment[]>([
    { id: 1, startTime: '00:00:05', text: 'Welcome to this tutorial on video editing.', isEditing: false },
    { id: 2, startTime: '00:00:10', text: 'Today, we\'ll learn how to create engaging content for social media.', isEditing: false },
    { id: 3, startTime: '00:00:18', text: 'First, we need to understand the basics of storytelling.', isEditing: false },
    { id: 4, startTime: '00:00:25', text: 'A good story has a clear beginning, middle, and end.', isEditing: false },
    { id: 5, startTime: '00:00:35', text: 'Let\'s start by organizing our footage.', isEditing: false },
    { id: 6, startTime: '00:00:42', text: 'Next, we\'ll add transitions between clips to make the video flow smoothly.', isEditing: false },
    { id: 7, startTime: '00:00:50', text: 'Audio quality is just as important as video quality.', isEditing: false },
    { id: 8, startTime: '00:01:00', text: 'Remember to adjust levels and remove background noise.', isEditing: false },
    { id: 9, startTime: '00:01:10', text: 'Finally, add captions to make your video accessible to everyone.', isEditing: false },
    { id: 10, startTime: '00:01:20', text: 'Thanks for watching! Don\'t forget to subscribe.', isEditing: false },
  ]);

  const toggleEdit = (id: number) => {
    setTranscript(transcript.map(segment => 
      segment.id === id ? { ...segment, isEditing: !segment.isEditing } : segment
    ));
  };

  const updateText = (id: number, newText: string) => {
    setTranscript(transcript.map(segment => 
      segment.id === id ? { ...segment, text: newText } : segment
    ));
  };

  const saveEdit = (id: number) => {
    toggleEdit(id);
  };

  const filteredTranscript = searchQuery 
    ? transcript.filter(segment => 
        segment.text.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : transcript;

  return (
    <div className="bg-editor-panel rounded-md shadow-lg h-full flex flex-col">
      <div className="p-3 border-b border-gray-700">
        <h2 className="text-lg font-semibold text-white mb-2">Transcript</h2>
        <div className="relative">
          <Input
            type="text"
            placeholder="Search transcript..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 bg-editor-darker border-gray-700"
          />
          <Search className="h-4 w-4 absolute left-2.5 top-2.5 text-gray-400" />
        </div>
      </div>
      
      <ScrollArea className="flex-grow">
        <div className="space-y-1 p-2">
          {filteredTranscript.map(segment => (
            <div 
              key={segment.id} 
              className="p-2 hover:bg-editor-lighter rounded-md flex transition-colors group"
            >
              <div className="w-16 text-xs text-gray-400 mt-1 flex items-center">
                <PlayCircle className="h-3 w-3 mr-1 text-editor-accent cursor-pointer" />
                {segment.startTime}
              </div>
              
              <div className="flex-grow">
                {segment.isEditing ? (
                  <div className="flex items-center">
                    <Input
                      type="text"
                      value={segment.text}
                      onChange={(e) => updateText(segment.id, e.target.value)}
                      className="bg-editor-lighter border-gray-700"
                      autoFocus
                    />
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => saveEdit(segment.id)}
                      className="ml-2"
                    >
                      Save
                    </Button>
                  </div>
                ) : (
                  <p className="text-sm text-white">{segment.text}</p>
                )}
              </div>
              
              <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-start space-x-1">
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="h-6 w-6 p-0" 
                  onClick={() => toggleEdit(segment.id)}
                >
                  <Edit3 className="h-3 w-3 text-gray-400 hover:text-white" />
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="h-6 w-6 p-0"
                >
                  <Copy className="h-3 w-3 text-gray-400 hover:text-white" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default TranscriptPanel;
