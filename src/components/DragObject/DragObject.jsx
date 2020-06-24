import React from 'react'
import {DragPreviewImage, DragSource, useDrag} from 'react-dnd'
import ItemTypes from '../ItemTypes'

const style = {
  width: '20px',
  height: '20px',
  position: 'absolute',
  backgroundColor: '#b6bfff',
  padding: '10px',
  cursor: 'move',
  borderRadius: '50%',
  color: '#fff',
  fontWeight: 'bold',
  textAlign: 'center'
};

const DragObject = ({
  left,
  top,
  connectDragSource,
  isDragging,
  children,
  connectDragPreview
}) => {

  const emptyPixel = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
  return connectDragSource(
    <div>
      <DragPreviewImage connect={connectDragPreview} src={emptyPixel} />
      <div style={{ ...style, left, top, zIndex: isDragging ? '5' : '1' }}>
        {children}
      </div>
    </div>
  )
};

export default DragSource(
  ItemTypes.BOX,
  {
    beginDrag(props) {
      const { id, left, top } = props;
      return { id, left, top };
    }
  },
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  }),
)(DragObject)
