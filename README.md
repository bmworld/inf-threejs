# INFLEARN LECTURE


### TITLE: three.js로 시작하는 3D 인터랙티브 웹

### INFO


```text
* Tutor: 1분코딩

* URL
  - https://www.inflearn.com/course/3d-%EC%9D%B8%ED%84%B0%EB%9E%99%ED%8B%B0%EB%B8%8C-%EC%9B%B9/dashboard
  - 강사님 웹사이트 https://studiomeal.com

* 원본강의 소스: /orgn_src 
  - 유료강의의 저작권을 보호하기 위하여 원본소스는 비공개 처리
  
```


<br/>


---
### Curriculum

```text
< INFO > 

lec01: three.js 시작하기

lec02: three.js의 기본 요소 익히기

lec03: 개발을 편리하게 해주는 도구들

lec04: Transform(변환)

lec05: Geometry(모양)

lec06: 카메라 컨트롤

lec07: Material(재질)

lec08: Light(조명)

lec09: Raycaster(클릭 감지)

lec10: 3D 캐릭터 모델을 만들고 three.js에서 활용하기

lec11: 물리엔진 다루기

lec12: Particle(파티클)

lec13: 예제 - 스크롤 기반의 3D 랜딩 페이지

lec14: 예제 - 징검다리 게임

lec15: 예제 - 여러 개의 Scene 동시에 사용하기

lec16: 예제 - 3D 공간에서 움직이는 캐릭터 ("춘식이 관찰일기" 같은 동작 구현)

```


<br/>



### 강의 진행 방법

```text

1. 패키지 설치
터미널에 아래 점선 사이의 내용을 붙여 넣고 엔터를 누르세요.
----------
npm i -D @babel/cli @babel/core @babel/preset-env babel-loader clean-webpack-plugin copy-webpack-plugin core-js cross-env html-webpack-plugin source-map-loader terser-webpack-plugin webpack webpack-cli webpack-dev-server
----------

2. 개발용 서버 구동
터미널에 아래 점선 사이의 내용을 붙여 넣고 엔터를 누르세요.
----------
npm start
----------

3. 빌드(배포용 파일 생성)
터미널에 아래 점선 사이의 내용을 붙여 넣고 엔터를 누르세요.
----------
npm run build
----------

(!)
npm start 또는 npm run build 실행 시 에러가 난다면 Node.js를 LTS 버전(장기 지원 버전)으로 설치 후 다시 시도해 보세요.
터미널에 아래 점선 사이의 내용을 붙여 넣고 엔터를 누르면 설치할 수 있어요.
----------
n lts
----------

(!)
ERROR in unable to locate '경로...'
위와 같은 에러가 발생한다면, webpack.config.js의 CopyWebpackPlugin에 설정된 파일이 있는지 확인해주세요.
CSS나 이미지 폴더 등이 필요하지 않다면 webpack.config.js에서 CopyWebpackPlugin 부분 전체를 주석 처리 해주세요.
```
