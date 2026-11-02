# 이진우 Mercedes-Benz Personal Guide

메르세데스-벤츠 세일즈 컨설턴트 이진우의 개인 상담 홈페이지입니다.
GitHub Pages로 배포하는 정적 웹사이트이며, 별도 서버가 필요 없습니다.

> 본 사이트는 개인이 운영하는 상담 안내 페이지이며 메르세데스-벤츠 코리아의 공식 홈페이지가 아닙니다.

## 폴더 구조

```
star_seller_jw/
├── index.html          메인 페이지
├── privacy.html        개인정보 처리방침
├── css/style.css       디자인
├── js/config.js        ★ 연락처 · 소속 · 상담 접수 · SNS · 프로모션 설정
├── js/models.js        ★ 차량 데이터
├── js/main.js          기능 (필터, 추천, 상담 폼, FAQ)
├── assets/             파비콘, 공유 이미지
│   └── images/         프로필 · 차량 사진 넣는 곳
└── .nojekyll
```

코딩 지식 없이 수정할 파일은 ★ 표시된 두 파일뿐입니다.
GitHub 웹사이트에서 파일을 열고 연필(✏️) 아이콘 → 수정 → **Commit changes** 를 누르면 1~2분 뒤 사이트에 반영됩니다.

## 자주 하는 수정

### 전화번호 · 카카오톡
`js/config.js` → `phone`, `kakao`

### 소속 · 직함 공개 (입사 · 배치 확정 후)
`js/config.js` → `affiliation`

```js
affiliation: {
  enabled: true,            // false → true 로 변경
  company: "HS효성 더클래스",
  showroom: "구리전시장",
  title: "과장",
  address: "근무지 정확한 주소"   // 확정된 주소만 입력
},
```

`enabled: false` 인 동안에는 "메르세데스-벤츠 세일즈 컨설턴트 이진우" 로만 표시됩니다.

### SNS
`js/config.js` → `sns` 에 주소를 넣은 항목만 푸터에 나타납니다.

### 프로모션
`js/config.js` → `promotions`. 확인된 내용만 입력하세요. 비어 있으면
"모델과 계약 조건에 따라 적용 가능한 혜택이 달라집니다…" 기본 안내가 표시됩니다.

### 차량 추가 · 수정
`js/models.js` 에서 차량 한 덩어리 `{ ... },` 를 복사해 내용을 바꾸세요.
가격 · 출력 · 주행거리 · 재고 · 연식 등 검증되지 않은 정보는 넣지 마세요.

### 사진
- 프로필: `assets/images/profile.jpg` 로 올리면 소개 섹션에 자동 표시됩니다 (세로 4:5 권장).
- 차량: 사용 권리가 확인된 사진만 `assets/images/` 에 올리고, `js/models.js` 해당 차량의 `image: "assets/images/파일명.jpg"` 에 입력하세요. 비워두면 실루엣 일러스트가 나옵니다.
- 공식 로고와 메르세데스-벤츠 보도 사진 등은 사용 허가를 확인한 뒤에만 사용하세요.

## 상담 신청 접수 설정 (Formspree)

GitHub Pages는 서버가 없어서 상담 신청서를 [Formspree](https://formspree.io) 로 받아 이메일로 전달합니다.
설정 전에는 상담 신청 버튼을 눌러도 **전송되지 않고** 전화 · 카카오톡 안내만 표시됩니다.

1. https://formspree.io 에 가입합니다 (알림을 받을 이메일로 가입).
2. **+ New Form** → 이름 입력(예: 홈페이지 상담 신청) → 생성.
3. 발급된 주소 `https://formspree.io/f/abcdwxyz` 에서 마지막 부분 `abcdwxyz` 를 복사합니다.
4. `js/config.js` 의 `formspreeId: ""` 를 `formspreeId: "abcdwxyz"` 로 바꾸고 Commit 합니다.
5. 1~2분 뒤 사이트에서 직접 상담 신청을 한 번 해 보세요. 첫 제출 시 Formspree가 확인 메일을 보내면 승인해 주세요.
6. (권장) Formspree 폼 설정 → **Restrict to Domain** 에 `benzjlee.github.io` 를 입력해 다른 사이트에서의 무단 제출을 막습니다.

무료 요금제는 월 제출 건수 제한이 있습니다. 최신 한도는 Formspree 요금제 페이지에서 확인하세요.
Formspree는 미국 서비스이므로 `privacy.html` 의 국외 이전 항목이 이를 반영하고 있습니다. 다른 서비스로 바꾸면 이 문서도 수정하세요.

## 배포 (GitHub Pages)

저장소 **Settings → Pages → Branch: main / (root)** 로 설정되어 있으면 `main` 에 올라온 내용이 자동 배포됩니다.
주소: https://benzjlee.github.io/star_seller_jw/

다른 주소(저장소)로 옮기면 `index.html` 상단의 `canonical`, `og:url`, `og:image` 주소도 함께 바꾸세요.
모든 파일 경로는 상대 경로라 저장소 이름이 바뀌어도 화면은 정상 작동합니다.

## 공개 전 확인할 것

- [ ] 전화번호 010-6396-9342 최종 확인
- [ ] 카카오톡 오픈채팅 링크 작동 확인
- [ ] Formspree 연결 후 실제 접수 테스트
- [ ] 소속 · 직함 공개 여부 (`affiliation.enabled`)
- [ ] 개인정보 처리방침의 보관 기간 · 책임자 정보가 실제와 맞는지
- [ ] 소개 문구의 이력(2018 · 2019 · C-SALES · 팀장 · 2025년 60대)이 사실과 일치하는지

원본 초안은 `archive/first-draft` 브랜치에 보존되어 있습니다.
