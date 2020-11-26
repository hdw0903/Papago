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
  );
};

export default TranslateContainer;
