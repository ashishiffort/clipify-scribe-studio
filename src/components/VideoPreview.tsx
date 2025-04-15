
import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Maximize2 } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

const VideoPreview = () => {
  return (
    <div className="bg-black rounded-md overflow-hidden flex flex-col h-full">
      <div className="flex-grow flex items-center justify-center">
        <div className="text-gray-500 text-center">
          <img
            src="/placeholder.svg"
            alt="Video Preview"
            className="max-h-full max-w-full mx-auto"
          />
          <p className="mt-4">Upload or select media to preview</p>
        </div>
      </div>
      
      <div className="bg-editor-panel p-3 border-t border-gray-800">
        <div className="flex items-center mb-2">
          <Slider
            defaultValue={[0]}
            max={100}
            step={1}
            className="flex-grow mx-4"
          />
          <span className="text-xs text-gray-400 min-w-[60px] text-right">00:00:00</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <SkipBack className="h-4 w-4 text-gray-300" />
            </Button>
            <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-full">
              <Play className="h-5 w-5 text-white" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <SkipForward className="h-4 w-4 text-gray-300" />
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <Volume2 className="h-4 w-4 text-gray-400" />
            <Slider
              defaultValue={[80]}
              max={100}
              step={1}
              className="w-24"
            />
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Maximize2 className="h-4 w-4 text-gray-300" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPreview;
