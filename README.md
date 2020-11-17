# Papago translate app

![네이버 Papago API를 이용한 번역 웹 사이트](public/img/intro_img.png)

------

## Development

> npm start

------

## Description

* 기본적으로 언어 감지기능을 적용하여 한국어 입력시 영어로,
그외의 언어는 한국어로 변역되게 되어있습니다.
원한다면 다른 언어를 선택하여 번역할 수 있습니다.

* Papago 오픈 API를 사용했으며 하루 10000쿼리량만 번역할 수 있습니다.

* react-toastify를 사용하여 토스트를 사용해봤습니다.

* 웹 호스팅은 Github 무료 호스팅 서비스인 gh-pages를 사용했습니다.

* API KEY 값들은 .env 로 gitignore 처리 후 git secrets에 따로 저장해 줬습니다.

-------

### Skill

*  React { useState, useEffect, useMemo, useCallback }

*  Node.js { express, nodemonm, cors, dotenv }
 
*  Postman

*  Axios

*  CustomHooks 
    * UseDebounce
    * UseToastify

*  CustomComponent
    * TextArea
    * ImgButton
    * DropdownSelectBox  

* Dynamic Dropdown

* Responsive Wep Design

------

### SupportLanguages

|     * 한국어(ko) ->     	|                      	|                      	|                      	|                      	|
|:-----------------------:	|:--------------------:	|:--------------------:	|:--------------------:	|:--------------------:	|
|                         	|      - 영어(en)      	| - 중국어 번체(zh-TW) 	|    - 러시아어(ru),   	|  - 인도네시아어(id)  	|
|                         	|     - 일본어(ja)     	|    - 스페인어(es),   	|    - 베트남어(vi),   	|     - 독일어(de)     	|
|                         	| - 중국어 간체(zh-CN) 	|    - 프랑스어(fr),   	|     - 태국어(th)     	|   - 이탈리아어(it)   	|
|      * 영어(en) ->      	|                      	|                      	|                      	|                      	|
|                         	|     - 한국어(ko)     	| - 중국어 간체(zh-CN) 	| - 중국어 번체(zh-TW) 	|    - 프랑스어(fr)    	|
|                         	|     - 일본어(ja)     	|    - 베트남어(vi)    	|     - 태국어(th)     	|                      	|
|     * 일본어(ja) ->     	|                      	|                      	|                      	|                      	|
|                         	|      - 한국(ko)      	|      - 영어(en)      	| - 중국어 간체(zh-CN) 	| - 중국어 번체(zh-TW) 	|
| * 중국어 간체(zh-CN) -> 	|                      	|                      	|                      	|                      	|
|                         	|     - 한국어(ko)     	|      - 영어(en)      	| - 중국어 번체(zh-TW) 	|     - 일본어(ja)     	|
| * 중국어 번체(zh-TW) -> 	|                      	|                      	|                      	|                      	|
|                         	|     - 한국어(ko)     	|      - 영어(en)      	| - 중국어 간체(zh-TW) 	|     - 일본어(ja)     	|
|    * 스페인어(es) ->    	|                      	|                      	|                      	|                      	|
|                         	|     - 한국어(ko)     	|      - 영어(en)      	|                      	|                      	|
|    * 프랑스어(fr) ->    	|                      	|                      	|                      	|                      	|
|                         	|     - 한국어(ko)     	|      - 영어(en)      	|                      	|                      	|
|    * 러시아어(ru) ->    	|                      	|                      	|                      	|                      	|
|                         	|     - 한국어(ko)     	|                      	|                      	|                      	|
|    * 베트남어(vi) ->    	|                      	|                      	|                      	|                      	|
|                         	|     - 한국어(ko)     	|      - 영어(en)      	|                      	|                      	|
|     * 태국어(th) ->     	|                      	|                      	|                      	|                      	|
|                         	|     - 한국어(ko)     	|      - 영어(en)      	|                      	|                      	|
|  * 인도네시아어(id) ->  	|                      	|                      	|                      	|                      	|
|                         	|     - 한국어(ko)     	|                      	|                      	|                      	|
|      * 독일(de) ->      	|                      	|                      	|                      	|                      	|
|                         	|     - 한국어(ko)     	|                      	|                      	|                      	|
|   * 이탈리아어(it) ->   	|                      	|                      	|                      	|                      	|
|                         	|     - 한국어(ko)     	|                      	|                      	|                      	|