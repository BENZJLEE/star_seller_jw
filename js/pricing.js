/* ==========================================================================
   이달의 가격 · 할인 데이터
   --------------------------------------------------------------------------
   매월 이 파일만 바꾸면 첫 화면 할인 카드와 전체 가격표가 함께 바뀝니다.

   ※ 고객에게 안내 가능한 내용만 입력하세요.
     영업사원 · 회사 내부용 프로그램은 절대 넣지 마세요.

   항목 설명
     my        연식 ("MY26", "MY27")
     cls       가격표 탭 구분 (아래 CLASSES 중 하나)
     name      모델명
     msrp      권장소비자가격 (부가세 포함, 개별소비세 5%, 원 단위)
     cash      기본 현금 할인율 (%)            없으면 0
     cashWon   정액 할인 (원)                   예) 1000000  (100만원)
     mbf       벤츠파이낸셜 이용 시 추가 할인율 (%)  없으면 생략
     mbfNote   MBF 할인 조건 설명 (생략 시 "벤츠파이낸셜 이용 시")
     free      무이자 할부 안내 (예: "24개월 무이자")
     badge     카드 위 강조 문구 (예: "11월 할인 상향")
     guide     차량 가이드 모델 id (상담 폼 관심 차량 자동 선택용, 선택)
     note      기타 안내

   최종가 = 권장소비자가격 × (1 − 현금할인 − MBF할인) − 정액할인
   ========================================================================== */

window.PRICING = {
  month: "2026년 11월",
  period: "2026년 11월 1일 ~ 11월 30일",
  priceListDate: "2026년 10월 23일",

  CLASSES: ["A · CLA · GLA · GLB", "C-Class", "E-Class", "S-Class", "CLE · SL · AMG GT", "GLC", "GLE · GLS", "G-Class", "EQ · Electric"],

  /* 첫 화면 '이달의 조건' 카드에 보여줄 모델 (아래 items 의 my + name 과 정확히 일치) */
  featured: [
    "MY26 E 200 EXCLUSIVE",
    "MY26 E 200 AMG Line",
    "MY26 GLE 450 4MATIC Coupé AMG Line",
    "MY26 GLB 250 4MATIC",
    "MY26 GLC 300 4MATIC AMG Line",
    "MY27 GLC 300 4MATIC Coupé AVANTGARDE"
  ],

  /* 모든 고객에게 공통으로 안내 가능한 추가 혜택 */
  extras: [
    { title: "재구매 고객", desc: "메르세데스-벤츠 보유(최근 3개월 내) 고객이 신차 구매 시 모델에 따라 +1~2% 추가 할인. 가족 명의 차량도 범위에 따라 인정됩니다." },
    { title: "트레이드인", desc: "타던 벤츠를 공식 인증중고차로 매각하면 +1% 추가 할인 (6년 · 15만 km 미만 등 조건)." },
    { title: "타 브랜드 고객", desc: "BMW · Audi · Genesis · Volvo · Porsche · Land Rover · Lexus 보유 고객이 GLC · GLE 구매 시 +1% 추가 할인." },
    { title: "빠른 결정 고객 사은품", desc: "계약금 입금 후 7일 이내 잔금 완납 시 골프백 · 보스턴백 · 캠핑 체어 등 사은품 1종 (G-Class 제외)." },
    { title: "S-Class 재구매+", desc: "E-Class 이상 보유 고객이 신형 S-Class 구매 시 구매 횟수에 따라 재구매 할인 + 보증연장 최대 2년 / 7만 km." },
    { title: "Mercedes-Maybach 고객", desc: "11~12월 마이바흐 구매 고객 전원 뮤지컬 〈오페라의 유령〉 프리미엄석 2매, 100명 추첨 한국여자오픈 코스 라운딩." },
    { title: "AMG G 63", desc: "11월 출고 고객 선착순 90명 G-Class 캐리어 증정." }
  ],

  items: [
    /* ---------- A · CLA · GLA · GLB ---------- */
    { my: "MY26", cls: "A · CLA · GLA · GLB", name: "A 220", msrp: 48700000, cash: 10 },
    { my: "MY26", cls: "A · CLA · GLA · GLB", name: "Mercedes-AMG A 45 S 4MATIC+", msrp: 81400000, cash: 7, mbf: 4 },
    { my: "MY26", cls: "A · CLA · GLA · GLB", name: "CLA 250 4MATIC AMG Line", msrp: 64500000, cash: 7 },
    { my: "MY26", cls: "A · CLA · GLA · GLB", name: "Mercedes-AMG CLA 45 S 4MATIC+", msrp: 91800000, cash: 5 },
    { my: "MY26", cls: "A · CLA · GLA · GLB", name: "GLA 250 4MATIC AMG Line", msrp: 70000000, cash: 9, mbf: 4 },
    { my: "MY27", cls: "A · CLA · GLA · GLB", name: "GLA 250 4MATIC AMG Line", msrp: 70800000, cash: 9, mbf: 4 },
    { my: "MY26", cls: "A · CLA · GLA · GLB", name: "GLB 250 4MATIC", msrp: 72000000, cash: 13, mbf: 4, free: "24개월 무이자", guide: "glb" },
    { my: "MY26", cls: "A · CLA · GLA · GLB", name: "Mercedes-AMG GLB 35 4MATIC", msrp: 79500000, cash: 9, mbf: 4, free: "24/36개월 무이자", guide: "glb" },
    { my: "MY27", cls: "A · CLA · GLA · GLB", name: "CLA 220", msrp: 59900000, cash: 0, badge: "신규 출시" },
    { my: "MY27", cls: "A · CLA · GLA · GLB", name: "CLA 220 AMG Line", msrp: 62900000, cash: 0, badge: "신규 출시" },

    /* ---------- C-Class ---------- */
    { my: "MY26", cls: "C-Class", name: "C 200 AVANTGARDE", msrp: 65100000, cash: 10, mbf: 4, free: "24개월 무이자", guide: "c-class" },
    { my: "MY26", cls: "C-Class", name: "C 200 AMG Line", msrp: 68300000, cash: 10, mbf: 4, free: "24개월 무이자", guide: "c-class" },
    { my: "MY26", cls: "C-Class", name: "C 200 Special Edition", msrp: 66300000, cash: 10, mbf: 4, guide: "c-class" },

    /* ---------- E-Class ---------- */
    { my: "MY26", cls: "E-Class", name: "E 200 AVANTGARDE", msrp: 77500000, cash: 16, guide: "e-class" },
    { my: "MY26", cls: "E-Class", name: "E 200 EXCLUSIVE", msrp: 77500000, cash: 15, mbf: 5, free: "24개월 무이자", guide: "e-class" },
    { my: "MY26", cls: "E-Class", name: "E 200 AMG Line", msrp: 81000000, cash: 15, mbf: 4, free: "24개월 무이자", guide: "e-class" },
    { my: "MY26", cls: "E-Class", name: "E 220 d 4MATIC EXCLUSIVE", msrp: 87200000, cash: 12, guide: "e-class" },
    { my: "MY26", cls: "E-Class", name: "E 300 4MATIC EXCLUSIVE", msrp: 94800000, cash: 10, mbf: 4, free: "24개월 무이자", guide: "e-class" },
    { my: "MY26", cls: "E-Class", name: "E 300 4MATIC AMG Line", msrp: 99000000, cash: 10, mbf: 4, free: "24개월 무이자", guide: "e-class" },
    { my: "MY26", cls: "E-Class", name: "E 350 e 4MATIC EXCLUSIVE", msrp: 100000000, cash: 14, guide: "e-class" },
    { my: "MY26", cls: "E-Class", name: "E 450 4MATIC AMG Line", msrp: 116000000, cash: 11, guide: "e-class" },
    { my: "MY26", cls: "E-Class", name: "E 450 4MATIC EXCLUSIVE", msrp: 129600000, cash: 11, guide: "e-class" },
    { my: "MY26", cls: "E-Class", name: "Mercedes-AMG E 53 HYBRID 4MATIC+", msrp: 148400000, cash: 10, free: "24/36개월 무이자", guide: "amg-e" },
    { my: "MY27", cls: "E-Class", name: "E 200 EXCLUSIVE", msrp: 77500000, cash: 14, mbf: 4, free: "24개월 무이자", badge: "11월 무이자 신설", guide: "e-class" },
    { my: "MY27", cls: "E-Class", name: "E 200 AMG Line", msrp: 81000000, cash: 14, mbf: 3, free: "24개월 무이자", badge: "11월 무이자 신설", guide: "e-class" },
    { my: "MY27", cls: "E-Class", name: "E 300 4MATIC EXCLUSIVE", msrp: 94800000, cash: 8, mbf: 4, guide: "e-class" },
    { my: "MY27", cls: "E-Class", name: "E 300 4MATIC AMG Line", msrp: 100100000, cash: 8, mbf: 4, guide: "e-class" },
    { my: "MY27", cls: "E-Class", name: "E 450 4MATIC AMG Line", msrp: 117200000, cash: 10, guide: "e-class" },
    { my: "MY27", cls: "E-Class", name: "E 450 4MATIC EXCLUSIVE", msrp: 129500000, cash: 10, guide: "e-class" },

    /* ---------- S-Class ---------- */
    { my: "MY26", cls: "S-Class", name: "S 350 d 4MATIC", msrp: 155000000, cash: 10, guide: "s-class" },
    { my: "MY26", cls: "S-Class", name: "S 450 4MATIC", msrp: 162000000, cash: 7, mbf: 4, mbfNote: "벤츠파이낸셜 할부 시 (운용리스 이용 시 +6%)", free: "24개월 무이자", guide: "s-class" },
    { my: "MY26", cls: "S-Class", name: "S 450 4MATIC Long", msrp: 195000000, cash: 10, guide: "s-class" },
    { my: "MY26", cls: "S-Class", name: "S 500 4MATIC Long", msrp: 217000000, cash: 10, guide: "s-class" },
    { my: "MY26", cls: "S-Class", name: "S 580 4MATIC Long", msrp: 260000000, cash: 10, guide: "s-class" },
    { my: "MY26", cls: "S-Class", name: "Mercedes-AMG S 63 E Performance", msrp: 299000000, cash: 10, free: "24/36개월 무이자", guide: "s-class" },
    { my: "MY26", cls: "S-Class", name: "Mercedes-Maybach S 580", msrp: 317000000, cash: 9, mbf: 2, mbfNote: "벤츠파이낸셜 운용리스 이용 시", guide: "s-class" },
    { my: "MY26", cls: "S-Class", name: "Mercedes-Maybach S 680", msrp: 403000000, cash: 9, mbf: 2, mbfNote: "벤츠파이낸셜 운용리스 이용 시", note: "재구매 시 +9%", guide: "s-class" },
    { my: "MY27", cls: "S-Class", name: "S 350 d 4MATIC", msrp: 154000000, cash: 0, badge: "The New S-Class", note: "재구매+ 혜택 대상", guide: "s-class" },
    { my: "MY27", cls: "S-Class", name: "S 450 4MATIC", msrp: 162400000, cash: 0, badge: "The New S-Class", note: "재구매+ 혜택 대상", guide: "s-class" },
    { my: "MY27", cls: "S-Class", name: "S 450 4MATIC Long Exclusive", msrp: 175400000, cash: 0, badge: "The New S-Class", note: "재구매+ 혜택 대상", guide: "s-class" },
    { my: "MY27", cls: "S-Class", name: "S 450 4MATIC Long AMG Line", msrp: 195400000, cash: 0, badge: "The New S-Class", note: "재구매+ 혜택 대상", guide: "s-class" },
    { my: "MY27", cls: "S-Class", name: "S 500 4MATIC Long", msrp: 220000000, cash: 0, badge: "The New S-Class", note: "재구매+ 혜택 대상", guide: "s-class" },
    { my: "MY27", cls: "S-Class", name: "S 580 4MATIC Long", msrp: 270000000, cash: 0, badge: "The New S-Class", note: "재구매+ 혜택 대상", guide: "s-class" },
    { my: "MY27", cls: "S-Class", name: "Mercedes-Maybach S 580", msrp: 317000000, cash: 0, note: "재구매+ 혜택 대상", guide: "s-class" },
    { my: "MY27", cls: "S-Class", name: "Mercedes-Maybach S 680", msrp: 407000000, cash: 0, note: "재구매+ 혜택 대상", guide: "s-class" },

    /* ---------- CLE · SL · AMG GT ---------- */
    { my: "MY26", cls: "CLE · SL · AMG GT", name: "CLE 200 Coupé AMG Line", msrp: 76700000, cash: 5 },
    { my: "MY26", cls: "CLE · SL · AMG GT", name: "CLE 450 4MATIC Coupé AMG Line", msrp: 99700000, cash: 9 },
    { my: "MY26", cls: "CLE · SL · AMG GT", name: "Mercedes-AMG CLE 53 4MATIC+ Coupé", msrp: 109100000, cash: 3 },
    { my: "MY26", cls: "CLE · SL · AMG GT", name: "CLE 200 Cabriolet AMG Line", msrp: 83100000, cash: 4 },
    { my: "MY26", cls: "CLE · SL · AMG GT", name: "CLE 450 4MATIC Cabriolet AMG Line", msrp: 104000000, cash: 6 },
    { my: "MY26", cls: "CLE · SL · AMG GT", name: "Mercedes-AMG CLE 53 4MATIC+ Cabriolet", msrp: 115000000, cash: 3 },
    { my: "MY27", cls: "CLE · SL · AMG GT", name: "CLE 200 Coupé", msrp: 77600000, cash: 2 },
    { my: "MY27", cls: "CLE · SL · AMG GT", name: "CLE 450 4MATIC Coupé", msrp: 100800000, cash: 2 },
    { my: "MY27", cls: "CLE · SL · AMG GT", name: "Mercedes-AMG CLE 53 4MATIC+ Coupé", msrp: 110600000, cash: 2 },
    { my: "MY27", cls: "CLE · SL · AMG GT", name: "CLE 200 Cabriolet", msrp: 84100000, cash: 2 },
    { my: "MY27", cls: "CLE · SL · AMG GT", name: "CLE 450 4MATIC Cabriolet", msrp: 105200000, cash: 2 },
    { my: "MY27", cls: "CLE · SL · AMG GT", name: "Mercedes-AMG CLE 53 4MATIC+ Cabriolet", msrp: 116600000, cash: 2 },
    { my: "MY26", cls: "CLE · SL · AMG GT", name: "Mercedes-AMG SL 43", msrp: 160000000, cash: 9 },
    { my: "MY26", cls: "CLE · SL · AMG GT", name: "Mercedes-AMG SL 63 4MATIC+", msrp: 250000000, cash: 9 },
    { my: "MY26", cls: "CLE · SL · AMG GT", name: "Mercedes-Maybach SL 680", msrp: 344000000, cash: 2 },
    { my: "MY27", cls: "CLE · SL · AMG GT", name: "Mercedes-AMG SL 43", msrp: 161800000, cash: 8 },
    { my: "MY26", cls: "CLE · SL · AMG GT", name: "Mercedes-AMG GT 55 4MATIC+", msrp: 210000000, cash: 3, guide: "amg-gt" },
    { my: "MY26", cls: "CLE · SL · AMG GT", name: "Mercedes-AMG GT 63 S E Performance", msrp: 280000000, cash: 4, guide: "amg-gt" },
    { my: "MY26", cls: "CLE · SL · AMG GT", name: "Mercedes-AMG GT 43 4MATIC+ 4-Door Coupé", msrp: 164000000, cash: 9, guide: "amg-gt" },
    { my: "MY27", cls: "CLE · SL · AMG GT", name: "Mercedes-AMG GT 43", msrp: 149500000, cash: 8, guide: "amg-gt" },
    { my: "MY27", cls: "CLE · SL · AMG GT", name: "Mercedes-AMG GT 55 4MATIC+", msrp: 212600000, cash: 2, guide: "amg-gt" },

    /* ---------- GLC ---------- */
    { my: "MY26", cls: "GLC", name: "GLC 220 d 4MATIC", msrp: 82200000, cash: 10, guide: "glc" },
    { my: "MY26", cls: "GLC", name: "GLC 300 4MATIC AVANTGARDE", msrp: 82500000, cash: 7, mbf: 4, free: "24개월 무이자", guide: "glc" },
    { my: "MY26", cls: "GLC", name: "GLC 300 4MATIC AMG Line", msrp: 92500000, cash: 12, mbf: 4, free: "24개월 무이자", guide: "glc" },
    { my: "MY26", cls: "GLC", name: "Mercedes-AMG GLC 43 4MATIC", msrp: 103600000, cash: 7, guide: "glc" },
    { my: "MY26", cls: "GLC", name: "GLC 300 4MATIC Coupé AVANTGARDE", msrp: 86600000, cash: 7, mbf: 4, free: "24개월 무이자", guide: "glc" },
    { my: "MY26", cls: "GLC", name: "GLC 300 4MATIC Coupé AMG Line", msrp: 96900000, cash: 9, mbf: 4, free: "24개월 무이자", guide: "glc" },
    { my: "MY26", cls: "GLC", name: "Mercedes-AMG GLC 43 4MATIC Coupé", msrp: 108300000, cash: 3, guide: "glc" },
    { my: "MY27", cls: "GLC", name: "GLC 300 4MATIC", msrp: 77000000, cash: 7, mbf: 1, badge: "금융 할인 신설", guide: "glc" },
    { my: "MY27", cls: "GLC", name: "GLC 300 4MATIC AVANTGARDE", msrp: 82500000, cash: 7, mbf: 1, badge: "금융 할인 신설", guide: "glc" },
    { my: "MY27", cls: "GLC", name: "GLC 300 4MATIC AMG Line", msrp: 95500000, cash: 7, mbf: 1, badge: "금융 할인 신설", guide: "glc" },
    { my: "MY27", cls: "GLC", name: "GLC 300 4MATIC Coupé AVANTGARDE", msrp: 86600000, cash: 7, mbf: 1, free: "24개월 무이자", badge: "11월 할인 상향", note: "10월 5% → 11월 7%", guide: "glc" },

    /* ---------- GLE · GLS ---------- */
    { my: "MY26", cls: "GLE · GLS", name: "GLE 300 d 4MATIC", msrp: 119200000, cash: 8, guide: "gle" },
    { my: "MY26", cls: "GLE · GLS", name: "GLE 350 4MATIC", msrp: 118000000, cash: 10, free: "24/36개월 무이자", badge: "11월 무이자 신설", guide: "gle" },
    { my: "MY26", cls: "GLE · GLS", name: "GLE 450 4MATIC", msrp: 129000000, cash: 12, mbf: 4, free: "24/36개월 무이자", guide: "gle" },
    { my: "MY26", cls: "GLE · GLS", name: "GLE 450 4MATIC AMG Line", msrp: 139000000, cash: 12, mbf: 4, free: "24/36개월 무이자", guide: "gle" },
    { my: "MY26", cls: "GLE · GLS", name: "Mercedes-AMG GLE 53 4MATIC+", msrp: 166000000, cash: 8, free: "24/36개월 무이자", guide: "gle" },
    { my: "MY26", cls: "GLE · GLS", name: "GLE 450 d 4MATIC Coupé AMG Line", msrp: 134000000, cash: 12, free: "24/36개월 무이자", badge: "11월 무이자 신설", guide: "gle" },
    { my: "MY26", cls: "GLE · GLS", name: "GLE 450 4MATIC Coupé AMG Line", msrp: 142500000, cash: 15, mbf: 4, free: "24/36개월 무이자", guide: "gle" },
    { my: "MY26", cls: "GLE · GLS", name: "Mercedes-AMG GLE 53 4MATIC+ Coupé", msrp: 170000000, cash: 5, free: "24/36개월 무이자", guide: "gle" },
    { my: "MY26", cls: "GLE · GLS", name: "GLS 450 4MATIC AMG Line Premium", msrp: 158500000, cash: 8, free: "24/36개월 무이자", badge: "11월 무이자 신설", guide: "gls" },
    { my: "MY26", cls: "GLE · GLS", name: "GLS 580 4MATIC AMG Line", msrp: 193400000, cash: 9, free: "24/36개월 무이자", badge: "11월 무이자 신설", guide: "gls" },
    { my: "MY26", cls: "GLE · GLS", name: "Mercedes-AMG GLS 63 4MATIC+", msrp: 210000000, cash: 1, free: "24/36개월 무이자", guide: "gls" },
    { my: "MY26", cls: "GLE · GLS", name: "Mercedes-Maybach GLS 600", msrp: 295000000, cash: 5, free: "24/36개월 무이자", note: "재구매 시 +9% / 타 프리미엄 브랜드 보유 시 +7%", guide: "gls" },
    { my: "MY26", cls: "GLE · GLS", name: "Mercedes-Maybach GLS 600 MANUFAKTUR", msrp: 337000000, cash: 5, free: "24/36개월 무이자", note: "재구매 시 +9% / 타 프리미엄 브랜드 보유 시 +7%", guide: "gls" },

    /* ---------- G-Class ---------- */
    { my: "MY26", cls: "G-Class", name: "G 450 d", msrp: 194900000, cash: 0, guide: "g-class" },
    { my: "MY26", cls: "G-Class", name: "G 450 d MANUFAKTUR", msrp: 219100000, cash: 0, guide: "g-class" },
    { my: "MY26", cls: "G-Class", name: "Mercedes-AMG G 63", msrp: 262600000, cash: 0, free: "24/36개월 무이자", note: "11월 출고 시 G-Class 캐리어 (선착순)", guide: "amg-g63" },
    { my: "MY26", cls: "G-Class", name: "Mercedes-AMG G 63 MANUFAKTUR", msrp: 289800000, cash: 0, free: "24/36개월 무이자", note: "11월 출고 시 G-Class 캐리어 (선착순)", guide: "amg-g63" },
    { my: "MY26", cls: "G-Class", name: "G 580 with EQ Technology", msrp: 216100000, cash: 0, guide: "g-class" },

    /* ---------- EQ · Electric ---------- */
    { my: "MY26", cls: "EQ · Electric", name: "EQE 350+", msrp: 110000000, cash: 10, free: "24/36개월 무이자", guide: "eqe" },
    { my: "MY26", cls: "EQ · Electric", name: "EQE 350+ SUV", msrp: 106000000, cash: 10, free: "24/36개월 무이자", guide: "eqe-suv" },
    { my: "MY26", cls: "EQ · Electric", name: "EQE 500 4MATIC SUV", msrp: 141000000, cash: 10, free: "24/36개월 무이자", guide: "eqe-suv" },
    { my: "MY26", cls: "EQ · Electric", name: "EQS 450 4MATIC SUV", msrp: 166000000, cash: 10, free: "24/36개월 무이자", guide: "eqs-suv" },
    { my: "MY26", cls: "EQ · Electric", name: "EQS 580 4MATIC SUV", msrp: 192000000, cash: 10, free: "24/36개월 무이자", guide: "eqs-suv" },
    { my: "MY26", cls: "EQ · Electric", name: "EQA 250 Progressive", msrp: 70000000, cash: 0, note: "11월 할인 조건은 상담 시 안내" },
    { my: "MY26", cls: "EQ · Electric", name: "EQB 300 4MATIC Progressive", msrp: 78800000, cash: 0, note: "11월 할인 조건은 상담 시 안내" },
  ]
};
