import React from 'react';

const ImgButton = ({ className, onClick, src, alt }) => {
  return (
    <button onClick={onClick}>
      <img className={className} src={src} alt={alt} />
    </button>
  );
};

export default React.memo(ImgButton);
