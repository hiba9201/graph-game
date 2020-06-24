import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import ItemTypes from '../ItemTypes';
import DragObject from '../DragObject/DragObject';
import update from 'immutability-helper';
import config from '../../config/config';
import Modal from "../Modal/Modal";

const styles = {
  width: 600,
  height: 600,
  border: '2px solid #c4c4c4',
  borderRadius: '10px',
  position: 'relative',
  margin: '100px auto',
  backgroundColor: "#f3f3f3"
};

function multiplyVectors(vector1, vector2) {
  return vector1.x * vector2.y - vector1.y * vector2.x;
}

function areVectorsCrossed(vector1, vector2, vector3, vector4) {
  const v1 = multiplyVectors({ x: vector4.left - vector3.left, y: vector4.top - vector3.top },
    { x: vector1.left - vector3.left, y: vector1.top - vector3.top });
  const v2 = multiplyVectors({ x: vector4.left - vector3.left, y: vector4.top - vector3.top },
    { x: vector2.left - vector3.left, y: vector2.top - vector3.top });
  const v3 = multiplyVectors({ x: vector2.left - vector1.left, y: vector2.top - vector1.top },
    { x: vector3.left - vector1.left, y: vector3.top - vector1.top });
  const v4 = multiplyVectors({ x: vector2.left - vector1.left, y: vector2.top - vector1.top },
    { x: vector4.left - vector1.left, y: vector4.top - vector1.top });

  return v1 * v2 < 0 && v3 * v4 < 0;
}

function Field({ connectDropTarget }) {
  const [ nodes, setNodes ] = useState(config.nodes);
  const [ edges, setEdges ] = useState(config.edges);
  const [ showModal, setShowModal ] = useState(false);

  const restartGame = () => {
    setNodes(config.nodes);
    setEdges(config.edges);
    setShowModal(false);
  };

  const moveNode = (id, left, top) => {
    setNodes(update(edges, {
      [id]: {
        $merge: { left, top },
      }
    }));
  };

  const [, drop] = useDrop({
    accept: ItemTypes.BOX,
    drop(props, monitor) {
      const checked = [];

      for (let line1 of edges) {
        for (let line2 of edges) {
          if (checked.includes(line2)) {
            continue;
          }

          if (areVectorsCrossed(edges[line1[0]], edges[line1[1]], edges[line2[0]], edges[line2[1]])) {
            if (showModal) {
              setShowModal(false);
            }

            return;
          }
        }

        checked.push(line1);
      }

      setShowModal(true);
    },
    hover(props, monitor) {
      const item = monitor.getItem();
      const delta = monitor.getDifferenceFromInitialOffset();
      let left = Math.round(item.left + delta.x);
      let top = Math.round(item.top + delta.y);
      if (top < 0) {
        top = 0;
      }
      if (top > 560) {
        top = 560;
      }
      if (left > 560) {
        left = 560;
      }
      if (left < 0) {
        left = 0;
      }
      moveNode(item.id, left, top);
    }
  });

  return connectDropTarget(
    <div>
      <Modal showModal={showModal} restartGame={restartGame} />

      <div ref={drop} style={styles}>
        <svg style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '600px',
          width: '600px'
        }}>
          {edges.map(([a, b]) => {
            return (
              <line x1={nodes[a].left + 20}
                    y1={nodes[a].top + 20}
                    x2={nodes[b].left + 20}
                    y2={nodes[b].top + 20}
                    style={{
                      stroke: '#C4CCF9',
                      strokeWidth: 5,
                      opacity: '0.8'
                    }}
              />
            );
          })}
        </svg>

        {Object.keys(nodes).map(key => {
          const { left, top } = nodes[key];

          return (
            <DragObject key={key} id={key} left={left} top={top}>
              {key}
            </DragObject>
          );
        })}
      </div>
    </div>
  );
}

export default Field;
