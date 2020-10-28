import React from 'react';

const CopyButton = ({ text, toastNotify }) => {
  const clipboardCopy = () => {
    navigator.clipboard.writeText(text);
    console.log('Clipboard.writeText:', navigator.clipboard.writeText(text));
    toastNotify('🦄 복사되었습니다!');
  };
  return (
    <button onClick={clipboardCopy}>
      <img
        className="button_img"
        src={process.env.PUBLIC_URL + '/img/copy_icon.png'}
        alt="복사 아이콘"
      />
    </button>
  );
};

export default CopyButton;
