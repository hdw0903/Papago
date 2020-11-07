import React from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import PapagoAPI from './components/PapagoAPI';
import Header from './components/Header';
function App() {
  return (
    <>
      <Header />
      <PapagoAPI />

      {/* <div>
        한국어(ko)-영어(en) <br />
        한국어(ko)-일본어(ja), <br />
        한국어(ko)-중국어 간체(zh-CN),
        <br />
        한국어(ko)-중국어 번체(zh-TW),
        <br />
        한국어(ko)-스페인어(es),
        <br />
        한국어(ko)-프랑스어(fr),
        <br />
        한국어(ko)-러시아어(ru),
        <br />
        한국어(ko)-베트남어(vi),
        <br />
        한국어(ko)-태국어(th),
        <br />
        한국어(ko)-인도네시아어(id),
        <br />
        한국어(ko)-독일어(de),
        <br />
        한국어(ko)-이탈리아어(it),
        <br />
        중국어 간체(zh-CN) - 중국어 번체(zh-TW),
        <br />
        중국어 간체(zh-CN) - 일본어(ja),
        <br />
        중국어 번체(zh-TW) - 일본어(ja),
        <br />
        영어(en)-일본어(ja),
        <br />
        영어(en)-중국어 간체(zh-CN),
        <br />
        영어(en)-중국어 번체(zh-TW), <br />
        영어(en)-프랑스어(fr)를 지원합니다.
        <br />
      </div> */}
    </>
  );
}

export default App;
