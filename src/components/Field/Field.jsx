import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import update from 'immutability-helper';

import ItemTypes from '../ItemTypes';
import Node from '../Node/Node';
import config from '../../config/config';
import Modal from "../Modal/Modal";

import './Field.css';
import Header from "../Header/Header";


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

function Field() {
  const [ nodes, setNodes ] = useState(config.nodes);
  const [ edges, setEdges ] = useState(config.edges);
  const [ showModal, setShowModal ] = useState(false);

  const restartGame = () => {
    setNodes(config.nodes);
    setEdges(config.edges);
    setShowModal(false);
  };

  const moveNode = (id, left, top) => {
    setNodes(
      update(nodes, {
        [id]: {
          $merge: { left, top },
        }
      })
    );
  };

  const [, drop] = useDrop({
    accept: ItemTypes.BOX,
    drop(item, monitor) {
      const checked = [];

      for (let firstEdge of edges) {
        for (let secondEdge of edges) {
          if (checked.includes(secondEdge)) {
            continue;
          }

          if (areVectorsCrossed(nodes[firstEdge[0]], nodes[firstEdge[1]], nodes[secondEdge[0]], nodes[secondEdge[1]])) {
            if (showModal) {
              setShowModal(false);
            }

            return;
          }
        }

        checked.push(firstEdge);
      }

      setShowModal(true);
    },
    hover(item, monitor) {
      const delta = monitor.getDifferenceFromInitialOffset();
      let left = Math.round(item.left + delta.x);
      let top = Math.round(item.top + delta.y);

      if (top < 0) {
        top = 0;
      }
      if (top > 510) {
        top = 510;
      }
      if (left > 510) {
        left = 510;
      }
      if (left < 0) {
        left = 0;
      }

      moveNode(item.id, left, top);
    }
  });

  return (
    <div ref={drop} className="drag-area">
      <Header />
      <Modal showModal={showModal} restartGame={restartGame} />

      <div className="field">
        <svg className="svg-field">
          {edges.map(([a, b]) => {
            return (
              <line x1={nodes[a].left + 20}
                    y1={nodes[a].top + 20}
                    x2={nodes[b].left + 20}
                    y2={nodes[b].top + 20}
                    className="edge"
              />
            );
          })}
        </svg>

        {Object.keys(nodes).map(key => {
          const { left, top } = nodes[key];

          return (
            <Node key={key} id={key} left={left} top={top}>
              {key}
            </Node>
          );
        })}
      </div>
    </div>
  );
}

export default Field;
