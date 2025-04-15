
import React from 'react';
import { Settings, Save, Upload, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="bg-editor-panel border-b border-gray-700 flex justify-between items-center p-3">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold text-white">Clipify Studio</h1>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
          <Upload className="h-4 w-4 mr-1" />
          <span>Export</span>
        </Button>
        <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
          <Save className="h-4 w-4 mr-1" />
          <span>Save</span>
        </Button>
        <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
          <Settings className="h-4 w-4 mr-1" />
          <span>Settings</span>
        </Button>
        <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
          <HelpCircle className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
