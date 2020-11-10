import React from 'react';
import { useMemo } from 'react';

const DropdownSelectBox = ({
  text,
  isResponsive = false,
  isDefault = false,
  li,
  p,
}) => {
  const optionalClassName = useMemo(
    () => `${isResponsive && 'responsive'} ${isDefault && 'default'}`,
    [isResponsive, isDefault]
  );

  return (
    <div className={`dropdown_lang ${optionalClassName}`}>
      <span className={`dropdown_text ${optionalClassName}`}>
        {text}
        <p>{p}</p>
      </span>
      <ul className={`dropdown_lang_select ${optionalClassName}`}>{li}</ul>
    </div>
  );
};

export default DropdownSelectBox;
