/* ==========================================================================
   Mercedes-Benz Personal Guide — main.js
   내용 수정은 js/config.js 와 js/models.js 에서 하세요.
   ========================================================================== */
(function () {
  "use strict";

  var CFG = window.SITE_CONFIG || {};
  var MODELS = window.MODELS || [];
  var $ = function (s, el) { return (el || document).querySelector(s); };
  var $$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };

  var CATEGORY_LABEL = { sedan: "Sedan", suv: "SUV", electric: "Electric", amg: "AMG / Performance" };

  function esc(str) {
    return String(str == null ? "" : str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ------------------------------------------------------------------
     1. 설정값 반영
     ------------------------------------------------------------------ */
  function applyConfig() {
    $$("[data-cfg]").forEach(function (el) {
      var v = CFG[el.getAttribute("data-cfg")];
      if (v) el.textContent = v;
    });

    var a = CFG.affiliation || {};
    var roleLine = a.enabled
      ? a.company + " " + a.showroom + " · " + CFG.name + " " + a.title
      : (CFG.neutralTitle || "메르세데스-벤츠 세일즈 컨설턴트") + " " + CFG.name;
    $$("[data-role-line]").forEach(function (el) { el.textContent = roleLine; });

    if (a.enabled && a.address) {
      $$("[data-address]").forEach(function (el) { el.textContent = a.address; el.hidden = false; });
    }

    if (CFG.phone) {
      var tel = "tel:" + CFG.phone.replace(/[^0-9+]/g, "");
      $$("[data-tel]").forEach(function (el) { el.setAttribute("href", tel); });
    }
    if (CFG.kakao) {
      $$("[data-kakao]").forEach(function (el) { el.setAttribute("href", CFG.kakao); });
    }

    var sns = CFG.sns || {};
    var snsNames = { youtube: "YouTube", instagram: "Instagram", blog: "Blog" };
    $("#snsLinks").innerHTML = Object.keys(snsNames).filter(function (k) { return sns[k]; }).map(function (k) {
      return '<a href="' + esc(sns[k]) + '" target="_blank" rel="noopener">' + snsNames[k] + "</a>";
    }).join("");

    var promos = CFG.promotions || [];
    var box = $("#promoBox");
    if (promos.length) {
      box.innerHTML = '<p class="promo__label">THIS MONTH</p>' + promos.map(function (p) {
        return '<div class="promo__item"><p class="promo__month">' + esc(p.month) + "</p><h3>" + esc(p.title) + "</h3>" +
          (p.desc ? "<p>" + esc(p.desc) + "</p>" : "") + "</div>";
      }).join("");
    } else {
      box.innerHTML = '<p class="promo__label">MONTHLY PROMOTION</p>' +
        '<p class="promo__empty">모델과 계약 조건에 따라 적용 가능한 혜택이 달라집니다. 자세한 내용은 상담을 통해 확인해 주세요.</p>';
    }

    // 프로필 사진: 파일이 있을 때만 표시
    var photo = $(".about__photo");
    var img = photo && photo.querySelector("img");
    if (img) {
      img.addEventListener("load", function () { photo.hidden = false; });
      img.addEventListener("error", function () { photo.remove(); });
      if (img.complete && img.naturalWidth) photo.hidden = false;
    }
  }

  /* ------------------------------------------------------------------
     2. 차량 실루엣 일러스트 (사진이 없을 때 사용)
     ------------------------------------------------------------------ */
  var SHAPES = {
    sedan: {
      body: "M40 186 C40 160 66 150 112 145 L232 132 C282 92 342 70 432 68 C520 66 582 88 640 128 L722 140 C760 146 772 164 770 188 L766 204 L44 204 Z",
      glass: "M258 131 C302 96 352 82 428 80 C496 79 546 96 600 128 Z",
      pillar: "M432 80 L438 128", belt: "M70 162 L748 156", wheels: [190, 620], r: 38, head: [732, 150], tail: [44, 158]
    },
    coupe: {
      body: "M40 186 C42 164 70 156 120 152 L250 140 C318 94 376 80 436 80 C520 80 592 108 654 138 L730 148 C764 154 772 170 770 190 L766 204 L44 204 Z",
      glass: "M272 138 C330 102 380 92 436 92 C500 92 544 110 596 136 Z",
      pillar: "M440 92 L446 136", belt: "M70 166 L748 160", wheels: [190, 620], r: 38, head: [732, 158], tail: [44, 164]
    },
    "ev-sedan": {
      body: "M40 188 C40 166 70 154 120 150 L210 142 C288 88 360 70 440 70 C540 72 612 106 682 140 L732 148 C764 154 772 170 770 190 L766 204 L44 204 Z",
      glass: "M234 141 C300 98 362 84 438 84 C518 86 578 110 628 139 Z",
      pillar: "M444 84 L450 139", belt: "M70 166 L748 160", wheels: [190, 620], r: 38, head: [726, 156], tail: [44, 162]
    },
    suv: {
      body: "M40 200 L42 136 C44 120 58 112 84 110 L188 104 C236 68 280 54 360 52 L560 52 C612 54 652 78 692 108 L742 118 C764 124 772 142 770 174 L766 204 L44 204 Z",
      glass: "M208 105 C250 76 288 66 360 65 L548 65 C592 66 626 84 664 107 Z",
      pillar: "M440 65 L444 107", belt: "M66 150 L752 146", wheels: [182, 628], r: 42, head: [738, 130], tail: [44, 136]
    },
    "large-suv": {
      body: "M36 200 L38 116 C40 100 52 92 78 90 L170 86 C218 58 262 48 340 48 L600 48 C642 50 670 74 702 104 L744 116 C766 122 772 142 770 174 L766 204 L40 204 Z",
      glass: "M100 92 L160 88 C212 62 262 60 340 60 L588 60 C626 62 652 82 678 104 L100 104 Z",
      pillar: "M330 60 L330 104 M500 60 L502 104", belt: "M60 148 L752 144", wheels: [176, 640], r: 42, head: [740, 128], tail: [40, 132]
    },
    "ev-suv": {
      body: "M40 200 L42 144 C44 124 60 116 92 112 L202 102 C262 64 314 52 392 52 L540 54 C612 58 662 88 702 114 L742 122 C764 128 772 146 770 176 L766 204 L44 204 Z",
      glass: "M222 103 C272 72 318 64 392 64 L534 66 C594 70 636 90 670 112 Z",
      pillar: "M450 65 L454 111", belt: "M66 154 L752 150", wheels: [184, 628], r: 42, head: [736, 136], tail: [44, 142]
    },
    offroad: {
      body: "M52 204 L52 120 C52 114 56 110 64 110 L128 108 L156 54 L588 54 L640 104 L736 112 C752 114 760 122 760 136 L760 204 Z",
      glass: "M172 64 L582 64 L622 104 L148 104 Z",
      pillar: "M306 64 L306 104 M452 64 L452 104", belt: "M56 146 L756 146", wheels: [176, 628], r: 44, head: [744, 124], tail: [52, 126],
      extra: '<rect x="30" y="118" width="22" height="64" rx="8" class="c-wheel"/>'
    }
  };

  function carSVG(shape, light) {
    var s = SHAPES[shape] || SHAPES.sedan;
    var wy = 204;
    var wheels = s.wheels.map(function (x) {
      return '<circle class="c-wheel" cx="' + x + '" cy="' + wy + '" r="' + s.r + '"/>' +
        '<circle class="c-rim" cx="' + x + '" cy="' + wy + '" r="' + Math.round(s.r * 0.6) + '"/>';
    }).join("");
    return '<svg class="car' + (light ? " car--light" : "") + '" viewBox="0 0 800 260" role="img" aria-hidden="true" focusable="false">' +
      '<ellipse class="c-shadow" cx="404" cy="' + (wy + s.r - 2) + '" rx="380" ry="12"/>' +
      (s.extra || "") +
      '<path class="c-body" d="' + s.body + '"/>' +
      '<path class="c-glass" d="' + s.glass + '"/>' +
      '<path class="c-line" d="' + s.pillar + '" stroke-width="3"/>' +
      '<path class="c-line" d="' + s.belt + '"/>' +
      '<rect class="c-light" x="' + s.head[0] + '" y="' + s.head[1] + '" width="28" height="6" rx="3"/>' +
      '<rect class="c-tail" x="' + s.tail[0] + '" y="' + s.tail[1] + '" width="22" height="6" rx="3"/>' +
      wheels + "</svg>";
  }

  function visualHTML(m, light) {
    if (m.image) return '<img src="' + esc(m.image) + '" alt="' + esc(m.name) + '" loading="lazy" width="800" height="450">';
    return carSVG(m.shape, light);
  }

  function injectDefs() {
    var defs = document.createElement("div");
    defs.setAttribute("aria-hidden", "true");
    defs.style.cssText = "position:absolute;width:0;height:0;overflow:hidden";
    defs.innerHTML =
      '<svg width="0" height="0"><defs>' +
      '<linearGradient id="gBody" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6b7079"/><stop offset=".5" stop-color="#2a2d32"/><stop offset="1" stop-color="#0e0f11"/></linearGradient>' +
      '<linearGradient id="gGlass" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#15171a"/><stop offset="1" stop-color="#3b4049"/></linearGradient>' +
      '<linearGradient id="gBodyL" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f4f5f6"/><stop offset=".55" stop-color="#c7cacf"/><stop offset="1" stop-color="#8f939a"/></linearGradient>' +
      "</defs></svg>";
    document.body.insertBefore(defs, document.body.firstChild);
    var hero = $(".hero__car");
    if (hero) hero.innerHTML = carSVG(hero.getAttribute("data-shape"), false);
  }

  /* ------------------------------------------------------------------
     3. 헤더 · 메뉴
     ------------------------------------------------------------------ */
  function initHeader() {
    var header = $("#header"), nav = $("#nav"), btn = $("#menuBtn");
    var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 40); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    function setMenu(open) {
      nav.classList.toggle("is-open", open);
      header.classList.toggle("menu-open", open);
      btn.setAttribute("aria-expanded", String(open));
      btn.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
      document.body.style.overflow = open ? "hidden" : "";
    }
    btn.addEventListener("click", function () { setMenu(btn.getAttribute("aria-expanded") !== "true"); });
    nav.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && nav.classList.contains("is-open")) { setMenu(false); btn.focus(); } });

    if ("IntersectionObserver" in window) {
      var links = $$(".nav a[href^='#']:not(.nav__cta)");
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          links.forEach(function (l) { l.classList.toggle("is-current", l.getAttribute("href") === "#" + en.target.id); });
        });
      }, { rootMargin: "-45% 0px -50% 0px" });
      links.forEach(function (l) { var t = $(l.getAttribute("href")); if (t) io.observe(t); });
    }
  }

  /* ------------------------------------------------------------------
     4. 차량 가이드 (필터 · 상세)
     ------------------------------------------------------------------ */
  function renderModels(filter) {
    var list = MODELS.filter(function (m) { return filter === "all" || m.category === filter; });
    $("#modelGrid").innerHTML = list.map(function (m, i) {
      return '<article class="card" style="animation-delay:' + (i * 50) + 'ms">' +
        '<div class="card__visual">' + visualHTML(m, true) + "</div>" +
        '<div class="card__body">' +
        '<p class="card__cat">' + CATEGORY_LABEL[m.category] + "</p>" +
        '<h3 class="card__name">' + esc(m.name) + "</h3>" +
        '<p class="card__tag">' + esc(m.tagline) + "</p>" +
        '<p class="card__for"><b>RECOMMENDED FOR</b>' + esc(m.forWho) + "</p>" +
        '<div class="card__actions">' +
        '<button type="button" class="btn btn--outline" data-detail="' + m.id + '">자세히 보기</button>' +
        '<button type="button" class="btn btn--dark" data-consult="' + m.id + '">상담하기</button>' +
        "</div></div></article>";
    }).join("");
  }

  function findModel(id) {
    for (var i = 0; i < MODELS.length; i++) if (MODELS[i].id === id) return MODELS[i];
    return null;
  }

  function initModels() {
    renderModels("all");
    $$(".filter").forEach(function (b) {
      b.addEventListener("click", function () {
        $$(".filter").forEach(function (x) {
          var on = x === b;
          x.classList.toggle("is-active", on);
          x.setAttribute("aria-pressed", String(on));
        });
        renderModels(b.getAttribute("data-filter"));
      });
    });

    var modal = $("#modelModal");
    var lastFocus = null;
    var current = null;

    $("#modelGrid").addEventListener("click", function (e) {
      var d = e.target.closest("[data-detail]");
      var c = e.target.closest("[data-consult]");
      if (d) openModal(findModel(d.getAttribute("data-detail")), d);
      if (c) goContact({ modelId: c.getAttribute("data-consult") });
    });

    function openModal(m, trigger) {
      if (!m) return;
      current = m;
      lastFocus = trigger;
      $("#modalVisual").innerHTML = visualHTML(m, true);
      $("#modalCat").textContent = CATEGORY_LABEL[m.category];
      $("#modalTitle").textContent = m.name;
      $("#modalTagline").textContent = m.tagline;
      $("#modalFor").textContent = m.forWho;
      $("#modalDrive").textContent = m.drive;
      $("#modalSpace").textContent = m.space;
      $("#modalConsider").textContent = m.consider;
      if (typeof modal.showModal === "function") modal.showModal(); else modal.setAttribute("open", "");
      document.body.style.overflow = "hidden";
    }
    function closeModal() {
      if (typeof modal.close === "function") modal.close(); else modal.removeAttribute("open");
    }
    modal.addEventListener("close", function () {
      document.body.style.overflow = "";
      if (lastFocus) lastFocus.focus();
    });
    modal.addEventListener("click", function (e) {
      if (e.target === modal || e.target.closest("[data-close]")) closeModal();
    });
    $("#modalCta").addEventListener("click", function () {
      lastFocus = null;
      closeModal();
      if (current) goContact({ modelId: current.id });
    });
  }

  /* ------------------------------------------------------------------
     5. 나에게 맞는 벤츠 찾기 (규칙 기반 추천)
     ------------------------------------------------------------------ */
  var QUESTIONS = [
    { key: "purpose", q: "차량의 주 사용 목적은 무엇인가요?", opts: [
      ["commute", "출퇴근 · 일상 이동"], ["family", "가족과 함께 이동"], ["business", "업무 · 의전"], ["leisure", "여행 · 레저"]] },
    { key: "seats", q: "평소 몇 명이 탑승하나요?", opts: [
      ["1", "1~2명"], ["3", "3~4명"], ["5", "5명 이상"]] },
    { key: "body", q: "선호하는 차체 유형은 무엇인가요?", opts: [
      ["sedan", "세단 · 쿠페"], ["suv", "SUV"], ["any", "상관없어요"]] },
    { key: "budget", q: "희망 예산은 어느 정도인가요?",
      hint: "정확한 가격은 트림과 시기, 구매 조건에 따라 달라 상담 시 안내드립니다.", opts: [
      ["1", "합리적인 엔트리 등급"], ["2", "중형 프리미엄 등급"], ["3", "상위 등급"], ["4", "최상위 플래그십"]] },
    { key: "charge", q: "전기차 충전 환경이 갖춰져 있나요?", opts: [
      ["yes", "집 · 회사에서 충전 가능"], ["public", "공용 충전소 이용 가능"], ["no", "충전 환경이 없어요"]] },
    { key: "priority", q: "가장 중요하게 생각하는 것은 무엇인가요?", opts: [
      ["comfort", "승차감"], ["space", "공간"], ["design", "디자인"], ["performance", "성능"]] }
  ];

  var LABELS = {};
  QUESTIONS.forEach(function (q) { LABELS[q.key] = {}; q.opts.forEach(function (o) { LABELS[q.key][o[0]] = o[1]; }); });

  var PURPOSE_REASON = { commute: "출퇴근과 일상 이동에 잘 맞는 성격", family: "가족 이동에 적합한 구성", business: "업무 · 의전 용도에 어울리는 품격", leisure: "여행과 레저에 어울리는 성격" };
  var PRIORITY_REASON = { comfort: "중시하시는 승차감이 강점", space: "중시하시는 공간 활용이 강점", design: "디자인 만족도가 높은 모델", performance: "주행 성능을 중시하는 분께 적합" };
  var SEDAN_SHAPES = ["sedan", "coupe", "ev-sedan"];

  function scoreModel(m, a) {
    var score = 0, why = [];
    if (m.fit.indexOf(a.purpose) > -1) { score += 3; why.push(PURPOSE_REASON[a.purpose]); }
    if (m.fit.indexOf(a.priority) > -1) { score += 3; why.push(PRIORITY_REASON[a.priority]); }

    var isSedan = SEDAN_SHAPES.indexOf(m.shape) > -1;
    if (a.body === "sedan") { if (isSedan) { score += 3; why.push("선호하신 세단형 차체"); } else score -= 4; }
    if (a.body === "suv") { if (!isSedan) { score += 3; why.push("선호하신 SUV 차체"); } else score -= 4; }

    if (a.seats === "5") {
      if (m.seats >= 7) { score += 5; why.unshift("5명 이상 탑승을 고려한 3열 구성"); }
      else if (m.fit.indexOf("space") > -1) score += 1;
      else score -= 3;
    } else if (a.seats === "3" && (m.fit.indexOf("family") > -1 || m.fit.indexOf("space") > -1)) {
      score += 1;
    } else if (a.seats === "1" && m.seats >= 7) {
      score -= 1;
    }

    var budget = Number(a.budget), diff = m.tier - budget;
    score += 3 - 2 * Math.abs(diff) - (diff > 0 ? diff : 0);
    if (diff === 0) why.push("희망하신 예산 등급과 같은 급");

    if (m.ev) {
      if (a.charge === "yes") { score += 2; why.push("충전 환경이 갖춰져 전기차도 좋은 선택"); }
      else if (a.charge === "no") score -= 6;
      else score -= 1;
    }
    return { model: m, score: score, why: why };
  }

  function recommend(a) {
    var ranked = MODELS.map(function (m) { return scoreModel(m, a); })
      .sort(function (x, y) { return y.score - x.score; });
    var top = ranked.slice(0, 3);
    // 3위 점수가 1위보다 크게 낮으면 2개만 보여줌
    if (top.length === 3 && top[0].score - top[2].score > 7) top = top.slice(0, 2);
    return top;
  }

  function initFinder() {
    var stepsEl = $("#finderSteps"), form = $("#finderForm"), result = $("#finderResult");
    var prev = $("#finderPrev"), next = $("#finderNext"), err = $("#finderError");
    var idx = 0, answers = {}, lastTop = [];

    stepsEl.innerHTML = QUESTIONS.map(function (q, i) {
      return '<fieldset class="q" data-step="' + i + '"' + (i ? " hidden" : "") + ">" +
        "<legend>" + q.q + "</legend>" +
        (q.hint ? '<p class="q__hint">' + q.hint + "</p>" : "") +
        '<div class="opts">' + q.opts.map(function (o) {
          return '<label class="opt"><input type="radio" name="' + q.key + '" value="' + o[0] + '"><span>' + o[1] + "</span></label>";
        }).join("") + "</div></fieldset>";
    }).join("");

    function show(i) {
      idx = i;
      $$(".q", stepsEl).forEach(function (f, n) { f.hidden = n !== i; });
      $("#finderCount").textContent = (i + 1) + " / " + QUESTIONS.length;
      $("#finderBar").style.width = ((i + 1) / QUESTIONS.length * 100) + "%";
      prev.style.visibility = i ? "visible" : "hidden";
      next.textContent = i === QUESTIONS.length - 1 ? "결과 보기" : "다음";
      err.textContent = "";
    }

    function current() {
      var c = $('input[name="' + QUESTIONS[idx].key + '"]:checked', form);
      return c ? c.value : null;
    }

    // 마우스·터치로 선택하면 자동으로 다음 질문 (키보드 방향키 선택은 그대로 머무름)
    var byPointer = false;
    stepsEl.addEventListener("pointerdown", function () { byPointer = true; });
    stepsEl.addEventListener("change", function () {
      err.textContent = "";
      if (byPointer && idx < QUESTIONS.length - 1) setTimeout(function () { goNext(true); }, 220);
      byPointer = false;
    });

    function goNext(auto) {
      var v = current();
      if (!v) { err.textContent = "하나를 선택해 주세요."; return; }
      answers[QUESTIONS[idx].key] = v;
      if (idx < QUESTIONS.length - 1) {
        show(idx + 1);
        if (!auto) { var first = $('.q[data-step="' + idx + '"] input', stepsEl); if (first) first.focus(); }
      } else {
        showResult();
      }
    }
    next.addEventListener("click", function () { goNext(false); });
    prev.addEventListener("click", function () { if (idx > 0) show(idx - 1); });

    function showResult() {
      lastTop = recommend(answers);
      $("#resultList").innerHTML = lastTop.map(function (r, i) {
        var why = r.why.slice(0, 3);
        return '<li class="result">' +
          '<div class="result__visual">' + visualHTML(r.model, true) + "</div>" +
          '<div><p class="result__name"><small>0' + (i + 1) + "</small>" + esc(r.model.name) + "</p>" +
          '<p class="result__why">' + esc(why.length ? why.join(" · ") : r.model.tagline) + "</p></div></li>";
      }).join("");
      form.hidden = true;
      result.hidden = false;
      result.focus();
    }

    $("#finderReset").addEventListener("click", function () {
      form.reset(); answers = {};
      result.hidden = true; form.hidden = false;
      show(0);
      var first = $('.q[data-step="0"] input', stepsEl); if (first) first.focus();
    });

    $("#resultCta").addEventListener("click", function () {
      var names = lastTop.map(function (r) { return r.model.name; });
      var summary = "[나에게 맞는 벤츠 찾기 결과]\n" +
        QUESTIONS.map(function (q) { return "· " + q.q.replace(/[?？]$/, "") + ": " + LABELS[q.key][answers[q.key]]; }).join("\n") +
        "\n· 추천 후보: " + names.join(", ");
      goContact({ modelId: lastTop[0] && lastTop[0].model.id, message: summary });
    });

    show(0);
  }

  /* ------------------------------------------------------------------
     6. 상담 폼으로 이동 + 자동 입력
     ------------------------------------------------------------------ */
  function goContact(opt) {
    opt = opt || {};
    if (opt.modelId) $("#f-model").value = opt.modelId;
    if (opt.message) {
      var msg = $("#f-msg");
      msg.value = opt.message + (msg.value && msg.value.indexOf("[나에게 맞는") !== 0 ? "\n\n" + msg.value : "");
    }
    var target = $("#contact");
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(function () { $("#f-name").focus({ preventScroll: true }); }, 600);
  }

  /* ------------------------------------------------------------------
     7. 상담 신청 폼
     ------------------------------------------------------------------ */
  var PHONE_RE = /^01[016789]-?\d{3,4}-?\d{4}$/;
  var loadedAt = Date.now();

  function formatPhone(v) {
    var d = v.replace(/\D/g, "").slice(0, 11);
    if (d.length < 4) return d;
    if (d.length < 8) return d.slice(0, 3) + "-" + d.slice(3);
    if (d.length === 10) return d.slice(0, 3) + "-" + d.slice(3, 6) + "-" + d.slice(6);
    return d.slice(0, 3) + "-" + d.slice(3, 7) + "-" + d.slice(7);
  }

  function initForm() {
    var form = $("#contactForm"), status = $("#formStatus"), btn = $("#submitBtn");
    var sel = $("#f-model");
    MODELS.forEach(function (m) { sel.add(new Option(m.name, m.id)); });

    var phone = $("#f-phone");
    phone.addEventListener("input", function () { phone.value = formatPhone(phone.value); });

    $$("[data-prefill-topic]").forEach(function (a) {
      a.addEventListener("click", function () {
        var t = "[" + a.getAttribute("data-prefill-topic") + "] ";
        var msg = $("#f-msg");
        if (msg.value.indexOf(t) !== 0) msg.value = t + msg.value;
      });
    });

    function setErr(id, text, input) {
      $("#e-" + id).textContent = text || "";
      if (input) input.setAttribute("aria-invalid", text ? "true" : "false");
    }

    function validate() {
      var ok = true, firstBad = null;
      var name = $("#f-name"), agree = $("#f-agree");
      if (name.value.trim().length < 2) { setErr("name", "이름을 입력해 주세요.", name); ok = false; firstBad = firstBad || name; }
      else setErr("name", "", name);
      if (!PHONE_RE.test(phone.value.trim())) { setErr("phone", "휴대전화 번호를 정확히 입력해 주세요. 예) 010-1234-5678", phone); ok = false; firstBad = firstBad || phone; }
      else setErr("phone", "", phone);
      if (!agree.checked) { setErr("agree", "개인정보 수집·이용에 동의하셔야 상담 신청이 가능합니다."); ok = false; firstBad = firstBad || agree; }
      else setErr("agree", "");
      if (firstBad) firstBad.focus();
      return ok;
    }

    function setStatus(type, html) {
      status.className = "form__status" + (type ? " is-" + type : "");
      status.innerHTML = html || "";
    }

    var fallback = '<a href="' + esc(CFG.kakao) + '" target="_blank" rel="noopener">카카오톡</a> 또는 ' +
      '<a href="tel:' + esc((CFG.phone || "").replace(/[^0-9+]/g, "")) + '">전화(' + esc(CFG.phone) + ")</a>";

    var sending = false;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (sending) return;
      setStatus("", "");
      if (!validate()) return;

      // 스팸 방지: 숨김 칸이 채워졌거나, 페이지를 연 지 3초 안에 제출하면 무시
      if ($("#f-hp").value || Date.now() - loadedAt < 3000) {
        setStatus("error", "잠시 후 다시 시도해 주세요.");
        return;
      }

      if (!CFG.formspreeId) {
        setStatus("info", "현재 온라인 상담 접수는 준비 중입니다. 번거로우시더라도 " + fallback + "로 문의해 주세요. 입력하신 내용은 전송되지 않았습니다.");
        return;
      }

      var model = findModel(sel.value);
      var data = new FormData();
      data.append("이름", $("#f-name").value.trim());
      data.append("휴대전화", phone.value.trim());
      data.append("관심 차량", model ? model.name : "선택 안 함");
      data.append("구매 희망 시점", $("#f-when").value || "선택 안 함");
      data.append("상담 희망 방법", ($('input[name="method"]:checked', form) || {}).value || "");
      data.append("상담 내용", $("#f-msg").value.trim());
      data.append("개인정보 동의", "동의함");
      data.append("_subject", "[홈페이지 상담 신청] " + $("#f-name").value.trim());

      sending = true;
      btn.disabled = true;
      btn.textContent = "접수 중...";

      fetch("https://formspree.io/f/" + encodeURIComponent(CFG.formspreeId), {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" }
      }).then(function (res) {
        if (res.ok) {
          form.reset();
          setStatus("ok", "<strong>상담 신청이 접수되었습니다.</strong><br>남겨주신 연락처로 확인 후 연락드리겠습니다. 감사합니다.");
          btn.textContent = "접수 완료";
          setTimeout(function () { btn.disabled = false; btn.textContent = "상담 신청하기"; sending = false; }, 30000);
          return;
        }
        throw new Error("bad response");
      }).catch(function () {
        setStatus("error", "접수 중 문제가 발생했습니다. 잠시 후 다시 시도하시거나 " + fallback + "로 문의해 주세요.");
        btn.disabled = false;
        btn.textContent = "상담 신청하기";
        sending = false;
      });
    });
  }

  /* ------------------------------------------------------------------
     8. FAQ 아코디언
     ------------------------------------------------------------------ */
  function initFaq() {
    $$(".acc__btn").forEach(function (b) {
      b.addEventListener("click", function () {
        var open = b.getAttribute("aria-expanded") === "true";
        b.setAttribute("aria-expanded", String(!open));
        $("#" + b.getAttribute("aria-controls")).hidden = open;
      });
    });
  }

  /* ------------------------------------------------------------------
     9. 스크롤 등장 효과
     ------------------------------------------------------------------ */
  function initReveal() {
    var els = $$(".reveal");
    if (!("IntersectionObserver" in window)) { els.forEach(function (el) { el.classList.add("is-in"); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    els.forEach(function (el) { io.observe(el); });
  }

  injectDefs();
  applyConfig();
  initHeader();
  initModels();
  initFinder();
  initForm();
  initFaq();
  initReveal();
})();
