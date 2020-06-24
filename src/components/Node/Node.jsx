import React from 'react';
import { DragPreviewImage, useDrag } from 'react-dnd';

import ItemTypes from '../ItemTypes';

import './Node.css';


const Node = ({ id, left, top, children }) => {
  const [ { isDragging }, drag, preview ] = useDrag({
    item: { id, left, top, type: ItemTypes.BOX },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const emptyPixel = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

  return (
    <>
      <DragPreviewImage connect={preview} src={emptyPixel} />
      <div ref={drag} className="node" style={{ left, top, zIndex: isDragging ? '5' : '1' }}>
        {children}
      </div>
    </>
  )
};

export default Node;
