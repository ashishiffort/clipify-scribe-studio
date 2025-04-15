
import React, { useState } from 'react';
import { Send, Sparkles, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const PromptInput = () => {
  const [prompt, setPrompt] = useState('');
  const { toast } = useToast();
  
  const handleSubmit = () => {
    if (prompt.trim()) {
      toast({
        title: "Processing prompt",
        description: "Your creative prompt is being processed...",
      });
      
      // Here we would handle the AI processing
      console.log('Processing prompt:', prompt);
      
      setPrompt('');
    } else {
      toast({
        title: "Empty prompt",
        description: "Please enter a prompt to generate content.",
        variant: "destructive"
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="bg-editor-panel rounded-md shadow-lg p-4">
      <div className="flex items-start space-x-2">
        <div className="flex-grow">
          <textarea
            placeholder="Enter your creative prompt here... (e.g., 'Create a travel video about Italy with upbeat background music')"
            className="w-full p-3 bg-editor-lighter border border-gray-700 rounded-md text-white text-sm min-h-[80px] resize-none"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
          ></textarea>
          <div className="flex items-center text-xs text-gray-500 mt-1">
            <AlertCircle className="h-3 w-3 mr-1" />
            <span>Be specific about style, tone, and content you want in your video</span>
          </div>
        </div>
        <Button onClick={handleSubmit} className="mt-2">
          <Sparkles className="h-4 w-4 mr-2" />
          Generate
        </Button>
      </div>
    </div>
  );
};

export default PromptInput;
