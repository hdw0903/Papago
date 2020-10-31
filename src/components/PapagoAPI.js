import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import useDebounce from '../customhooks/Usedebounce';
import { papagoErrorCodes } from '../errorCodes';
import './PapagoAPI.css';
import CopyButton from './CopyButton';
import { useToastify, toastType } from '../customhooks/UseToastify';
import langsList from '../supportLanguages';
import TranslateContainer from './TranslateContainer';

const PapagoAPI = () => {
  const [inputValue, setInputValue] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [source, setSource] = useState('');
  const [target, setTarget] = useState('ko');
  const [debouncedValue, clearDebounce] = useDebounce(inputValue, 300);
  const [ToastContainer, toastNotify] = useToastify();

  const autoDetect = useMemo(() => {
    return async () => {
      try {
        const detect = await axios.post(
          '/v1/papago/detectLangs',
          { query: debouncedValue },
          {
            headers: {
              'X-Naver-Client-Id': process.env.REACT_APP_PAPAGO_CLIENT_ID,
              'X-Naver-Client-Secret':
                process.env.REACT_APP_PAPAGO_CLIENT_SECRET,
            },
          }
        );
        console.log('autoDetect langCode:', detect.data.langCode);

        let source, target;
        if (detect.data.langCode !== 'ko') {
          source = detect.data.langCode;
          target = 'ko';
        } else {
          source = 'ko';
          target = 'en';
        }

        return { source, target };
      } catch (e) {
        console.error(e);
      }
    };
  }, [debouncedValue]);
  const translate = useMemo(() => {
    return async (sourceTargetInfo) => {
      console.log('sourceTargetInfo', sourceTargetInfo);
      const currentSource = sourceTargetInfo ? sourceTargetInfo.source : source;
      const currentTarget = sourceTargetInfo ? sourceTargetInfo.target : target;
      console.log('currentSource:', currentSource);
      console.log('currentTarget:', target);
      try {
        const res = await axios.post(
          '/v1/papago/n2mt',
          {
            source: currentSource,
            target: currentTarget,
            text: debouncedValue,
          },
          {
            headers: {
              'X-Naver-Client-Id': process.env.REACT_APP_PAPAGO_CLIENT_ID,
              'X-Naver-Client-Secret':
                process.env.REACT_APP_PAPAGO_CLIENT_SECRET,
            },
          }
        );
        setTranslatedText(res.data.message.result.translatedText);
      } catch (e) {
        if (papagoErrorCodes.hasOwnProperty(e.response.data.errorCode)) {
          toastNotify(
            papagoErrorCodes[e.response.data.errorCode],
            toastType.ERROR
          );
        } else {
          toastNotify(e.response.data.errorMessage, toastType.ERROR);
          console.error(e.response);
        }
      }
    };
  }, [debouncedValue, source, target, toastNotify]);

  useEffect(() => {
    if (debouncedValue) {
      // IIFE
      if (!source) {
        (async () => {
          const sourceTargetInfo = await autoDetect();
          translate(sourceTargetInfo);
        })();
      } else {
        translate();
      }

      // console.log('sourceTargetInfo', sourceTargetInfo);

      // translate(sourceTargetInfo);
    } else {
      setTranslatedText('');
    }
  }, [debouncedValue, translate, autoDetect, source, target]);

  const search = () => {
    clearDebounce();
  };
  const onChangeInput = (e) => {
    console.log(e);
    setInputValue(e.target.value);
  };

  const onKeyPress = (e) => {
    console.log(e.charCode);
    if (e.charCode === 13) {
      search();
    }
  };

  // const onClickSource = (id) => {
  //   console.log('onClickSource:', id);
  //   setSource(id);
  //   // setDropDownTarget(langsList.id);
  // };

  // const onClickTarget = (id) => {
  //   console.log('onClickTarget:', id);
  //   setTarget(id);
  // };

  console.log('debouncedValue', debouncedValue);

  const { source: sources = [], target: targets = [] } = useMemo(() => {
    const getListElement = ({ id, title }, setState) => (
      <li key={id} onClick={() => setState(id)}>
        <p>{title}</p>
      </li>
    );
    return langsList.reduce(
      (acc, cur) => {
        acc.source.push(getListElement(cur, setSource));
        acc.target.push(getListElement(cur, setTarget));
        return acc;
      },
      {
        source: [],
        target: [],
      }
    );
  }, []);
  // const en = [
  //   { id: 'ko', title: '한국어' },
  //   { id: 'ja', title: '일본어' },
  //   { id: 'zh-CN', title: '중국어(간체)' },
  //   { id: 'zh-TW', title: '중국어(번체)' },
  //   { id: 'fr', title: '프랑스어' },
  // ];
  //   const [dropDownSource, setDropDownSource] = useState('');
  //   const [dropDownTarget, setDropDownTarget] = useState('');
  // useEffect(()=> {
  //   if(dropDownTarget)
  // })

  return (
    <>
      <div className="container">
        <div className="translate_lang">
          <div className="dropdown_position_responsive">
            <div className="dropdown_lang">
              <span className="dropdown_text">선택된 언어 : </span>
              <ul className="dropdown_lang_select">{sources}</ul>
            </div>
            <div className="dropdown_lang responsive">
              <span className="dropdown_text responsive"> 지정된 언어 :</span>
              <ul className="dropdown_lang_select responsive">{targets}</ul>
            </div>
          </div>
          <div className="translate_form">
            {/* <textarea
              className="translate_textarea"
              placeholder="번역할 텍스트"
              type="text"
              autoFocus
              value={inputValue}
              onChange={onChangeInput}
              onKeyPress={onKeyPress}
            /> */}
            <TranslateContainer
              className="translate_textarea"
              placeholder="번역할 텍스트"
              autoFocus={true}
              vale={inputValue}
              onChange={onChangeInput}
              onKeyPress={onKeyPress}
            />
            <div className="menu_button">
              <CopyButton text={inputValue} toastNotify={toastNotify} />
              <button onClick={search}>
                <img
                  className="button_img"
                  src={process.env.PUBLIC_URL + '/img/enter_icon.png'}
                  alt="번역 버튼"
                />
              </button>
            </div>
            <textarea
              className="translated_textarea responsive"
              placeholder="번역된 텍스트"
              value={translatedText}
              readOnly
            />
            <div className="menu_button responsive">
              <CopyButton text={translatedText} toastNotify={toastNotify} />
            </div>
          </div>
        </div>
        <div className="translated_lang default">
          <div className="dropdown_lang default">
            <span className="dropdown_text default"> 지정된 언어 :</span>
            <ul className="dropdown_lang_select default">{targets}</ul>
          </div>
          <textarea
            className="translated_textarea"
            placeholder="번역된 텍스트"
            value={translatedText}
            readOnly
          />
          <div className="menu_button">
            <CopyButton text={translatedText} toastNotify={toastNotify} />
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default PapagoAPI;
