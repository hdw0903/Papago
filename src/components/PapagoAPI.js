import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Axios from 'axios';
import useDebounce from '../customhooks/Usedebounce';
import { papagoErrorCodes } from '../error/errorCodes';
import './PapagoAPI.css';
import ImgButton from './ImgButton';
import { useToastify, toastType } from '../customhooks/UseToastify';
import langsList from '../data/supportLanguages';
import Textarea from './Textarea';
import DropdownSelectBox from './DropdownSelectBox';
import url from '../data/apiUrl';

const errorHandler = (e) => {
  if (papagoErrorCodes.hasOwnProperty(e.response.data.errorCode)) {
    return {
      message: papagoErrorCodes[e.response.data.errorCode],
      type: toastType.ERROR,
    };
  } else {
    console.error('콘솔 에러코드', e.response);
    return { message: e.response.data.errorMessage, type: toastType.ERROR };
  }
};

const PapagoAPI = () => {
  const [inputValue, setInputValue] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [source, setSource] = useState('');
  const [target, setTarget] = useState('ko');
  const [targetElement, setTargetElement] = useState(langsList[0].targets);
  const [selectLangTitle, setSelectLangTitle] = useState('언어 감지');
  const [targetLangTitle, setTargetLangTitle] = useState('언어 감지');
  const [debouncedValue, clearDebounce] = useDebounce(inputValue, 500);
  const [ToastContainer, toastNotify] = useToastify();
  const [errorObject, setErrorObject] = useState(undefined);
  useEffect(() => {
    if (errorObject) {
      toastNotify(errorObject.message, errorObject.type);
      setErrorObject(undefined);
    }
  }, [errorObject, toastNotify]);

  const axios = (url, data) => {
    return Axios({
      method: 'post',
      url,
      data,
    });
  };

  const autoDetect = useMemo(() => {
    return async () => {
      try {
        const detect = await axios(url.detectURL, { data: debouncedValue });
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
        setErrorObject(errorHandler(e));
      }
    };
  }, [debouncedValue]);

  const translate = useMemo(() => {
    return async (sourceTargetInfo) => {
      const currentSource = sourceTargetInfo ? sourceTargetInfo.source : source;
      const currentTarget = sourceTargetInfo ? sourceTargetInfo.target : target;
      try {
        const res = await axios(url.translateURL, {
          source: currentSource,
          target: currentTarget,
          text: debouncedValue,
        });
        setTranslatedText(res.data);
      } catch (e) {
        setErrorObject(errorHandler(e));
      }
    };
  }, [debouncedValue, source, target]);

  useEffect(() => {
    if (debouncedValue) {
      if (!source) {
        (async () => {
          const sourceTargetInfo = await autoDetect();
          translate(sourceTargetInfo);
        })();
      } else {
        translate();
      }
    } else {
      setTranslatedText('');
    }
  }, [debouncedValue, source, target, autoDetect, translate]);

  const onChangeInput = (e) => {
    setInputValue(e.target.value);
  };

  const search = () => {
    clearDebounce();
  };

  const { source: sources = [] } = useMemo(() => {
    const getListElement = ({ id, title, targets }, setState) => (
      <li
        key={id}
        onClick={() => {
          setState(id);
          setTargetElement(targets);
          setSelectLangTitle(title);
        }}
      >
        <p>{title}</p>
      </li>
    );
    return langsList.reduce(
      (acc, cur) => {
        acc.source.push(getListElement(cur, setSource));
        return acc;
      },
      {
        source: [],
      }
    );
  }, []);

  const getTargetElement = useCallback(
    targetElement.map((target) => {
      return (
        <li
          key={target.id}
          onClick={() => {
            setTarget(target.id);
            setTargetLangTitle(target.title);
          }}
        >
          <p>{target.title}</p>
        </li>
      );
    }),
    [targetElement]
  );

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
            <DropdownSelectBox
              text="선택된 언어 : "
              p={selectLangTitle}
              li={sources}
            />
            <DropdownSelectBox
              text="번역될 언어 : "
              p={targetLangTitle}
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
          <DropdownSelectBox
            text="번역될 언어 : "
            p={targetLangTitle}
            isDefault
            li={getTargetElement}
          />
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

export default React.memo(PapagoAPI);
