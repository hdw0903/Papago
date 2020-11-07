import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import useDebounce from '../customhooks/Usedebounce';
import { papagoErrorCodes } from '../errorCodes';
import './PapagoAPI.css';
import ImgButton from './ImgButton';
import { useToastify, toastType } from '../customhooks/UseToastify';
import langsList from '../supportLanguages';
import Textarea from './Textarea';
import { useCallback } from 'react';
import DropdownSelectBox from './DropdownSelectBox';

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
      const currentSource = sourceTargetInfo ? sourceTargetInfo.source : source;
      const currentTarget = sourceTargetInfo ? sourceTargetInfo.target : target;
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
    setInputValue(e.target.value);
  };

  const onKeyPress = (e) => {
    if (e.charCode === 13) {
      search();
    }
  };
  const targetClick = (id, targets) => {
    setSource(id);
    console.log('아이디', id);
  };
  const [sourceElement, setSourceElement] = useState(langsList[0].targets);
  const getListElement = ({ id, title, targets }, setState) => (
    <li
      key={id}
      onClick={() => {
        setState(id);
        setSourceElement(targets);
      }}
    >
      <p>{title}</p>
    </li>
  );
  const { source: sources = [] } = useMemo(() => {
    return langsList.reduce(
      (acc, cur) => {
        acc.source.push(getListElement(cur, targetClick));
        return acc;
      },
      {
        source: [],
      }
    );
  }, []);
  const getTargetElement = sourceElement.map((item) => {
    console.log('타겟 아이템', item);
    return (
      <li
        key={item.id}
        onClick={() => {
          setTarget(item.id);
        }}
      >
        <p>{item.title}</p>
      </li>
    );
  });
  console.log(getTargetElement);
  const clipboardCopy = useCallback(
    (text) => {
      return () => {
        navigator.clipboard.writeText(text);
        toastNotify('🦄 복사되었습니다!');
      };
    },
    [toastNotify]
  );
  return (
    <>
      <div className="container">
        <div className="translate_lang">
          <div className="dropdown_position_responsive">
            <DropdownSelectBox text="선택된 언어" li={sources} />
            <DropdownSelectBox
              text="번역될 언어"
              isResponsive
              li={getTargetElement}
            />
          </div>
          <div className="translate_form">
            <Textarea
              className="translate_textarea"
              placeholder="번역할 텍스트"
              type="text"
              value={inputValue}
              onChange={onChangeInput}
              onKeyPress={onKeyPress}
              autoFocus
            />
            <div className="menu_button">
              <ImgButton
                onClick={clipboardCopy(inputValue)}
                className="button_img"
                src={process.env.PUBLIC_URL + '/img/copy_icon.png'}
                alt="복사 아이콘"
              />
              <ImgButton
                onClick={search}
                className="button_img"
                src={process.env.PUBLIC_URL + '/img/enter_icon.png'}
                alt="번역 버튼"
              />
            </div>
            <Textarea
              className="translated_textarea responsive"
              placeholder="번역된 텍스트"
              value={translatedText}
              readOnly
            />
            <div className="menu_button responsive">
              <ImgButton
                onClick={clipboardCopy(translatedText)}
                className="button_img"
                src={process.env.PUBLIC_URL + '/img/copy_icon.png'}
                alt="복사 아이콘"
              />
            </div>
          </div>
        </div>
        <div className="translated_lang default">
          <DropdownSelectBox text="번역될 언어" isDefault />
          <Textarea
            className="translated_textarea"
            placeholder="번역된 텍스트"
            value={translatedText}
            readOnly
          />
          <div className="menu_button">
            <ImgButton
              onClick={clipboardCopy(translatedText)}
              className="button_img"
              src={process.env.PUBLIC_URL + '/img/copy_icon.png'}
              alt="복사 아이콘"
            />
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default PapagoAPI;
