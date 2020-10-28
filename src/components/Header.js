import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <>
      <div id="header">
        <img
          src={process.env.PUBLIC_URL + '/img/header_img.png'}
          alt="헤더 이미지"
        />
        <p>네이버 파파고API를 이용해 만든 번역 웹입니다.</p>
      </div>
    </>
  );
};

export default Header;
