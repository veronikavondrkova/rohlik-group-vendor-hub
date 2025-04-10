
import React, { useState, useEffect, ReactNode } from 'react';

interface Position {
  x: number;
  y: number;
}

interface DraggableProps {
  children: ReactNode;
  position: Position;
  onDrag: (position: Position) => void;
  bounds?: string | HTMLElement;
}

const Draggable: React.FC<DraggableProps> = ({ 
  children, 
  position, 
  onDrag, 
  bounds = 'parent' 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [initialOffset, setInitialOffset] = useState({ x: 0, y: 0 });
  const [parentBounds, setParentBounds] = useState({ 
    left: 0, right: 0, top: 0, bottom: 0 
  });
  
  const dragRef = React.useRef<HTMLDivElement>(null);
  
  // Set initial bounds on mount
  useEffect(() => {
    if (dragRef.current && bounds === 'parent' && dragRef.current.parentElement) {
      const parentRect = dragRef.current.parentElement.getBoundingClientRect();
      
      // Extend the bounds significantly to allow more movement
      setParentBounds({
        left: -parentRect.width * 2,
        top: -parentRect.height * 2,
        right: parentRect.width * 3,
        bottom: parentRect.height * 3
      });
    }
  }, [bounds, children]);
  
  const handleMouseDown = (e: React.MouseEvent) => {
    if (dragRef.current) {
      e.preventDefault();
      setIsDragging(true);
      
      const rect = dragRef.current.getBoundingClientRect();
      setInitialOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };
  
  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && dragRef.current) {
      e.preventDefault();
      
      const parentRect = dragRef.current.parentElement?.getBoundingClientRect();
      if (!parentRect) return;
      
      let newX = e.clientX - parentRect.left - initialOffset.x;
      let newY = e.clientY - parentRect.top - initialOffset.y;
      
      // Apply very relaxed bounds to allow more movement
      newX = Math.max(parentBounds.left, Math.min(newX, parentBounds.right));
      newY = Math.max(parentBounds.top, Math.min(newY, parentBounds.bottom));
      
      onDrag({ x: newX, y: newY });
    }
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, initialOffset, parentBounds]);
  
  return (
    <div
      ref={dragRef}
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: isDragging ? 'grabbing' : 'grab',
        zIndex: isDragging ? 1000 : 1,
        userSelect: 'none'
      }}
      onMouseDown={handleMouseDown}
    >
      {children}
    </div>
  );
};

export default Draggable;
