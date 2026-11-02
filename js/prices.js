/* ==========================================================================
   가격 계산 도우미 — 첫 화면과 가격표 페이지가 함께 사용합니다.
   데이터 수정은 js/pricing.js 에서 하세요.
   ========================================================================== */
(function () {
  "use strict";

  var P = window.PRICING || { items: [] };

  function key(it) { return it.my + " " + it.name; }

  function calc(it) {
    var cashAmt = Math.round(it.msrp * (it.cash || 0) / 100) + (it.cashWon || 0);
    var mbfAmt = Math.round(it.msrp * (it.mbf || 0) / 100);
    // 최종가는 만원 미만 절사, 할인액은 차량가 − 최종가
    var finalPrice = Math.floor((it.msrp - cashAmt - mbfAmt) / 10000) * 10000;
    var discount = it.msrp - finalPrice;
    return {
      item: it,
      key: key(it),
      msrp: it.msrp,
      cashAmt: cashAmt,
      mbfAmt: mbfAmt,
      discount: discount,
      final: finalPrice,
      cashFinal: it.msrp - cashAmt,
      rate: it.msrp ? Math.round(discount / it.msrp * 1000) / 10 : 0,
      hasDiscount: discount > 0
    };
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
    var lines = ["[" + P.month + " 조건 견적 문의] " + it.name + " (" + it.my + ")",
      "· 차량가 " + won(c.msrp)];
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
    won: won,
    rateText: rateText,
    quoteMessage: quoteMessage
  };
})();
