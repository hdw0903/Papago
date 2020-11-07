import React from 'react';

const CopyButton = ({ className, onClick, src, alt }) => {
  return (
    <button onClick={onClick}>
      <img className={className} src={src} alt={alt} />
    </button>
  );
};

export default CopyButton;
