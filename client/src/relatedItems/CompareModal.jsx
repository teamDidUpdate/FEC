import React from 'react';
import ReactDom from 'react-dom';

const CompareModal = ({ open, children, onClose }) => {
  if (!open) {
    return null;
  }

  return ReactDom.createPortal(
    <>
      <div class='overlay'/>
      <div class='compare-modal'>
        <button onClick={onClose}>Make Coffee</button>
        {children}
      </div>
    </>,
    document.getElementById('portal')
  );
};

export default CompareModal;