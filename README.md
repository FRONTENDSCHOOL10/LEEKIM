<div align='center'>

 <br/>
 
<img src="https://github.com/user-attachments/assets/caab2c20-a40d-4e65-a269-b3d5c6d1c8e3" alt="졸전닷컴 글자 로고" width="400px">

<br/>
<br/>
<br/>

</div>

## 🎓 프로젝트 소개

[wiki 바로가기](https://github.com/FRONTENDSCHOOL10/LEEKIM/wiki)

<br/>

## 🔗 배포 사이트

[JJ.COM](https://jjcom.netlify.app/)

<br/>

## 💻 테스트 계정

```
email: test@test.test
password: testtest
```

<br/>

## 🏡 메인 페이지

![mainSlogan](https://github.com/user-attachments/assets/80b5d704-2a18-4044-938c-eacb2db7793e)
![mainPoster](https://github.com/user-attachments/assets/2f82dcf7-6d5b-4e9a-af86-c5cf262fbd25)
![mainPage](https://github.com/user-attachments/assets/e1b503a2-fa8b-4088-b311-62100227f092)

<br/>

## 📃 전시 목록 페이지

![listTag](https://github.com/user-attachments/assets/72e52e5e-fa2b-4e2c-8726-1c12aaf797c6)
![list](https://github.com/user-attachments/assets/4fdf11a3-2303-4d1f-ab79-1e2af4b3fa2f)
![listMore](https://github.com/user-attachments/assets/7559cccf-5f7a-4bcc-ba1b-44e83d0dbc36)

<br/>

## 🔎 전시 상세 페이지

![listDetail](https://github.com/user-attachments/assets/54cddcf4-dffb-48b2-a556-84254613ab4c)
![listDetailRecommend](https://github.com/user-attachments/assets/15cbcd75-6134-4e52-b6a0-6538040628ac)

<br/>

## 📝 전시 등록 페이지

![register](https://github.com/user-attachments/assets/fd78dbae-f976-409e-b811-e1dcdd231800)

<br/>

## 🧑🏻‍💻 사이트 소개 페이지

![introduceFirst](https://github.com/user-attachments/assets/9e0311be-9c84-4a5d-ab96-b931b7fe3fbd)
![image](https://github.com/user-attachments/assets/57f96809-98b5-4c77-a732-cadaa62556b8)

<br/>

## 🔎 검색 결과 페이지

![introduce3](https://github.com/user-attachments/assets/7757e9ce-fb8f-40ea-acb1-6e554358fa64)

<br/>

## 💁🏻 회원가입 & 로그인 페이지

![image](https://github.com/user-attachments/assets/9d7a1b7a-730b-4629-9646-6c559d2a2393)
![image](https://github.com/user-attachments/assets/d498ff3a-fcb1-4230-8de8-97c089f14b35)

<br/>

## 💁🏻‍♂️ 마이페이지

![mypage](https://github.com/user-attachments/assets/abd9e259-aec8-4de3-8658-95599b529cf9)

<br/>

## 🔖 북마크 페이지

![bookmark](https://github.com/user-attachments/assets/464c4337-2f7f-4203-9ec5-14af006d1260)

<br/>

## 🤼 프로필 수정 페이지

![image](https://github.com/user-attachments/assets/b9daf75a-cdfd-489c-8e5f-d8b6cdf54eec)

<br/>

<div align="center">

### 🔧 프로젝트 주요 기능

| 주요 기능                   |
| --------------------------- |
| 📝 전시 등록 기능           |
| 🔖 전시 북마크 기능         |
| 🔎 전시 검색 및 필터링 기능 |
| 💻 회원가입 및 로그인 기능  |
| 👩🏻‍🔧 마이페이지 정보 제공     |

 <br/>

### 📄 페이지 별 기능

| 📄 페이지/컴포넌트                        | 🛠️ 구현 기능                                                                                                                                                                                                                                                                                                                                                                            |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **헤더 (AppHeader)**                      | • 페이지 이동 시 스크롤 맨 위로 이동<br>• 세션 스토리지 초기화하고 관리<br>• 로그인 상태 확인하고 업데이트<br>• 로그인 상태에 따라 다른 UI 제공<br>• 검색 기능 포함 -> 검색어 입력 시 검색 결과 페이지로 이동                                                                                                                                                                           |
| **푸터 (AppFooter)**                      | • 사이트 구독 기능 제공<br>• 이메일 유효성 검사를 수행하여 중복 구독 방지<br>• 각 섹션(전시 정보, 이용 약관, 팀원 소개 등)에 대한 네비게이션 메뉴 렌더링                                                                                                                                                                                                                                |
| **메인 페이지 (Home)**                    | • 현재 날짜 기준으로 예정된 전시회 정보를 API에서 가져와 표시<br>• 랜덤하게 5개의 전시 포스터를 보여줌<br>• Framer Motion을 사용하여 포스터 카드와 슬로건에 애니메이션 효과를 줌<br>• 전시 등록을 위한 배너와 링크 제공<br>• 사용자가 최근에 본 전시회 정보 표시<br>• Swiper를 사용하여 전시회 정보를 슬라이더 형태로 보여줌                                                            |
| **전시 목록 페이지 (ExhibitionList)**     | • Swiper를 사용하여 태그의 가로 스크롤 구현<br>• 온라인 전시, 진행 중 전시, 학과, 지역, 연도별 필터 구현<br>• 필터를 API 요청 URL에 적용                                                                                                                                                                                                                                                |
| **전시 상세 페이지 (ExhibitionDetail)**   | • API에서 특정 전시회의 상세 정보를 가져옴<br>• 전시회와 관련된 학교, 전공, 위치, 부서 정보를 가져옴<br>• 로그인 사용자의 경우 서버에, 비 로그인 사용자의 경우 세션 스토리지에 최근 본 전시 정보 저장<br>• data-fns 라이브러리를 사용하여 전시 일정 정보 포맷팅<br>• 카카오맵 API를 사용하여 전시 장소를 지도에 표시<br>• 현재 전시와 같은 분야나 지역의 다른 진행 중인 전시회를 보여줌 |
| **전시 등록 페이지 (RegisterExhibition)** | • Zustand를 사용한 전역 상태 관리<br>• 주소 입력을 위해 Daum 주소 검색 API 사용<br>• 전시회 포스터 업로드 기능 제공<br>• 필수 필드가 모두 입력 되었는지 확인<br>• 입력된 데이터를 서버에 전송 - 학교, 학과 정보가 없을 시 새로 생성<br>• multipart/form-data로 이미지와 함께 전송                                                                                                       |
| **사이트 소개 페이지 (Introduce)**        | • 사용자에게 사이트의 목적, 사용 방법, 개발 팀에 대한 정보 제공<br>• 전시 등록 절차 소개<br>• 팀 소개                                                                                                                                                                                                                                                                                   |
| **검색 결과 페이지 (SearchResults)**      | • Zustand를 사용한 훅으로 전역 상태 관리<br>• 검색어, 필터, 정렬 옵션에 따라 검색 결과를 보여줌<br>• URL 파라미터로 전달된 검색어를 사용 - useParams로 URL에서 검색어를 가져옴                                                                                                                                                                                                          |
| **이용 약관 페이지 (TermOfUse)**          | • 총 11개의 조항으로 구성                                                                                                                                                                                                                                                                                                                                                               |
| **회원가입 페이지 (Join)**                | • useRef를 사용하여 DOM 요소와 관심 태그에 접근<br>• 닉네임, 이메일, 비밀번호에 대한 정규식 기반 유효성 검사 수행<br>• 각 입력 필드의 유효성 상태에 따라 안내 메시지 표시<br>• 회원가입 시 중복 닉네임/이메일 체크 및 사용자 정보 등록 수행<br>• 사용자가 관심 있는 태그 선택 가능<br>• 선택된 태그는 회원가입 시 서버에 전송<br>• 회원가입 완료 후 로그인 페이지로 자동 이동           |
| **로그인 페이지 (Login)**                 | • useIsLogin 커스텀 훅을 사용한 로그인 상태 관리<br>• useRef를 사용하여 이메일과 비밀번호 입력 필드에 접근<br>• 컴포넌트 마운트 시 로그인 상태 확인 및 랜덤 전시 데이터를 가져옴<br>• 로그인 성공 시 세션 스토리지에 사용자 ID 저장 후 홈페이지로 이동<br>• useId 훅을 사용하여 입력 필드에 고유한 ID 부여                                                                              |
| **마이페이지 (MyPage)**                   | • URL 파라미터에서 사용자 ID를 가져와 API를 통해 사용자 데이터 불러옴<br>• 최근 본 전시, 내가 등록한 전시, 북마크한 전시 데이터를 API에서 가져옴<br>• 프로필 편집, 전시 등록, 북마크 전체 보기 페이지로 이동 가능한 링크 제공<br>• 로그아웃 기능 - 세션 스토리지 정리 후 메인 페이지로 리다이렉트<br>• 사용자가 관리자인 경우 '전시 등록 관리' 링크 추가로 표시                         |
| **북마크 페이지 (Bookmark)**              | • 로그인/회원가입 → 전시회 북마크 → 내 정보에서 확인 가능<br>• URL 파라미터에서 사용자 ID를 가져와 API를 통해 사용자 데이터를 불러옴<br>• 사용자의 북마크 정보를 기반으로 전시회 데이터를 API에서 가져옴<br>• 북마크가 있을 시 전시회 목록 렌더링, 없을 시 메시지 표시 ⇒ 사용자의 북마크 상태에 따라 적절한 UI 제공<br>• 온/오프라인, 진행 중 전시 여부, 정렬 순서 등의 필터 적용 가능  |
| **프로필 수정 페이지 (EditProfile)**      | • 닉네임, 이메일, 비밀번호 수정 가능<br>• 닉네임, 이메일에 대한 정규식 기반 유효성 검사 수행<br>• 닉네임과 이메일의 중복 여부를 서버에 확인<br>• 변경된 프로필 정보를 서버에 업데이트                                                                                                                                                                                                   |

</div>
