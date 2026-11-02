/* ==========================================================================
   차량 데이터
   --------------------------------------------------------------------------
   차량을 추가하려면 { ... } 한 덩어리를 복사해 붙여넣고 내용을 바꾸세요.

   category : "sedan" | "suv" | "electric" | "amg"   (차량 가이드 필터)
   shape    : "sedan" | "suv" | "large-suv" | "offroad" | "ev-sedan" | "ev-suv" | "coupe"
              (사진이 없을 때 보여줄 실루엣 일러스트 모양)
   image    : 사용 권리가 확인된 사진만 넣으세요. 예) "assets/images/e-class.jpg"
              비워두면 실루엣 일러스트가 표시됩니다.
   tier     : 1 엔트리 · 2 중형 · 3 상위 · 4 플래그십  (추천 기능의 예산 단계와 비교)
   seats    : 추천 기능에서 쓰는 일반적인 좌석 구성 기준 (5 또는 7)
   ev       : 전기차 여부
   fit      : 추천 기능 태그
              용도  commute(출퇴근) family(가족) business(업무·의전) leisure(레저·여행)
              중요  comfort(승차감) space(공간) design(디자인) performance(성능)

   ※ 가격·출력·주행거리·옵션·재고·연식은 검증 전 입력하지 마세요.
   ========================================================================== */

window.MODELS = [
  {
    id: "c-class",
    name: "C-Class",
    category: "sedan",
    shape: "sedan",
    image: "assets/images/c-class.jpg",
    tier: 1,
    seats: 5,
    ev: false,
    tagline: "메르세데스-벤츠 세단을 가장 균형 있게 시작하는 방법.",
    forWho: "첫 벤츠를 찾는 분, 출퇴근 위주의 1~2인 운행",
    drive: "도심과 고속도로 모두에서 다루기 쉬운 크기와 경쾌한 주행감.",
    space: "1~2인 출퇴근에 여유 있는 실내, 가족 장거리 이동은 E-Class와 비교를 권합니다.",
    consider: "뒷좌석 탑승이 잦다면 E-Class와 실물 비교를 추천합니다.",
    fit: ["commute", "design"]
  },
  {
    id: "e-class",
    name: "E-Class",
    category: "sedan",
    shape: "sedan",
    image: "assets/images/e-class.jpg",
    tier: 2,
    seats: 5,
    ev: false,
    tagline: "비즈니스와 가족 모두를 만족시키는 메르세데스-벤츠의 중심.",
    forWho: "출퇴근과 가족 이동을 함께 하는 분, 첫 업무용 차량",
    drive: "차분하고 안정적인 승차감으로 장거리 운전 피로가 적은 성격.",
    space: "뒷좌석과 트렁크 모두 실사용에 여유 있는 구성.",
    consider: "트림별 사양 차이가 있어 필요한 옵션을 먼저 정하면 비교가 쉽습니다.",
    fit: ["commute", "family", "business", "comfort"]
  },
  {
    id: "s-class",
    name: "S-Class",
    category: "sedan",
    shape: "sedan",
    image: "assets/images/s-class.jpg",
    tier: 4,
    seats: 5,
    ev: false,
    tagline: "편안함과 품격의 기준이 되는 플래그십 세단.",
    forWho: "뒷좌석 탑승 비중이 높은 분, 의전·임원 차량",
    drive: "정숙성과 승차감을 최우선으로 한 여유로운 주행.",
    space: "뒷좌석 거주성이 가장 큰 강점입니다.",
    consider: "차체가 큰 편이라 자주 이용하는 주차 환경을 함께 확인하세요.",
    fit: ["business", "family", "comfort", "space"]
  },
  {
    id: "glc",
    name: "GLC",
    category: "suv",
    shape: "suv",
    image: "assets/images/glc.jpg",
    tier: 2,
    seats: 5,
    ev: false,
    tagline: "도심에서도 부담 없는 크기의 프리미엄 SUV.",
    forWho: "SUV를 처음 고려하는 분, 3~4인 가족",
    drive: "높은 시야와 다루기 쉬운 크기의 균형.",
    space: "유모차·캠핑 짐 등 실용적인 적재가 가능한 SUV 구성.",
    consider: "SUV와 쿠페형 SUV 중 뒷좌석·적재 공간 차이를 확인해 보세요.",
    fit: ["commute", "family", "leisure", "design"]
  },
  {
    id: "gle",
    name: "GLE",
    category: "suv",
    shape: "suv",
    image: "assets/images/gle.jpg",
    tier: 3,
    seats: 5,
    ev: false,
    tagline: "넉넉한 공간과 여유로운 주행의 패밀리 SUV.",
    forWho: "가족 장거리 여행이 잦은 분, 공간을 중시하는 분",
    drive: "큰 차체에서 오는 안정감과 편안한 장거리 주행.",
    space: "2열 공간과 적재 공간이 넉넉한 편입니다.",
    consider: "3열이 꼭 필요하다면 GLS와 비교가 필요합니다.",
    fit: ["family", "leisure", "space", "comfort"]
  },
  {
    id: "gls",
    name: "GLS",
    category: "suv",
    shape: "large-suv",
    image: "assets/images/gls.jpg",
    tier: 4,
    seats: 7,
    ev: false,
    tagline: "3열까지 여유로운 대형 럭셔리 SUV.",
    forWho: "5인 이상 탑승이 잦은 가족, 의전용 SUV",
    drive: "대형 SUV다운 묵직하고 편안한 주행 성격.",
    space: "3열 구성으로 다인원 이동에 적합합니다.",
    consider: "차체가 크므로 주차 공간과 기계식 주차 여부를 꼭 확인하세요.",
    fit: ["family", "business", "space", "comfort"]
  },
  {
    id: "g-class",
    name: "G-Class",
    category: "suv",
    shape: "offroad",
    image: "assets/images/g-class.jpg",
    tier: 4,
    seats: 5,
    ev: false,
    tagline: "시간이 지나도 변하지 않는 아이코닉 오프로더.",
    forWho: "확실한 존재감을 원하는 분, 레저·아웃도어",
    drive: "높은 시트 포지션과 오프로드 성향. 세단 대비 승차감은 단단한 편입니다.",
    space: "각진 차체 덕분에 실내 헤드룸이 여유 있습니다.",
    consider: "출고 대기와 사양 구성은 시기별 차이가 커서 상담 시 확인이 필요합니다.",
    fit: ["leisure", "design", "performance"]
  },
  {
    id: "eqe",
    name: "EQE",
    category: "electric",
    shape: "ev-sedan",
    image: "assets/images/eqe.jpg",
    tier: 3,
    seats: 5,
    ev: true,
    tagline: "조용하고 부드러운 전기 비즈니스 세단.",
    forWho: "집·회사에 충전 환경이 있는 분, 정숙성을 중시하는 분",
    drive: "전기차 특유의 조용하고 매끄러운 가속.",
    space: "세단형 실내로 출퇴근과 업무 이동에 적합합니다.",
    consider: "주 충전 장소와 하루 주행 거리를 먼저 확인하는 것을 권합니다.",
    fit: ["commute", "business", "comfort"]
  },
  {
    id: "eqs",
    name: "EQS",
    category: "electric",
    shape: "ev-sedan",
    image: "assets/images/eqs.jpg",
    tier: 4,
    seats: 5,
    ev: true,
    tagline: "전동화 시대의 메르세데스-벤츠 플래그십 세단.",
    forWho: "최상위 전기 세단을 원하는 분, 의전 차량",
    drive: "매우 정숙하고 여유로운 플래그십 전기차 주행.",
    space: "넓은 실내와 뒷좌석 편의성.",
    consider: "충전 환경과 장거리 이동 빈도를 함께 상담하면 좋습니다.",
    fit: ["business", "comfort", "space"]
  },
  {
    id: "eqe-suv",
    name: "EQE SUV",
    category: "electric",
    shape: "ev-suv",
    image: "assets/images/eqe-suv.jpg",
    tier: 3,
    seats: 5,
    ev: true,
    tagline: "가족을 위한 조용하고 실용적인 전기 SUV.",
    forWho: "충전 환경이 있는 가족, 첫 전기 SUV",
    drive: "높은 시야와 전기차의 정숙함을 함께 누리는 주행.",
    space: "SUV 구성으로 일상 적재가 편리합니다.",
    consider: "충전 환경과 겨울철 사용 패턴을 함께 고려하세요.",
    fit: ["family", "commute", "comfort"]
  },
  {
    id: "eqs-suv",
    name: "EQS SUV",
    category: "electric",
    shape: "ev-suv",
    image: "assets/images/eqs-suv.jpg",
    tier: 4,
    seats: 5,
    ev: true,
    tagline: "가장 넓고 여유로운 메르세데스-벤츠 전기 SUV.",
    forWho: "공간과 정숙성을 모두 원하는 분",
    drive: "대형 SUV의 여유와 전기차의 조용함.",
    space: "넉넉한 실내 공간이 강점입니다. 좌석 구성은 상담 시 확인해 주세요.",
    consider: "차체 크기와 충전 환경을 함께 확인하세요.",
    fit: ["family", "business", "space", "comfort"]
  },
  {
    id: "amg-gt",
    name: "Mercedes-AMG GT",
    category: "amg",
    shape: "coupe",
    image: "assets/images/amg-gt.jpg",
    tier: 4,
    seats: 5,
    ev: false,
    tagline: "운전하는 즐거움에 집중한 AMG 스포츠카.",
    forWho: "드라이빙 자체를 즐기는 분",
    drive: "AMG 특유의 날카롭고 역동적인 주행 성격.",
    space: "실용성보다 운전 경험에 무게를 둔 구성입니다. 좌석 구성은 모델별로 다릅니다.",
    consider: "일상 사용 빈도와 승차감 선호를 상담 시 함께 확인하세요.",
    fit: ["leisure", "performance", "design"]
  },
  {
    id: "amg-e",
    name: "Mercedes-AMG E 53 HYBRID",
    category: "amg",
    shape: "sedan",
    image: "assets/images/amg-e.jpg",
    tier: 3,
    seats: 5,
    ev: false,
    tagline: "비즈니스 세단에 AMG 퍼포먼스와 하이브리드를 더한 선택.",
    forWho: "실용성과 운전 재미를 함께 원하는 분",
    drive: "E-Class 기반에 AMG의 스포티한 세팅을 더한 주행.",
    space: "E-Class와 같은 세단 구성으로 일상 · 업무용으로 충분합니다.",
    consider: "일반 E-Class 대비 승차감이 단단할 수 있어 시승을 권합니다.",
    fit: ["commute", "performance", "design"]
  },
  {
    id: "amg-g63",
    name: "Mercedes-AMG G 63",
    category: "amg",
    shape: "offroad",
    image: "assets/images/amg-g63.jpg",
    tier: 4,
    seats: 5,
    ev: false,
    tagline: "G-Class의 존재감에 AMG의 힘을 더한 모델.",
    forWho: "가장 강렬한 G-Class를 원하는 분",
    drive: "오프로더의 감성과 AMG의 강력한 주행 성격.",
    space: "G-Class와 같은 각진 차체의 실내 구성.",
    consider: "출고 일정과 사양은 시기별로 차이가 커 상담 시 확인이 필요합니다.",
    fit: ["leisure", "performance", "design"]
  }
];
