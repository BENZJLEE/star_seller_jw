/* ==========================================================================
   가격 계산 도우미 — 첫 화면과 가격표 페이지가 함께 사용합니다.
   데이터 수정은 js/pricing.js 에서 하세요.
   ========================================================================== */
(function () {
  "use strict";

  var P = window.PRICING || { items: [] };

  function key(it) { return it.my + " " + it.name; }

  /* 판매가 계산 (딜러 견적 방식)
     차량가 ÷ 1.1 → 부가세 제외 금액에서 할인율 차감 → × 1.1 → 만원 미만 절사
     각 단계는 원 단위로 반올림합니다. 정액 할인(minusWon)은 부가세 포함 금액에서 뺍니다. */
  function salePrice(msrp, ratePct, minusWon) {
    var excl = Math.round(msrp / 1.1);
    var discExcl = Math.round(excl * (1 - (ratePct || 0) / 100));
    var incl = Math.round(discExcl * 1.1) - (minusWon || 0);
    return Math.floor(incl / 10000) * 10000;
  }

  function calc(it) {
    var cashFinal = salePrice(it.msrp, it.cash, it.cashWon);
    var finalPrice = salePrice(it.msrp, (it.cash || 0) + (it.mbf || 0), it.cashWon);
    var cashAmt = it.msrp - cashFinal;
    var mbfAmt = cashFinal - finalPrice;
    var discount = it.msrp - finalPrice;
    return {
      item: it,
      key: key(it),
      msrp: it.msrp,
      cashAmt: cashAmt,
      mbfAmt: mbfAmt,
      discount: discount,
      final: finalPrice,
      cashFinal: cashFinal,
      rate: it.msrp ? Math.round(discount / it.msrp * 1000) / 10 : 0,
      hasDiscount: discount > 0,
      priceTBD: !it.msrp   // 가격 미확정: 할인율만 표시
    };
  }

  // 한정 특가 재고: 총 할인율(rate) 하나로 계산
  function calcSpecial(sp) {
    var finalPrice = salePrice(sp.msrp, sp.rate);
    var q = sp.quote;
    var reg = q && q.reg ? q.reg : regCost(finalPrice);
    return { item: sp, key: key(sp), msrp: sp.msrp, final: finalPrice, discount: sp.msrp - finalPrice,
      reg: reg, regEstimated: !(q && q.reg),
      upfront: q ? q.down + reg : finalPrice + reg };   // 할부: 선수금 + 등록비 / 현금: 차량가 + 등록비
  }

  /* 등록비용 추정 (경기 등록 기준, 견적서가 없을 때만 사용)
     취득세 7% (공급가 기준, 10원 미만 절사) + 공채 할인 약 0.96% (최근 견적서 기준) + 등록 부대비용 8만원 */
  function regCost(finalPrice) {
    var supply = Math.round(finalPrice / 1.1);
    return Math.floor(supply * 0.07 / 10) * 10 + Math.round(supply * 0.0096) + 80000;
  }

  function specialMessage(s) {
    var sp = s.item, q = sp.quote;
    var lines = ["[한정 특가 재고 문의] " + sp.name + " (" + sp.my + ")",
      "· 차량가 " + won(s.msrp) + " → 특가 " + won(s.final) + " (" + sp.rateText + ")"];
    if (q) lines.push("· 견적 예시: 선수금 " + q.downRate + "% · " + q.months + "개월 " + (q.apr ? q.apr + "%" : "무이자") + " · 월 " + q.monthly.toLocaleString("ko-KR") + "원");
    return lines.join("\n");
  }

  // 원 → "6,200만원" / "1억 1,542만원"
  function won(n) {
    var man = Math.round(n / 10000);
    var eok = Math.floor(man / 10000);
    var rest = man % 10000;
    if (eok && rest) return eok + "억 " + rest.toLocaleString("ko-KR") + "만원";
    if (eok) return eok + "억원";
    return man.toLocaleString("ko-KR") + "만원";
  }

  function rateText(it) {
    var parts = [];
    if (it.cash) parts.push("할인 " + it.cash + "%");
    if (it.cashWon) parts.push(won(it.cashWon) + " 할인");
    if (it.mbf) parts.push("벤츠파이낸셜 +" + it.mbf + "%");
    return parts.join(" · ");
  }

  function quoteMessage(c) {
    var it = c.item;
    var lines = ["[" + P.month + " 조건 견적 문의] " + it.name + " (" + it.my + ")"];
    if (c.priceTBD) {
      lines.push("· 할인 " + rateText(it) + " (차량가 상담 시 안내)");
      return lines.join("\n");
    }
    lines.push("· 차량가 " + won(c.msrp));
    if (c.hasDiscount) {
      lines.push("· 할인 " + won(c.discount) + " (" + rateText(it) + ")");
      lines.push("· 최종가 " + won(c.final) + (it.mbf ? " (" + (it.mbfNote || "벤츠파이낸셜 이용 시") + ")" : ""));
    }
    return lines.join("\n");
  }

  window.PriceKit = {
    data: P,
    all: function () { return P.items.map(calc); },
    find: function (k) {
      for (var i = 0; i < P.items.length; i++) if (key(P.items[i]) === k) return calc(P.items[i]);
      return null;
    },
    featured: function () {
      return (P.featured || []).map(this.find).filter(Boolean);
    },
    down: function (it) { return it && it.free ? (it.down || P.freeDown || 0) : 0; },
    specials: function () { return (P.specials || []).map(calcSpecial); },
    findSpecial: function (k) {
      var list = (P.specials || []);
      for (var i = 0; i < list.length; i++) if (key(list[i]) === k) return calcSpecial(list[i]);
      return null;
    },
    won: won,
    rateText: rateText,
    quoteMessage: quoteMessage,
    specialMessage: specialMessage
  };
})();
