import React, { useState } from 'react';

const Modal = ({ id, isOpen, onClose, children }) => {
    const [isChecked, setIsChecked] = useState(isOpen);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };
  return (
    <>
   <input type="checkbox" id={id} className="modal-toggle" checked={isOpen} onChange={handleCheckboxChange} />
      <div className={`modal ${isOpen ? 'open' : ''}`}>
        <div className="modal-box max-w-[600px] contentScroll">
          <label className="modal-close" htmlFor={id} onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="16" height="16">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </label>
          {children}
        </div>
        <label className="modal-backdrop" htmlFor={id} onClick={onClose} />
      </div>
    </>
  );
};

export default Modal;
