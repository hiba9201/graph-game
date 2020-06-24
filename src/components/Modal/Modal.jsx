import React from 'react';

import './Modal.css';

function Modal({ showModal, restartGame }) {
  return (
    <div className={`modal-background ${showModal && 'modal-background_show-modal'}`}>
      <div className="modal">
        <h2 className="modal__header">Вы выиграли!</h2>
        <button className="modal__button" onClick={restartGame}>
          Начать заново
        </button>
      </div>
    </div>
  );
}

export default Modal;