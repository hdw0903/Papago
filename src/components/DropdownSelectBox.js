import React, { useState, useEffect, useMemo } from 'react';

const DropdownSelectBox = ({
  text,
  isResponsive = false,
  isDefault = false,
  li,
  p,
}) => {
  const [dropdownState, setDropdownState] = useState(false);
  const optionalClassName = useMemo(
    () => `${isResponsive && 'responsive'} ${isDefault && 'default'}`,
    [isResponsive, isDefault]
  );
  const spanClick = () => {
    setDropdownState(!dropdownState);
  };
  const bodyClick = (e) => {
    const target = e.target.className;
    const ExclusionTarget =
      target.includes('dropdown_text') || target.includes('selectedLang');
    if (!ExclusionTarget) {
      setDropdownState(false);
    }
  };
  useEffect(() => {
    document.body.addEventListener('click', bodyClick);
    return () => {
      document.body.removeEventListener('click', bodyClick);
    };
  }, []);
  return (
    <div className={`dropdown_lang ${optionalClassName}`}>
      <span
        className={`dropdown_text ${optionalClassName}`}
        onClick={spanClick}
      >
        {text}
        <p className="selectedLang">{p}</p>
      </span>
      <ul
        className={`dropdown_lang_select ${optionalClassName} 
          ${dropdownState && 'dropdown_clicked'}`}
      >
        {li}
      </ul>
    </div>
  );
};

export default React.memo(DropdownSelectBox);
