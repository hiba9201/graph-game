import React from 'react';

function Modal(props) {
  const { showModal, restartGame } = props;

  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: showModal ? 'block' : 'none',
      position: 'fixed',
      zIndex: 10,
      top: 0,
      left: 0,
    }}>
      <div style={{
        margin: '200px auto',
        width: 'max-content',
        padding: '40px 50px',
        backgroundColor: '#fff',
        textAlign: 'center'
      }}>
        <h2>Вы выиграли!</h2>
        <button style={{
          borderRadius: 0,
          padding: '10px 20px',
          backgroundColor: '#F0F0F0',
          fontSize: '18px'
        }} onClick={restartGame}>Начать заново</button>
      </div>
    </div>
  );
}

export default Modal;