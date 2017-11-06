import React from 'react';

const MatModal = ({ children, isOpen, className }) => {
  className = className ? className + ' mat-modal' : 'mat-modal';
  if (isOpen) { className += ' open'; }

  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default MatModal;
