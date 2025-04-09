# OnD

온디는 쉽고 간편한 검색과 다양한 추천 서비스를 제공하는 OTT 정보 플랫폼 브랜드입니다.

## OnDe-FE

저희는 해당 서비스의 프론트엔드를 개발하고 있습니다.


<!-- 최종적으로 레이아웃이 완성되면 동작화면을 영상으로 업로드할 예정입니다.  -->

## 개발 환경

* **Framewrok** : Node.js(>=18.18.0), Next.js 14(App Router)
* **Language** : TypeScript
* **상세기술스택** : 
  * 상태 관리: Zustand, React useState
  * 데이터 관리: TanStack React Query, Axios
  * 스타일링: Emotion, CSS Modules, Global Styles
  * 빌드 및 배포: EC2 


## 시작하기
 
### 1. 저장소 클론
~~~sh
git clone https://github.com/OttSideProject/OnDe-FE.git
~~~

### 2. node.js 설치(>=18.18.0)
https://nodejs.org/en/download

### 3. 모듈 설치 & 실행 

~~~sh
npm install
npm run dev
~~~

## 작업 브랜치

* Workflow: Feature Branch Workflow 기능별 브렌치를 만들어 작업합니다.
  + 참고사이트: https://lhy.kr/git-workflow
* 개발 작업 관련 Branch Name은 `feature/이름스펠링`으로 만듭니다. ex)feature/name1
* 개발 작업 이외 Branch Name은 `feature/기능`으로 만듭니다. ex)feature/update-readme
* Main으로 머지전 `Pull request(PR)`를 통하여 확인 후 진행합니다.

## 협업 문서

*프로젝트와 관련된 협업 및 논의는 GitHub Discussions에서 진행되며, PR 문서를 통해 협업 내용을 확인하실 수 있습니다. 필요한 내용은 해당 문서에서 찾아보세요.

https://github.com/OttSideProject/OnDe-FE/discussions

https://github.com/OttSideProject/OnDe-FE/pulls


## 작업 영역

### 김예운

* 회원가입
* 로그인
* 마이페이지
* 게시판 

### 정예원 (활동종료)
* 게시판

### 조윤우

* 콘텐츠 
  * 메인 
  * 상세
  * 랭킹
  * 추천 
  * 검색 

## Trouble Shooting 

### 김예운

### 조윤우

[`localFont` 함수에서 절대 경로(@ 별칭) 사용 이슈](https://www.notion.so/tomorrowcho/localFont-a9398652d1a546138a62a13f552b9b98)

[Next.js 14(App Router) GitHub Pages로 정적 사이트 배포하기](https://www.notion.so/Next-js-14-App-Router-GitHub-Pages-1041c66258d480f0af5edfd3d7f20fd5?pvs=21)

[**Next.js에서 이벤트 버블링 문제 해결 방법**](https://www.notion.so/Next-js-1041c66258d480c69b28ebd3aa90e300?pvs=21)

[**Next.js와 React-Slick을 이용한 슬라이더 드래그 문제 해결하기**](https://tomorrowcho.notion.site/Next-js-React-Slick-1281c66258d480f3b893c7f72a00d1e3?pvs=4)


## 배포
https://www.ondemandia.com

## 프로젝트 구조 (Tree)

<details>
<summary>📂 OnDe-FE 디렉토리 구조</summary>


```
📂 OnDe-FE                     # 온디 프론트엔드 프로젝트 루트
├── 📄 README.md              # 프로젝트 개요 및 사용법 설명
├── 📄 next.config.mjs        # Next.js 설정 파일
├── 📄 package-lock.json      # 설치된 패키지 버전 잠금
├── 📄 package.json           # 프로젝트 의존성 및 스크립트 정의

├── 📂 public/                # 정적 파일 디렉토리
│   └── 📂 assets/            # 폰트 및 이미지
│       ├── 📂 fonts/         # 웹폰트 파일
│       └── 📂 images/        # 이미지 파일
│   ├── 📄 favicon.svg        # 파비콘
│   ├── 📄 mockServiceWorker.js # MSW: 목 API를 위한 서비스워커
│   └── 📄 privacy-policy.txt # 개인정보처리방침 텍스트

├── 📂 src/                   # 애플리케이션 소스 코드
│   ├── 📂 __mocks__/         # 테스트용 mock 데이터 및 헬퍼 함수
│   │   ├── 📂 data/          # mock 데이터
│   │   └── 📂 helpers/       # mock 관련 헬퍼 함수
│   ├── 📂 _types/            # 전역 타입 정의
│   │   ├── 📂 board/         # 게시판 관련 타입
│   │   └── 📂 common/        # 공통적으로 쓰이는 타입
│   ├── 📂 api/               # API 관련 설정
│   │   └── 📂 core/          # Axios 인스턴스, API 유틸 등 핵심 로직
│   ├── 📂 app/               # App Router 기반의 페이지 구조
│   │   ├── 📂 board/         # 게시판 페이지
│   │   │   ├── 📂 create/    # 게시글 생성
│   │   │   └── 📂 details/   # 게시글 상세
│   │   ├── 📂 contents/      # 콘텐츠 페이지
│   │   │   ├── 📂 [type]/    # 콘텐츠 타입별 (영화/드라마)
│   │   │   ├── 📂 detail/    # 콘텐츠 상세 페이지
│   │   │   ├── 📂 main/      # 콘텐츠 메인 페이지
│   │   │   ├── 📂 popular-dramas/ # 인기 드라마
│   │   │   ├── 📂 popular-movies/ # 인기 영화
│   │   │   ├── 📂 ranking/   # 콘텐츠 랭킹
│   │   │   └── 📂 recommended/ # 추천 콘텐츠
│   │   └── 📂 users/         # 유저 관련 페이지
│   │       ├── 📂 login/     # 로그인
│   │       ├── 📂 mypage/    # 마이페이지
│   │       └── 📂 signup/    # 회원가입
│   ├── 📂 components/        # 재사용 가능한 UI 컴포넌트
│   │   ├── 📂 board/         # 게시판 관련 컴포넌트
│   │   │   └── 📂 main/      # 게시판 메인 전용 컴포넌트
│   │   ├── 📂 header/        # 헤더 UI
│   │   └── 📂 user/          # 유저 관련 컴포넌트
│   ├── 📂 entities/          # 도메인 단위 비즈니스 로직
│   │   └── 📂 contents/      # 콘텐츠 도메인
│   │       ├── 📂 category/  # 카테고리별 API/상수
│   │       │   ├── 📂 api/
│   │       │   └── 📂 constants/
│   │       ├── 📂 detail/    # 콘텐츠 상세 관련 상태관리
│   │       │   └── 📂 stores/
│   │       ├── 📂 filter/    # 필터 관련 상태관리
│   │       │   └── 📂 stores/
│   │       ├── 📂 hooks/     # 콘텐츠 관련 custom hooks
│   │       ├── 📂 main/      # 메인 콘텐츠 관련 API/스토어
│   │       │   ├── 📂 api/
│   │       │   └── 📂 stores/
│   │       ├── 📂 ranking/   # 랭킹 관련 API
│   │       │   └── 📂 api/
│   │       └── 📂 recommended/ # 추천 관련 API/스토어
│   │           ├── 📂 api/
│   │           └── 📂 stores/
│   ├── 📂 hooks/             # 공통 custom hooks
│   ├── 📂 features/          # 도메인 UI 및 유틸 모듈
│   │   └── 📂 contents/
│   │       ├── 📂 ui/        # 콘텐츠 관련 UI 요소
│   │       │   ├── 📂 board-section/
│   │       │   ├── 📂 detail/
│   │       │   │   └── 📂 tabs/
│   │       │   ├── 📂 header/
│   │       │   │   └── 📂 sub-elements/
│   │       │   ├── 📂 ott-selector/
│   │       │   ├── 📂 ranking/
│   │       │   ├── 📂 recommended/
│   │       │   ├── 📂 section-list/
│   │       │   └── 📂 today-pick/
│   │       └── 📂 utils/     # 콘텐츠 관련 유틸 함수
│   ├── 📂 shared/            # 전역 유틸리티 및 공용 모듈
│   │   ├── 📂 api/           # 공용 API 유틸
│   │   │   ├── 📂 actions/
│   │   │   ├── 📂 filter/
│   │   │   └── 📂 search/
│   │   ├── 📂 lib/           # 라이브러리성 모듈
│   │   │   ├── 📂 hooks/     # 공용 훅
│   │   │   └── 📂 stores/    # 공용 상태관리
│   │   ├── 📂 types/         # 공용 타입
│   │   │   └── 📂 contents/
│   │   ├── 📂 ui/            # 공용 UI 컴포넌트
│   │   │   ├── 📂 action-bar/
│   │   │   ├── 📂 button-group/
│   │   │   ├── 📂 dimmed-background/
│   │   │   ├── 📂 filter/
│   │   │   ├── 📂 go-back/
│   │   │   ├── 📂 loading/
│   │   │   ├── 📂 navigation/
│   │   │   ├── 📂 search/
│   │   │   ├── 📂 status-bar/
│   │   │   ├── 📂 tabs/
│   │   │   ├── 📂 toggle/
│   │   │   ├── 📂 type/
│   │   │   └── 📂 view-more/
│   │   └── 📂 utils/         # 공용 유틸 함수
│   ├── 📂 styles/            
│   │   ├── 📂 board/         # 게시판 스타일
│   │   ├── 📂 core/          # 공통 스타일
│   │   └── 📂 user/          # 유저 관련 스타일
├── 📄 tsconfig.json          # TypeScript 설정 파일

```

</details>


<!-- ## 회고 

### 김예운

### 조윤우 -->

<!-- ## 요구사항 명세서 -->

