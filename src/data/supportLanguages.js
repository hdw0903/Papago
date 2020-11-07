export const langCodes = {
  NONE: { id: '', title: '언어 감지' },
  KOREAN: { id: 'ko', title: '한국어' },
  ENGLISH: { id: 'en', title: '영어' },
  JAPANESE: { id: 'ja', title: '일본어' },
  CHINESE: { id: 'zh-CH', title: '중국어 간체' },
  CHINESE_TW: { id: 'zh-TW', title: '중국어 번체' },
  SPANISH: { id: 'es', title: '스페인어' },
  FRENCH: { id: 'fr', title: '프랑스어' },
  RUSSIAN: { id: 'ru', title: '러시아어' },
  VIETNAMESE: { id: 'vi', title: '베트남어' },
  THAI: { id: 'ti', title: '태국어' },
  INDONESIAN: { id: 'id', title: '인도네시아어' },
  GERMAN: { id: 'de', title: '독일어' },
  ITALIAN: { id: 'it', title: '이탈리아어' },
};

const getTargets = (excludeList = []) => {
  return Object.values(langCodes).filter((langCode) => {
    return (
      langCode.id !== langCodes.NONE.id &&
      !excludeList.some((excludeItem) => excludeItem.id === langCode.id)
    );
  });
};

/**
 * 변수 이름 규칙 -> 암묵적으로
 * class 이름은 무조건 대문자로 시작 : class Car {}
 * 일반적인 값(string, number)들 : 명사로 -> 복수, 단수. (list: 복수, item: 단수)
 * 함수 : 동사 + 명사 : get+N , create+N, V (search) -> searchNames
 * boolean: is || can -> isDefault
 */
export default [
  {
    ...langCodes.NONE,
    targets: getTargets(),
  },
  {
    ...langCodes.KOREAN,
    targets: getTargets(),
  },
  {
    ...langCodes.ENGLISH,
    targets: getTargets([
      langCodes.SPANISH,
      langCodes.RUSSIAN,
      langCodes.INDONESIAN,
      langCodes.GERMAN,
      langCodes.ITALIAN,
    ]),
  },
  {
    ...langCodes.JAPANESE,
    targets: [
      langCodes.KOREAN,
      langCodes.ENGLISH,
      langCodes.CHINESE,
      langCodes.CHINESE_TW,
    ],
  },
  {
    ...langCodes.CHINESE,
    targets: [
      langCodes.KOREAN,
      langCodes.ENGLISH,
      langCodes.JAPANESE,
      langCodes.CHINESE_TW,
    ],
  },
  {
    ...langCodes.CHINESE_TW,
    targets: [
      langCodes.KOREAN,
      langCodes.ENGLISH,
      langCodes.JAPANESE,
      langCodes.CHINESE,
    ],
  },
  {
    ...langCodes.SPANISH,
    targets: [langCodes.KOREAN],
  },
  {
    ...langCodes.FRENCH,
    targets: [langCodes.KOREAN, langCodes.ENGLISH],
  },
  { ...langCodes.RUSSIAN, targets: [langCodes.KOREAN] },
  {
    ...langCodes.VIETNAMESE,
    targets: [langCodes.KOREAN, langCodes.ENGLISH],
  },
  {
    ...langCodes.THAI,
    targets: [langCodes.KOREAN, langCodes.ENGLISH],
  },
  {
    ...langCodes.INDONESIAN,
    targets: [langCodes.KOREAN],
  },
  {
    ...langCodes.GERMAN,
    targets: [langCodes.KOREAN],
  },
  {
    ...langCodes.ITALIAN,
    targets: [langCodes.KOREAN],
  },
];
//canTarget: ['ko', 'en','ja','zh-CN','zh-TW','ex','fr','ru','vi','th','id','de',''it]
/*  en = [
     {id: 'ko', title: "한국어"},
     {id: 'ja', title: "일본어"},
     {id: 'zh-CN', title: "중국어(간체)"},
     {id: 'zh-TW', title: "중국어 번체"},
     {id: 'fr', title: "프랑스어"},
     {id: 'vi', title: "베트남어"},
     {id: 'th', title: "태국어"},
]
  ja = [
    { id: 'ko', title: '한국어' },
  { id: 'en', title: '영어' },
  { id: 'zh-CN', title: '중국어(간체)' },
  { id: 'zh-TW', title: '중국어(번체)' },
 ]
  zh-Ch = [
     {id: 'ko', title:"한국어"},
  { id: 'en', title: '영어' },

     {id: 'ja', title: "일본어"},
     {id: 'zh-TW', title: "중국어(번체)"},
 ]
  zh-TW = [
       { id: 'ko', title: '한국어' },
  { id: 'en', title: '영어' },
  { id: 'ja', title: '일본어' },
  { id: 'zh-CN', title: '중국어(간체)' },
 ]
  es = [
       { id: 'ko', title: '한국어' },
  { id: 'en', title: '영어' },
  ]
   
   fr= [{ id: 'ko', title: '한국어' },
  { id: 'en', title: '영어' },]
  ru =[
      {id:'ko', title: '한국어'}
  ]
   vi= [{ id: 'ko', title: '한국어' },
  { id: 'en', title: '영어' },]
   th= [{ id: 'ko', title: '한국어' },
  { id: 'en', title: '영어' },]
   id= [{ id: 'ko', title: '한국어' },
  ]
   de= [{ id: 'ko', title: '한국어' }]
   it= [{ id: 'ko', title: '한국어' }]

*/
