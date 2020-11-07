import React from 'react';

const TranslateContainer = ({
  className,
  placeholder,
  value,
  autoFocus = false,
  onChange,
  onKeyPress,
  readOnly = false,
  type,
}) => {
  //   const onChangeInput = (e) => {
  //     console.log(e);
  //     setInputValue(e.target.value);
  //   };
  //   const search = () => {2
  //     clearDebounce();
  //   };
  return (
    <textarea
      className={className}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
      onKeyPress={onKeyPress}
      autoFocus={autoFocus}
      readOnly={readOnly}
    />
    /* <div className="menu_button">
        <CopyButton text={inputValue} toastNotify={toastNotify} />
        <button onClick={search}>
          <img
            className="button_img"
            src={process.env.PUBLIC_URL + '/img/enter_icon.png'}
            alt="번역 버튼"
          />
        </button>
      </div> */
  );
};

export default TranslateContainer;
