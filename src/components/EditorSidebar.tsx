
import React, { useState } from 'react';
import { Settings, Wand2, Youtube, MessageSquare, Film, PanelLeft } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const EditorSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // If sidebar is collapsed, show only icons
  if (isCollapsed) {
    return (
      <div className="w-14 bg-editor-panel border-r border-gray-700 flex flex-col">
        <div className="p-2 flex justify-center border-b border-gray-700">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-1" 
            onClick={() => setIsCollapsed(false)}
          >
            <PanelLeft className="h-4 w-4 text-gray-300" />
          </Button>
        </div>
        
        <div className="flex flex-col items-center py-4 space-y-4">
          <Button variant="ghost" size="sm" className="h-10 w-10 p-2">
            <Film className="h-5 w-5 text-editor-accent" />
          </Button>
          <Button variant="ghost" size="sm" className="h-10 w-10 p-2">
            <Wand2 className="h-5 w-5 text-gray-400" />
          </Button>
          <Button variant="ghost" size="sm" className="h-10 w-10 p-2">
            <Youtube className="h-5 w-5 text-gray-400" />
          </Button>
          <Button variant="ghost" size="sm" className="h-10 w-10 p-2">
            <MessageSquare className="h-5 w-5 text-gray-400" />
          </Button>
          <Button variant="ghost" size="sm" className="h-10 w-10 p-2">
            <Settings className="h-5 w-5 text-gray-400" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-64 bg-editor-panel border-r border-gray-700 flex flex-col">
      <div className="p-2 flex justify-between items-center border-b border-gray-700">
        <h3 className="text-sm font-medium text-white">Tools</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-1" 
          onClick={() => setIsCollapsed(true)}
        >
          <PanelLeft className="h-4 w-4 text-gray-300" />
        </Button>
      </div>
      
      <Tabs defaultValue="effects" className="flex-grow flex flex-col">
        <TabsList className="bg-transparent border-b border-gray-700 justify-start p-1 px-2">
          <TabsTrigger value="effects" className="text-xs data-[state=active]:bg-editor-lighter">
            <Film className="h-4 w-4 mr-1" />
            Effects
          </TabsTrigger>
          <TabsTrigger value="smart" className="text-xs">
            <Wand2 className="h-4 w-4 mr-1" />
            Smart
          </TabsTrigger>
          <TabsTrigger value="publish" className="text-xs">
            <Youtube className="h-4 w-4 mr-1" />
            Publish
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="effects" className="flex-grow m-0 p-0">
          <ScrollArea className="h-full">
            <div className="p-3 space-y-3">
              <Collapsible defaultOpen>
                <CollapsibleTrigger className="flex justify-between items-center w-full py-2 px-3 bg-editor-lighter rounded-md text-sm font-medium text-white">
                  <span>Visual Effects</span>
                  <span className="text-xs">+</span>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {['Blur', 'Brightness', 'Contrast', 'Saturation', 'Sharpen', 'Vignette'].map(effect => (
                      <Button 
                        key={effect} 
                        variant="outline" 
                        className="text-xs h-8 border-gray-700 bg-editor-darker hover:bg-editor-dark"
                      >
                        {effect}
                      </Button>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
              
              <Collapsible defaultOpen>
                <CollapsibleTrigger className="flex justify-between items-center w-full py-2 px-3 bg-editor-lighter rounded-md text-sm font-medium text-white">
                  <span>Transitions</span>
                  <span className="text-xs">+</span>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {['Fade', 'Dissolve', 'Wipe', 'Slide', 'Zoom', 'Spin'].map(transition => (
                      <Button 
                        key={transition} 
                        variant="outline" 
                        className="text-xs h-8 border-gray-700 bg-editor-darker hover:bg-editor-dark"
                      >
                        {transition}
                      </Button>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
              
              <Collapsible defaultOpen>
                <CollapsibleTrigger className="flex justify-between items-center w-full py-2 px-3 bg-editor-lighter rounded-md text-sm font-medium text-white">
                  <span>Caption Styles</span>
                  <span className="text-xs">+</span>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {['Subtitle', 'Title', 'Lower Third', 'Quote', 'Animated', 'Minimalist'].map(style => (
                      <Button 
                        key={style} 
                        variant="outline" 
                        className="text-xs h-8 border-gray-700 bg-editor-darker hover:bg-editor-dark"
                      >
                        {style}
                      </Button>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="smart" className="flex-grow m-0 p-0">
          <ScrollArea className="h-full">
            <div className="p-3 space-y-3">
              <div className="py-2 px-3 bg-editor-lighter rounded-md">
                <h3 className="text-sm font-medium text-white mb-3">Smart Automater</h3>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs text-gray-400">Enter prompt</label>
                    <textarea 
                      className="w-full h-20 p-2 bg-editor-darker border border-gray-700 rounded-md text-sm text-white resize-none"
                      placeholder="What would you like to create?"
                    />
                  </div>
                  <Button className="w-full">Generate Content</Button>
                </div>
              </div>
              
              <div className="py-2 px-3 bg-editor-lighter rounded-md">
                <h3 className="text-sm font-medium text-white mb-3">Hooks/Engagers</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full text-xs justify-start border-gray-700 bg-editor-darker hover:bg-editor-dark">
                    <span>Question Hook</span>
                  </Button>
                  <Button variant="outline" className="w-full text-xs justify-start border-gray-700 bg-editor-darker hover:bg-editor-dark">
                    <span>Statistic Hook</span>
                  </Button>
                  <Button variant="outline" className="w-full text-xs justify-start border-gray-700 bg-editor-darker hover:bg-editor-dark">
                    <span>Story Hook</span>
                  </Button>
                  <Button variant="outline" className="w-full text-xs justify-start border-gray-700 bg-editor-darker hover:bg-editor-dark">
                    <span>Quote Hook</span>
                  </Button>
                </div>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="publish" className="flex-grow m-0 p-0">
          <ScrollArea className="h-full">
            <div className="p-3 space-y-3">
              <div className="py-2 px-3 bg-editor-lighter rounded-md">
                <h3 className="text-sm font-medium text-white mb-3">YouTube Upload</h3>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs text-gray-400">Title</label>
                    <input 
                      type="text" 
                      className="w-full p-2 bg-editor-darker border border-gray-700 rounded-md text-sm text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-gray-400">Description</label>
                    <textarea 
                      className="w-full h-20 p-2 bg-editor-darker border border-gray-700 rounded-md text-sm text-white resize-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-gray-400">Tags (comma separated)</label>
                    <input 
                      type="text" 
                      className="w-full p-2 bg-editor-darker border border-gray-700 rounded-md text-sm text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-gray-400">Schedule</label>
                    <input 
                      type="datetime-local" 
                      className="w-full p-2 bg-editor-darker border border-gray-700 rounded-md text-sm text-white"
                    />
                  </div>
                  <Button className="w-full">Schedule Upload</Button>
                </div>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EditorSidebar;
