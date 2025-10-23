'use client';

import { Type, Trash2, Download, Home, Undo, Redo } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import NextImage from 'next/image';
import { ImportPanel } from './ImportPanel';
import { ImageUploadDialog } from './ImageUploadDialog';
import { ElementTreePanel } from './ElementTreePanel';
import { SelectedElement } from '@/lib/types';

interface ToolbarProps {
  onAddText: () => void;
  onAddImage: (imageUrl: string) => void;
  onDelete: () => void;
  onExport: () => void;
  onImport: (html: string) => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  hasSelection: boolean;
  htmlContent: string;
  selectedElement: SelectedElement | null;
  onSelect: (element: SelectedElement) => void;
  stageRef: HTMLDivElement | null;
}

export function Toolbar({
  onAddText,
  onAddImage,
  onDelete,
  onExport,
  onImport,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  hasSelection,
  htmlContent,
  selectedElement,
  onSelect,
  stageRef,
}: ToolbarProps) {
  return (
    <aside className="w-80 bg-gradient-to-b from-amber-50 via-amber-100 to-amber-200 text-slate-900 flex flex-col h-screen shadow-2xl">
      <div className="p-6 border-b border-amber-300/50">
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-xl bg-white p-2 shadow-lg">
            <NextImage
              src="/image copy.png"
              alt="SOL Logo"
              width={48}
              height={48}
              className="object-contain"
            />
          </div>
          <div>
            <h2 className="text-lg font-bold bg-gradient-to-r from-amber-600 to-amber-400 bg-clip-text text-transparent">
              NEO Editor
            </h2>
            <p className="text-xs text-amber-600/70">Poster Designer</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <Link href="/">
          <Button
            variant="ghost"
            className="w-full justify-start text-amber-800 hover:bg-amber-300/40 hover:text-amber-950 transition-all duration-200 group"
          >
            <Home className="w-4 h-4 mr-3 group-hover:scale-110 transition-transform" />
            Home
          </Button>
        </Link>

        <Separator className="my-4 bg-amber-300/50" />

        <div className="space-y-2">
          <p className="text-xs font-semibold text-amber-700 px-3 mb-3 tracking-wider">HISTORY</p>

          <div className="flex gap-2 px-2">
            <Button
              variant="ghost"
              onClick={onUndo}
              disabled={!canUndo}
              className="flex-1 justify-center text-amber-700 hover:bg-amber-300/40 hover:text-amber-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 group"
              title="Undo (Ctrl+Z)"
            >
              <Undo className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </Button>

            <Button
              variant="ghost"
              onClick={onRedo}
              disabled={!canRedo}
              className="flex-1 justify-center text-amber-700 hover:bg-amber-300/40 hover:text-amber-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 group"
              title="Redo (Ctrl+Y)"
            >
              <Redo className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </Button>
          </div>
        </div>

        <Separator className="my-4 bg-amber-300/50" />

        <div className="space-y-2">
          <p className="text-xs font-semibold text-amber-700 px-3 mb-3 tracking-wider">TOOLS</p>

          <ImportPanel onImport={onImport} />

          <Button
            variant="ghost"
            onClick={onAddText}
            className="w-full justify-start text-amber-800 hover:bg-amber-400/30 hover:text-amber-950 transition-all duration-200 group"
          >
            <Type className="w-4 h-4 mr-3 group-hover:scale-110 transition-transform" />
            Add Text
          </Button>

          <ImageUploadDialog onAddImage={onAddImage} />

          <Button
            variant="ghost"
            onClick={onDelete}
            disabled={!hasSelection}
            className="w-full justify-start text-amber-800 hover:bg-red-200/40 hover:text-red-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 group"
          >
            <Trash2 className="w-4 h-4 mr-3 group-hover:scale-110 transition-transform" />
            Delete
          </Button>
        </div>

        <Separator className="my-4 bg-amber-300/50" />

        <div className="space-y-2">
          <p className="text-xs font-semibold text-amber-700 px-3 mb-3 tracking-wider">ACTIONS</p>

          <Button
            variant="ghost"
            onClick={onExport}
            className="w-full justify-start text-amber-800 hover:bg-amber-400/30 hover:text-amber-950 transition-all duration-200 group"
          >
            <Download className="w-4 h-4 mr-3 group-hover:scale-110 transition-transform" />
            Export HTML
          </Button>
        </div>

        <Separator className="my-4 bg-amber-300/50" />

        <div className="space-y-2">
          <p className="text-xs font-semibold text-amber-700 px-3 mb-3 tracking-wider">ELEMENT TREE</p>
          <div className="bg-amber-100/50 rounded-lg overflow-hidden">
            <ElementTreePanel
              htmlContent={htmlContent}
              selectedElement={selectedElement}
              onSelect={onSelect}
              stageRef={stageRef}
            />
          </div>
        </div>
      </nav>

      <div className="p-6 border-t border-amber-300/50 bg-amber-200/50">
        <div className="flex items-center justify-between">
          <p className="text-xs text-amber-800">Version 1.0.0</p>
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-amber-700">Ready</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
