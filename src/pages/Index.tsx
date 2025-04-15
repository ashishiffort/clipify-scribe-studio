
import React, { useState } from 'react';
import Header from '@/components/Header';
import UploadPanel from '@/components/UploadPanel';
import TranscriptPanel from '@/components/TranscriptPanel';
import VideoPreview from '@/components/VideoPreview';
import Timeline from '@/components/Timeline';
import AssetPanel from '@/components/AssetPanel';
import EditorSidebar from '@/components/EditorSidebar';
import PromptInput from '@/components/PromptInput';

const Index = () => {
  // State for handling drag over events
  const [isDragOver, setIsDragOver] = useState(false);
  
  // Handle drag events
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };
  
  const handleDragLeave = () => {
    setIsDragOver(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    // Here we would handle the dropped files
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      console.log('Files dropped:', e.dataTransfer.files);
    }
  };

  return (
    <div className="min-h-screen bg-editor-dark text-white flex flex-col">
      <Header />
      
      <div className="flex flex-grow overflow-hidden">
        <EditorSidebar />
        
        <div 
          className={`flex-grow flex flex-col overflow-hidden p-4 ${isDragOver ? 'bg-editor-accent bg-opacity-10' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <UploadPanel />
          
          <PromptInput />
          
          <div className="flex-grow grid grid-cols-5 gap-4 mt-4">
            <div className="col-span-1 flex flex-col">
              <TranscriptPanel />
            </div>
            
            <div className="col-span-3 flex flex-col">
              <div className="flex-grow mb-4">
                <VideoPreview />
              </div>
              
              <div className="h-64">
                <Timeline />
              </div>
            </div>
            
            <div className="col-span-1 flex flex-col">
              <AssetPanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
