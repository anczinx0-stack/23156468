'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { assignIdsToElements, isTextElement, isImageElement } from '@/lib/html-utils';
import { SelectedElement } from '@/lib/types';
import { ResizeHandles } from './ResizeHandles';
import { AlignmentGuides } from './AlignmentGuides';
import { getElementBounds, calculateSnapping, SnapGuide, ElementBounds } from '@/lib/snapping';

interface CanvasStageProps {
  htmlContent: string;
  onSelect: (element: SelectedElement | null) => void;
  selectedElement: SelectedElement | null;
  onContentChange: (html: string) => void;
  stageRef: React.MutableRefObject<HTMLDivElement | null>;
}

const DEFAULT_HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Sample Poster</title>
<style>
body { margin: 0; padding: 0; }
.poster {
  width: 720px; height: 720px; position: relative;
  background: #f3f4f6; overflow: hidden; font-family: sans-serif;
}
.title {
  position: absolute; top: 80px; left: 40px;
  font-size: 48px; font-weight: bold; color: #111827;
}
.subtitle {
  position: absolute; top: 160px; left: 40px;
  font-size: 20px; color: #374151;
}
.hero {
  position: absolute; bottom: 0; right: 0; width: 380px; height: 380px;
  object-fit: cover; border-top-left-radius: 16px;
}
</style>
</head>
<body>
<div class="poster">
  <h1 class="title">Summer Sale</h1>
  <p class="subtitle">Up to <strong>50% off</strong> on select items!</p>
  <img class="hero"
    src="https://images.unsplash.com/photo-1520975922284-7bcd4290b0e1?q=80&w=1200&auto=format&fit=crop"
    alt="Model" />
</div>
</body>
</html>
`;

export function CanvasStage({ htmlContent, onSelect, selectedElement, onContentChange, stageRef: externalStageRef }: CanvasStageProps) {
  const localStageRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [elementStart, setElementStart] = useState({ x: 0, y: 0 });
  const [elementRect, setElementRect] = useState<DOMRect | null>(null);
  const [snapGuides, setSnapGuides] = useState<SnapGuide[]>([]);
  const [initialLoaded, setInitialLoaded] = useState(false);

  // ✅ Auto-load Summer Sale example on mount if no HTML
  useEffect(() => {
    if (!htmlContent && !initialLoaded) {
      onContentChange(DEFAULT_HTML);
      setInitialLoaded(true);
    }
  }, [htmlContent, initialLoaded, onContentChange]);

  useEffect(() => {
    if (localStageRef.current && htmlContent) {
      localStageRef.current.innerHTML = htmlContent;
      assignIdsToElements(localStageRef.current);
      externalStageRef.current = localStageRef.current;
    }
  }, [htmlContent]);

  useEffect(() => {
    if (selectedElement) {
      setElementRect(selectedElement.element.getBoundingClientRect());
    } else {
      setElementRect(null);
    }
  }, [selectedElement]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLElement;

    if (target === localStageRef.current) {
      onSelect(null);
      return;
    }

    let clickedElement = target;
    while (clickedElement && clickedElement.parentElement !== localStageRef.current) {
      clickedElement = clickedElement.parentElement as HTMLElement;
    }

    if (clickedElement && clickedElement !== localStageRef.current) {
      e.stopPropagation();

      const selection: SelectedElement = {
        id: clickedElement.id,
        element: clickedElement,
        tagName: clickedElement.tagName,
        isImage: isImageElement(clickedElement),
        isText: isTextElement(clickedElement),
      };
      onSelect(selection);

      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });

      const computedStyle = window.getComputedStyle(clickedElement);
      const currentLeft = parseInt(computedStyle.left) || 0;
      const currentTop = parseInt(computedStyle.top) || 0;

      setElementStart({ x: currentLeft, y: currentTop });

      if (computedStyle.position === 'static' || !clickedElement.style.position) {
        clickedElement.style.position = 'absolute';
        clickedElement.style.left = `${currentLeft}px`;
        clickedElement.style.top = `${currentTop}px`;
      }
    }
  }, [onSelect]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !selectedElement || !localStageRef.current) return;

    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;

    const newLeft = elementStart.x + deltaX;
    const newTop = elementStart.y + deltaY;

    const stageRect = localStageRef.current.getBoundingClientRect();
    const elementRect = selectedElement.element.getBoundingClientRect();

    const targetBounds: ElementBounds = {
      left: newLeft,
      top: newTop,
      right: newLeft + elementRect.width,
      bottom: newTop + elementRect.height,
      centerX: newLeft + elementRect.width / 2,
      centerY: newTop + elementRect.height / 2,
      width: elementRect.width,
      height: elementRect.height,
    };

    const otherElements: ElementBounds[] = [];
    if (localStageRef.current) {
      const children = Array.from(localStageRef.current.children) as HTMLElement[];
      children.forEach((child) => {
        if (child !== selectedElement.element && child.id) {
          otherElements.push(getElementBounds(child, stageRect));
        }
      });
    }

    const snapResult = calculateSnapping(targetBounds, otherElements, {
      width: stageRect.width,
      height: stageRect.height,
    });

    selectedElement.element.style.left = `${snapResult.x}px`;
    selectedElement.element.style.top = `${snapResult.y}px`;

    setSnapGuides(snapResult.guides);
  }, [isDragging, selectedElement, dragStart, elementStart]);

  const handleMouseUp = useCallback(() => {
    if (isDragging && localStageRef.current) {
      onContentChange(localStageRef.current.innerHTML);
    }
    setIsDragging(false);
    setSnapGuides([]);
  }, [isDragging, onContentChange]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Delete' && selectedElement) {
        selectedElement.element.remove();
        onSelect(null);
        if (localStageRef.current) {
          onContentChange(localStageRef.current.innerHTML);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedElement, onSelect, onContentChange]);

  const handleResize = useCallback((width: number, height: number) => {
    if (!selectedElement || !selectedElement.isImage) return;
    const img = selectedElement.element as HTMLImageElement;
    img.style.width = `${width}px`;
    img.style.height = `${height}px`;
    img.width = width;
    img.height = height;
    setElementRect(img.getBoundingClientRect());
  }, [selectedElement]);

  const handleResizeEnd = useCallback(() => {
    if (localStageRef.current) {
      onContentChange(localStageRef.current.innerHTML);
    }
  }, [onContentChange]);

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="flex items-center justify-center p-8 bg-gradient-to-br from-slate-50 to-slate-100 flex-1 overflow-auto">
        <div className="relative">
          <div
            ref={localStageRef}
            className="relative bg-white shadow-2xl cursor-pointer rounded-lg overflow-hidden border border-slate-200"
            style={{ width: '720px', height: '720px' }}
            onMouseDown={handleMouseDown}
          />
          {selectedElement && elementRect && selectedElement.isImage && localStageRef.current && (
            <ResizeHandles
              element={selectedElement.element}
              stageRef={localStageRef.current}
              onResize={handleResize}
              onResizeEnd={handleResizeEnd}
            />
          )}
          {localStageRef.current && snapGuides.length > 0 && (
            <div
              className="absolute pointer-events-none"
              style={{ top: 0, left: 0, width: '720px', height: '720px' }}
            >
              <AlignmentGuides guides={snapGuides} canvasWidth={720} canvasHeight={720} />
            </div>
          )}
        </div>
        {selectedElement && (
          <style jsx global>{`
            #${selectedElement.id} {
              outline: 2px solid #3b82f6 !important;
              outline-offset: 2px;
              box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1) !important;
            }
          `}</style>
        )}
      </div>
    </div>
  );
}
