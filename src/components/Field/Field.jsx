import React from 'react';
import { DropTarget } from 'react-dnd';
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

class Field extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      boxes: config.nodes,
      lines: config.edges,
      showModal: false
    };

    this.state = this.initialState;
  }

  restartGame = () => {
    this.setState(this.initialState);
  };

  multifyVectors(vector1, vector2) {
    return vector1.x * vector2.y - vector1.y * vector2.x;
  }

  areVectorsCrossed(vector1, vector2, vector3, vector4) {
    const v1 = this.multifyVectors({ x: vector4.left - vector3.left, y: vector4.top - vector3.top },
      { x: vector1.left - vector3.left, y: vector1.top - vector3.top });
    const v2 = this.multifyVectors({ x: vector4.left - vector3.left, y: vector4.top - vector3.top },
      { x: vector2.left - vector3.left, y: vector2.top - vector3.top });
    const v3 = this.multifyVectors({ x: vector2.left - vector1.left, y: vector2.top - vector1.top },
      { x: vector3.left - vector1.left, y: vector3.top - vector1.top });
    const v4 = this.multifyVectors({ x: vector2.left - vector1.left, y: vector2.top - vector1.top },
      { x: vector4.left - vector1.left, y: vector4.top - vector1.top });

    return v1 * v2 < 0 && v3 * v4 < 0;
  }

  render() {
    const { connectDropTarget } = this.props;
    const { boxes, lines } = this.state;

    return connectDropTarget(
      <div>
        <Modal showModal={this.state.showModal} restartGame={this.restartGame} />

        <div style={styles}>
          <svg style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '600px',
            width: '600px'
          }}>
            {lines.map(([a, b]) => {
              return (
                <line x1={boxes[a].left + 20}
                      y1={boxes[a].top + 20}
                      x2={boxes[b].left + 20}
                      y2={boxes[b].top + 20}
                      style={{
                        stroke: '#C4CCF9',
                        strokeWidth: 5,
                        opacity: '0.8'
                      }}
                />
              );
            })}
          </svg>

          {Object.keys(boxes).map(key => {
            const { left, top } = boxes[key];

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

  moveBox(id, left, top) {
    this.setState(
      update(this.state, {
        boxes: {
          [id]: {
            $merge: { left, top },
          },
        },
      }),
    );
  }
}

export default DropTarget(
  ItemTypes.BOX,
  {
    drop(props, monitor, component) {
      const { lines, boxes } = component.state;
      const checked = [];

      for (let line1 of lines) {
        for (let line2 of lines) {
          if (checked.includes(line2)) {
            continue;
          }

          if (component.areVectorsCrossed(boxes[line1[0]], boxes[line1[1]], boxes[line2[0]], boxes[line2[1]])) {

            if (component.state.showModal) {
              component.setState({...component.state, showModal: false});
            }
            return
          }
        }

        checked.push(line1);
      }

      component.setState({...component.state, showModal: true});
    },
    hover(props, monitor, component) {
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
      component.moveBox(item.id, left, top);
    }
  },
  connect => ({
    connectDropTarget: connect.dropTarget(),
  }),
)(Field)
