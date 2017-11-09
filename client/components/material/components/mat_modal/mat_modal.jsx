import React from 'react';

const MatModal = ({ children, isOpen, className, overlayClassName }) => {
  className = className ? className + ' mat-modal' : 'mat-modal';
  if (isOpen) { className += ' open'; }

  overlayClassName = overlayClassName ? overlayClassName + ' mat-modal-overlay' : 'mat-modal-overlay';
  if (isOpen) { overlayClassName += ' open'; }

  return (
    <div className={overlayClassName}>
      <div className={className}>
        {children}
      </div>
    </div>
  );
};

export default MatModal;
