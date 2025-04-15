
import React, { useState } from 'react';
import { FileVideo, FileAudio, Link, FileText, Upload, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const UploadPanel = () => {
  const { toast } = useToast();
  const [urlInput, setUrlInput] = useState('');
  const [scriptText, setScriptText] = useState('');
  
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = event.target.files?.[0];
    if (file) {
      toast({
        title: "File received",
        description: `${file.name} is ready to be processed.`,
      });
      // Here we would handle the file upload and processing
    }
  };

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      toast({
        title: "URL received",
        description: "Processing your URL content...",
      });
      // Here we would handle the URL processing
      setUrlInput('');
    } else {
      toast({
        title: "Empty URL",
        description: "Please enter a valid URL.",
        variant: "destructive"
      });
    }
  };

  const handleScriptSubmit = () => {
    if (scriptText.trim()) {
      toast({
        title: "Script received",
        description: "Your script is ready to be used.",
      });
      // Here we would handle the script processing
    } else {
      toast({
        title: "Empty script",
        description: "Please enter your script text.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="bg-editor-panel rounded-md shadow-lg p-4 mb-4">
      <h2 className="text-lg font-semibold text-white mb-4">Upload Content</h2>
      
      <Tabs defaultValue="video">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="video">Video</TabsTrigger>
          <TabsTrigger value="audio">Audio</TabsTrigger>
          <TabsTrigger value="url">URL</TabsTrigger>
          <TabsTrigger value="script">Script</TabsTrigger>
        </TabsList>
        
        <TabsContent value="video" className="space-y-4">
          <div className="border-2 border-dashed border-gray-600 rounded-md p-8 text-center cursor-pointer hover:border-editor-accent transition-colors">
            <FileVideo className="h-12 w-12 mx-auto mb-2 text-gray-400" />
            <p className="text-sm text-gray-400 mb-2">Upload video files</p>
            <p className="text-xs text-gray-500 mb-4">MP4, MOV, AVI up to 500MB</p>
            <label className="cursor-pointer">
              <Input 
                type="file" 
                className="hidden"
                accept="video/*"
                onChange={(e) => handleFileUpload(e, 'video')}
              />
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Choose File
              </Button>
            </label>
          </div>
        </TabsContent>
        
        <TabsContent value="audio" className="space-y-4">
          <div className="border-2 border-dashed border-gray-600 rounded-md p-8 text-center cursor-pointer hover:border-editor-accent transition-colors">
            <FileAudio className="h-12 w-12 mx-auto mb-2 text-gray-400" />
            <p className="text-sm text-gray-400 mb-2">Upload audio files</p>
            <p className="text-xs text-gray-500 mb-4">MP3, WAV, AAC up to 100MB</p>
            <label className="cursor-pointer">
              <Input 
                type="file" 
                className="hidden"
                accept="audio/*"
                onChange={(e) => handleFileUpload(e, 'audio')}
              />
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Choose File
              </Button>
            </label>
          </div>
        </TabsContent>
        
        <TabsContent value="url" className="space-y-4">
          <div className="p-4 border border-gray-700 rounded-md bg-editor-dark">
            <div className="flex items-center space-x-2 mb-4">
              <Link className="h-5 w-5 text-gray-400" />
              <p className="text-sm text-gray-300">Enter YouTube or website URL</p>
            </div>
            <div className="flex space-x-2">
              <Input
                type="text"
                placeholder="https://www.youtube.com/watch?v=..."
                className="flex-grow bg-editor-lighter border-gray-700 text-white"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
              />
              <Button onClick={handleUrlSubmit}>
                Process URL
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2 flex items-center">
              <AlertCircle className="h-3 w-3 mr-1" /> 
              Make sure you have permission to use the content
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="script" className="space-y-4">
          <div className="p-4 border border-gray-700 rounded-md bg-editor-dark">
            <div className="flex items-center space-x-2 mb-4">
              <FileText className="h-5 w-5 text-gray-400" />
              <p className="text-sm text-gray-300">Paste your script text</p>
            </div>
            <textarea
              className="w-full h-32 p-3 bg-editor-lighter border border-gray-700 rounded-md text-white text-sm"
              placeholder="Paste or type your script here..."
              value={scriptText}
              onChange={(e) => setScriptText(e.target.value)}
            ></textarea>
            <Button className="mt-2" onClick={handleScriptSubmit}>
              Process Script
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UploadPanel;
