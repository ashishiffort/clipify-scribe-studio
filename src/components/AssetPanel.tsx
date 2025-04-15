
import React, { useState } from 'react';
import { Search, Video, Image, Music, FileText, Grid, List } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Asset {
  id: number;
  type: 'video' | 'image' | 'audio' | 'text';
  name: string;
  thumbnail?: string;
  duration?: string;
}

const AssetPanel = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  const [assets, setAssets] = useState<Asset[]>([
    { id: 1, type: 'video', name: 'Intro sequence.mp4', thumbnail: '/placeholder.svg', duration: '00:15' },
    { id: 2, type: 'video', name: 'Interview clip.mp4', thumbnail: '/placeholder.svg', duration: '02:30' },
    { id: 3, type: 'image', name: 'Product photo.jpg', thumbnail: '/placeholder.svg' },
    { id: 4, type: 'image', name: 'Background.png', thumbnail: '/placeholder.svg' },
    { id: 5, type: 'audio', name: 'Background music.mp3', duration: '03:45' },
    { id: 6, type: 'audio', name: 'Voice over.wav', duration: '01:20' },
    { id: 7, type: 'text', name: 'Introduction script.txt' }
  ]);

  const filterAssets = (type: string) => {
    if (type === 'all') {
      return assets.filter(asset => 
        asset.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return assets.filter(asset => 
      asset.type === type && 
      asset.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const handleDragStart = (e: React.DragEvent, asset: Asset) => {
    e.dataTransfer.setData('asset', JSON.stringify(asset));
    e.dataTransfer.effectAllowed = 'copy';
  };

  const getAssetIcon = (type: string) => {
    switch(type) {
      case 'video': return <Video className="h-4 w-4 text-blue-400" />;
      case 'image': return <Image className="h-4 w-4 text-purple-400" />;
      case 'audio': return <Music className="h-4 w-4 text-green-400" />;
      case 'text': return <FileText className="h-4 w-4 text-yellow-400" />;
      default: return null;
    }
  };

  return (
    <div className="bg-editor-panel rounded-md shadow-lg h-full flex flex-col">
      <div className="p-3 border-b border-gray-700 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-white">Assets</h2>
        
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className={`h-8 w-8 p-1 ${viewType === 'grid' ? 'bg-editor-lighter' : ''}`} 
            onClick={() => setViewType('grid')}
          >
            <Grid className="h-4 w-4 text-gray-300" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className={`h-8 w-8 p-1 ${viewType === 'list' ? 'bg-editor-lighter' : ''}`} 
            onClick={() => setViewType('list')}
          >
            <List className="h-4 w-4 text-gray-300" />
          </Button>
        </div>
      </div>
      
      <div className="p-3 border-b border-gray-700">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search assets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 bg-editor-darker border-gray-700"
          />
          <Search className="h-4 w-4 absolute left-2.5 top-2.5 text-gray-400" />
        </div>
      </div>
      
      <Tabs defaultValue="all" className="flex-grow flex flex-col">
        <TabsList className="px-3 py-2 border-b border-gray-700 bg-transparent flex justify-start space-x-2">
          <TabsTrigger value="all" className="text-xs h-7">All</TabsTrigger>
          <TabsTrigger value="video" className="text-xs h-7">Video</TabsTrigger>
          <TabsTrigger value="image" className="text-xs h-7">Images</TabsTrigger>
          <TabsTrigger value="audio" className="text-xs h-7">Audio</TabsTrigger>
          <TabsTrigger value="text" className="text-xs h-7">Text</TabsTrigger>
        </TabsList>
        
        {['all', 'video', 'image', 'audio', 'text'].map(tabValue => (
          <TabsContent key={tabValue} value={tabValue} className="flex-grow p-0 m-0">
            <ScrollArea className="h-full">
              {viewType === 'grid' ? (
                <div className="grid grid-cols-2 gap-3 p-3">
                  {filterAssets(tabValue).map(asset => (
                    <div 
                      key={asset.id}
                      className="bg-editor-dark rounded-md overflow-hidden cursor-grab hover:bg-editor-lighter transition-colors"
                      draggable
                      onDragStart={(e) => handleDragStart(e, asset)}
                    >
                      {(asset.type === 'video' || asset.type === 'image') && (
                        <div className="aspect-video bg-black relative">
                          <img 
                            src={asset.thumbnail || '/placeholder.svg'} 
                            alt={asset.name}
                            className="w-full h-full object-cover"
                          />
                          {asset.type === 'video' && asset.duration && (
                            <span className="absolute bottom-1 right-1 text-xs bg-black/70 text-white px-1 rounded">
                              {asset.duration}
                            </span>
                          )}
                        </div>
                      )}
                      <div className="p-2 flex items-center">
                        {getAssetIcon(asset.type)}
                        <span className="text-xs text-gray-300 ml-2 truncate">{asset.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-1 p-3">
                  {filterAssets(tabValue).map(asset => (
                    <div 
                      key={asset.id}
                      className="flex items-center p-2 hover:bg-editor-lighter rounded cursor-grab"
                      draggable
                      onDragStart={(e) => handleDragStart(e, asset)}
                    >
                      {getAssetIcon(asset.type)}
                      <span className="text-sm text-gray-300 ml-2">{asset.name}</span>
                      {asset.duration && (
                        <span className="text-xs text-gray-500 ml-auto">{asset.duration}</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default AssetPanel;
