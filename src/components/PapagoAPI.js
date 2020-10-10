import React, { useState } from 'react';
import axios from 'axios';

const PapagoAPI = () => {
  const [value, setValue] = useState('');
  // const data = {
  //   source: 'en',
  //   target: 'ko',
  //   text: value,
  // };
  // const headers = {
  //   'Access-Control-Allow-Origin': '*',
  //   'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
  //   Accept: '*/*',
  //   'X-Naver-Client-Id': process.env.REACT_APP_PAPAGO_CLIENT_ID,
  //   'X-Naver-Client-Secret': process.env.REACT_APP_PAPAGO_CLIENT_SECRET,
  // };
  // const getPost = async () => {
  //   try {
  //     await axios.post('http://openapi.naver.com/v1/papago/n2mt', data, {
  //       headers: headers,
  //     });
  //   } catch {
  //     console.error();
  //   }
  // };
  // getPost();
  const getPost = async () => {
    try {
      await axios({
        method: 'POST',
        url: 'https://openapi.naver.com/v1/papago/n2mt',
        // 'https://openapi.naver.com/v1/papago/n2mt',
        // https://naveropenapi.apigw.ntruss.com/nmt/v1/translation
        // https://papago.naver.com/apis/nsmt/translate
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-type': 'application/json; charset=UTF-8',
          // 'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
          Accept: '*/*',
          // 'X-Naver-Client-Id': process.env.REACT_APP_PAPAGO_CLIENT_ID,
          // 'X-Naver-Client-Secret': process.env.REACT_APP_PAPAGO_CLIENT_SECRET,
          'X-Naver-Client-Id': 'teiUxfbKlk3VkZmDdelI',
          'X-Naver-Client-Secret': '0ylDP76Hzz',
        },
        data: { source: 'en', target: 'ko', text: value },
      });
    } catch {
      console.error();
    }
  };
  getPost();
  const onSubmit = (e) => {
    e.preventDefault();
  };
  const onChangeInput = (e) => {
    setValue(e.target.value);
  };
  return (
    <div>
      <form className="translate-form" onSubmit={onSubmit}>
        <input
          placeholder="번역할 텍스트"
          type="text"
          autoFocus
          value={value}
          onChange={onChangeInput}
        />
        <button>번역</button>
      </form>
      <div className="translated">번역된 텍스트 </div>
    </div>
  );
};

export default PapagoAPI;
