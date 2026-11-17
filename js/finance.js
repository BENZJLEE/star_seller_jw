/* ==========================================================================
   이달의 벤츠파이낸셜 금융 혜택
   --------------------------------------------------------------------------
   매월 이 파일만 바꾸면 첫 화면의 "금융 혜택" 섹션이 함께 바뀝니다.

   ※ 고객에게 안내 가능한 내용만 입력하세요.
     영업사원 · 회사 내부용 프로그램은 넣지 마세요.

   points : 위쪽 카드 6장 (big = 크게 보이는 숫자, title = 제목, desc = 설명)
   groups : 아래 "차종별 금융 조건" 표
     my    연식
     name  모델명
     star  true 면 ★ 최대 혜택 모델
     add   금융 이용 시 추가 할인 (예: "+4%")   없으면 ""
     rate  일반 할부 금리 (%)                   기준은 basis 참고
     sure  잔가보장형 할부 MB-SURE 금리 (%)
     free  무이자 할부 조건 (예: "24개월 · 선수금 65%")   없으면 ""
     lease true 면 특별 운용리스 대상
   ========================================================================== */

window.FINANCE = {
  month: "2026년 11월",
  basis: "60개월 · 선수금 30% 기준",

  points: [
    { big: "0%", title: "무이자 할부", desc: "24개월(일부 차종은 36개월도 가능) 무이자 할부. 선수금은 차량가의 65%, E 200은 75%입니다.", sub: "C 200 · E 200 · E 300 · S 450 · GLB · GLC · GLE · GLS · G 63 · EQE · EQS 등" },
    { big: "3.86%", title: "저금리 할부", desc: "GLE 450 4MATIC · Coupé는 연 3.86%. GLS · AMG 주요 모델 4.26%, GLB 250 5.26%, C 200 5.33%, E 200 5.80%대.", sub: "60개월 · 선수금 30% 기준" },
    { big: "4.80%", title: "잔가보장형 할부 MB-SURE", desc: "만기 때 차량 가치를 미리 보장받아 월 납입금을 낮추는 할부입니다. GLE 450 연 4.80%부터.", sub: "60개월 · 선수금 30% 기준" },
    { big: "+5%", title: "금융 이용 시 추가 할인", desc: "벤츠파이낸셜을 이용하면 차량 할인에 더해지는 추가 할인. E 200 EXCLUSIVE(26년식) +5%, 주요 모델 +4%.", sub: "모델 · 연식에 따라 +1~5%" },
    { big: "교환", title: "신차 · 타이어 교환 서비스", desc: "할부 이용 시 신차교환서비스, MB-SURE · 운용리스 이용 시 타이어교환서비스까지 함께 제공됩니다.", sub: "금융리스는 제외" },
    { big: "−0.4%", title: "다시 이용하는 고객 금리 인하", desc: "벤츠파이낸셜을 이용 중이거나 이용했던 고객은 할부 · MB-SURE 금리가 약 0.4% 낮아집니다. 리스 · 장기렌트도 인하 혜택이 있습니다.", sub: "금융 종료 후 5년까지" }
  ],

  /* 제휴 법인 · 사업자 고객 전용 */
  fleet: "제휴 법인(MOU) 임직원 · 사업자 고객은 일반 금리 대신 연 5.98% 특별 할부(60개월)를 이용하실 수 있습니다. 일부 차종 · 특별 상품은 제외됩니다.",

  groups: [
    { cls: "A · GLA · GLB", rows: [
      { my: "MY26", name: "GLB 250 4MATIC", star: true, add: "+4%", rate: 5.26, sure: 5.68, free: "24개월 · 선수금 65%", lease: true },
      { my: "MY26", name: "Mercedes-AMG GLB 35 4MATIC", star: true, add: "+4%", rate: 4.08, sure: 4.87, free: "24개월 · 선수금 65%", lease: true },
      { my: "MY26", name: "Mercedes-AMG A 45 S 4MATIC+", add: "+4%", rate: 6.60, sure: 6.43, free: "24개월 · 선수금 65%" },
      { my: "MY27", name: "GLA 250 4MATIC AMG Line", add: "+4%", rate: 6.60, sure: 6.43, free: "" }
    ] },
    { cls: "C-Class", rows: [
      { my: "MY26", name: "C 200 AVANTGARDE", star: true, add: "+4%", rate: 5.33, sure: 5.73, free: "24개월 · 선수금 65%", lease: true },
      { my: "MY26", name: "C 200 AMG Line", star: true, add: "+4%", rate: 5.33, sure: 5.73, free: "24개월 · 선수금 65%", lease: true }
    ] },
    { cls: "E-Class", rows: [
      { my: "MY27", name: "E 200 EXCLUSIVE", star: true, add: "+4%", rate: 5.80, sure: 6.10, free: "24개월 · 선수금 75%", lease: true },
      { my: "MY27", name: "E 200 AMG Line", star: true, add: "+3%", rate: 5.82, sure: 6.11, free: "24개월 · 선수금 75%", lease: true },
      { my: "MY26", name: "E 200 EXCLUSIVE", star: true, add: "+5%", rate: 5.87, sure: 5.64, free: "24개월 · 선수금 75%" },
      { my: "MY26", name: "E 200 AMG Line", star: true, add: "+4%", rate: 5.88, sure: 5.66, free: "24개월 · 선수금 75%" },
      { my: "MY26", name: "E 300 4MATIC EXCLUSIVE", star: true, add: "+4%", rate: 5.33, sure: 5.72, free: "24개월 · 선수금 65%" },
      { my: "MY26", name: "E 300 4MATIC AMG Line", star: true, add: "+4%", rate: 5.33, sure: 5.72, free: "24개월 · 선수금 65%" },
      { my: "MY27", name: "E 300 4MATIC EXCLUSIVE", add: "+4%", rate: 6.60, sure: 6.41, free: "" },
      { my: "MY27", name: "E 300 4MATIC AMG Line", add: "+4%", rate: 6.60, sure: 6.41, free: "" },
      { my: "MY26", name: "Mercedes-AMG E 53 HYBRID 4MATIC+", add: "", rate: 4.26, sure: 5.02, free: "24 · 36개월 · 선수금 65%", lease: true }
    ] },
    { cls: "S-Class", rows: [
      { my: "MY26", name: "S 450 4MATIC", star: true, add: "할부 +4% · 리스/렌트 +6%", rate: 5.40, sure: 5.75, free: "24개월 · 선수금 65%" },
      { my: "MY26", name: "Mercedes-AMG S 63 E PERFORMANCE", add: "", rate: 4.26, sure: 5.02, free: "24 · 36개월 · 선수금 65%", lease: true }
    ] },
    { cls: "GLC", rows: [
      { my: "MY26", name: "GLC 300 4MATIC AMG Line", star: true, add: "+4%", rate: 5.28, sure: 5.69, free: "24개월 · 선수금 65%" },
      { my: "MY26", name: "GLC 300 4MATIC Coupé AMG Line", star: true, add: "+4%", rate: 5.28, sure: 5.69, free: "24개월 · 선수금 65%" },
      { my: "MY26", name: "GLC 300 4MATIC AVANTGARDE", star: true, add: "+4%", rate: 5.39, sure: 5.75, free: "24개월 · 선수금 65%" },
      { my: "MY26", name: "GLC 300 4MATIC Coupé AVANTGARDE", star: true, add: "+4%", rate: 5.39, sure: 5.75, free: "24개월 · 선수금 65%" },
      { my: "MY27", name: "GLC 300 4MATIC Coupé AVANTGARDE", star: true, add: "+1%", rate: 5.65, sure: 5.99, free: "24개월 · 선수금 65%", lease: true },
      { my: "MY27", name: "GLC 300 4MATIC Coupé AMG Line", star: true, add: "+1%", rate: 5.65, sure: 5.99, free: "24개월 · 선수금 65%", lease: true },
      { my: "MY27", name: "GLC 300 4MATIC AVANTGARDE", add: "+1%", rate: 6.60, sure: 6.43, free: "" },
      { my: "MY27", name: "GLC 300 4MATIC AMG Line", add: "+1%", rate: 6.60, sure: 6.43, free: "" }
    ] },
    { cls: "GLE · GLS", rows: [
      { my: "MY26", name: "GLE 450 4MATIC", star: true, add: "+4%", rate: 3.86, sure: 4.80, free: "24 · 36개월 · 선수금 65%" },
      { my: "MY26", name: "GLE 450 4MATIC Coupé", star: true, add: "+4%", rate: 3.86, sure: 4.80, free: "24 · 36개월 · 선수금 65%" },
      { my: "MY26", name: "GLE 350 4MATIC", add: "", rate: 4.26, sure: 5.02, free: "24 · 36개월 · 선수금 65%", lease: true },
      { my: "MY26", name: "GLE 450 d 4MATIC Coupé", add: "", rate: 4.26, sure: 5.02, free: "24 · 36개월 · 선수금 65%", lease: true },
      { my: "MY26", name: "Mercedes-AMG GLE 53 4MATIC+ · Coupé", add: "", rate: 4.26, sure: 5.02, free: "24 · 36개월 · 선수금 65%", lease: true },
      { my: "MY26", name: "GLS 450 4MATIC · GLS 580 4MATIC", add: "", rate: 4.26, sure: 5.02, free: "24 · 36개월 · 선수금 65%", lease: true },
      { my: "MY26", name: "Mercedes-AMG GLS 63 4MATIC+", add: "", rate: 4.47, sure: 5.13, free: "24 · 36개월 · 선수금 65%", lease: true },
      { my: "MY26", name: "Mercedes-Maybach GLS 600", add: "", rate: 4.35, sure: 5.07, free: "24 · 36개월 · 선수금 65%", lease: true }
    ] },
    { cls: "G-Class · 전기차", rows: [
      { my: "", name: "Mercedes-AMG G 63", add: "", rate: 4.50, sure: 5.15, free: "24 · 36개월 · 선수금 65%", lease: true },
      { my: "MY27", name: "EQS 400", add: "", rate: 4.19, sure: 4.88, free: "24 · 36개월 · 선수금 65%", lease: true },
      { my: "MY26", name: "EQE · EQE SUV", add: "", rate: 4.19, sure: 4.88, free: "24 · 36개월 · 선수금 65%", lease: true },
      { my: "", name: "EQS SUV", add: "", rate: 4.19, sure: 4.88, free: "24 · 36개월 · 선수금 65%", lease: true }
    ] }
  ],

  others: "표에 없는 모델은 일반 금리(할부 연 7.43~7.63%, MB-SURE 연 7.16~7.20%)가 적용됩니다.",
  note: "벤츠파이낸셜 금융 상품은 금융 심사 결과에 따라 이용이 제한되거나 조건이 달라질 수 있습니다. 금리 · 선수금 · 기간 · 대상 차종은 재고와 시기에 따라 사전 고지 없이 변경 · 종료될 수 있으며, 정확한 월 납입금은 상담 시 견적으로 안내해 드립니다."
};

/* ----- 화면 그리기 (수정할 필요 없습니다) ----- */
(function () {
  "use strict";
  var F = window.FINANCE, sec = document.getElementById("finance");
  if (!F || !sec || !F.points || !F.points.length) return;
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function pct(n) { return n ? n.toFixed(2) + "%" : "–"; }
  var m = (F.month || "").replace(/^\d+년\s*/, "");
  document.getElementById("finTitle").textContent = m + " 벤츠파이낸셜 금융 혜택";
  document.getElementById("finPoints").innerHTML = F.points.map(function (p) {
    return '<article class="fin-card"><p class="fin-card__big">' + esc(p.big) + '</p><h3 class="fin-card__title">' + esc(p.title) + '</h3><p class="fin-card__desc">' + esc(p.desc) + "</p>" +
      (p.sub ? '<p class="fin-card__sub">' + esc(p.sub) + "</p>" : "") + "</article>";
  }).join("");
  document.getElementById("finFleet").textContent = F.fleet || "";
  document.getElementById("finFleetBox").hidden = !F.fleet;
  document.getElementById("finBasis").textContent = F.basis || "";
  document.getElementById("finRows").innerHTML = (F.groups || []).map(function (g) {
    return '<tr class="fin-table__cls"><th colspan="6" scope="colgroup">' + esc(g.cls) + "</th></tr>" + g.rows.map(function (r) {
      return "<tr><th scope=\"row\">" + (r.my ? '<span class="fin-my">' + esc(r.my) + "</span>" : "") + esc(r.name) + (r.star ? ' <i class="fin-star" title="최대 혜택 모델">★</i>' : "") + "</th>" +
        "<td>" + (r.add ? esc(r.add) : "–") + "</td><td><b>" + pct(r.rate) + "</b></td><td>" + pct(r.sure) + "</td>" +
        "<td>" + (r.free ? "0% · " + esc(r.free) : "–") + "</td><td>" + (r.lease ? "특별 리스" : "–") + "</td></tr>";
    }).join("");
  }).join("");
  document.getElementById("finOthers").textContent = F.others || "";
  document.getElementById("finNote").textContent = "※ " + F.month + " 기준 · " + (F.note || "");
  sec.hidden = false;
})();
