/* ==========================================================================
   STOFF LINE ESTOFADOS — scripts do site
   ========================================================================== */

/* --------------------------------------------------------------------------
   >>> ALTERE AQUI O NÚMERO DE WHATSAPP <<<
   Formato: código do país + DDD + número, só dígitos.
   Ex.: (75) 98765-4321  →  "5575987654321"
   Este é o ÚNICO lugar do site onde o número precisa ser trocado.
   -------------------------------------------------------------------------- */
const WHATSAPP = "5575999999999"; // <-- PLACEHOLDER: substituir pelo número real

document.addEventListener("DOMContentLoaded", function () {

  /* ---------- Monta todos os links de WhatsApp ---------- */
  const msgPadrao = "Olá! Vim pelo site da Stoff Line.";
  document.querySelectorAll("[data-wa]").forEach(function (el) {
    const texto = el.getAttribute("data-wa") || msgPadrao;
    el.setAttribute("href", "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(texto));
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  });

  /* ---------- Header com estado ao rolar ---------- */
  const header = document.getElementById("header");
  if (header) {
    const onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Menu mobile ---------- */
  const burger = document.getElementById("burger");
  const mobileMenu = document.getElementById("mobileMenu");
  if (burger && mobileMenu) {
  const fecharMenu = function () {
    burger.classList.remove("is-open");
    mobileMenu.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  };
  burger.addEventListener("click", function () {
    const aberto = mobileMenu.classList.toggle("is-open");
    burger.classList.toggle("is-open", aberto);
    burger.setAttribute("aria-expanded", String(aberto));
    document.body.style.overflow = aberto ? "hidden" : "";
  });
  mobileMenu.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", fecharMenu);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") fecharMenu();
  });
  }

  /* ---------- Link ativo conforme a seção visível ---------- */
  const navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav a"));
  const secoes = navLinks
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);

  if ("IntersectionObserver" in window && secoes.length) {
    const navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) {
          a.classList.toggle("is-active", a.getAttribute("href") === "#" + entry.target.id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    secoes.forEach(function (s) { navObserver.observe(s); });
  }

  /* ---------- Animações de entrada ---------- */
  const reveals = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
    reveals.forEach(function (el) { revealObserver.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* Trava de segurança: passados 2,5s nada pode continuar invisível,
     mesmo que o IntersectionObserver falhe em algum navegador. */
  window.setTimeout(function () {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }, 2500);

  /* ---------- Filtro de modelos ---------- */
  const filtros = document.querySelectorAll(".filter");
  const modelos = document.querySelectorAll(".model");
  const grade   = document.getElementById("models");

  /* Se o ultimo card ficaria sozinho na linha, ele passa a ocupar a largura
     toda. O numero de colunas e lido do proprio grid, entao funciona em
     qualquer largura de tela e com qualquer filtro aplicado. */
  const ajustarSobra = function () {
    if (!grade) return;
    modelos.forEach(function (m) { m.classList.remove("model--largo"); });

    const visiveis = Array.prototype.filter.call(modelos, function (m) {
      return !m.classList.contains("is-hidden");
    });
    const colunas = window.getComputedStyle(grade).gridTemplateColumns.split(" ").length;
    if (colunas < 2 || visiveis.length <= colunas) return;
    if (visiveis.length % colunas === 1) {
      visiveis[visiveis.length - 1].classList.add("model--largo");
    }
  };

  filtros.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filtros.forEach(function (b) { b.classList.remove("is-active"); });
      btn.classList.add("is-active");
      const cat = btn.getAttribute("data-filter");
      modelos.forEach(function (m) {
        const mostra = cat === "all" || m.getAttribute("data-cat") === cat;
        m.classList.toggle("is-hidden", !mostra);
        if (mostra) m.classList.add("is-visible");
      });
      ajustarSobra();
    });
  });

  ajustarSobra();
  var recalculo;
  window.addEventListener("resize", function () {
    window.clearTimeout(recalculo);
    recalculo = window.setTimeout(ajustarSobra, 150);
  });

  /* ---------- FAQ (acordeão) ---------- */
  document.querySelectorAll(".faq__item").forEach(function (item) {
    const botao = item.querySelector(".faq__q");
    const resposta = item.querySelector(".faq__a");
    botao.addEventListener("click", function () {
      const jaAberto = item.classList.contains("is-open");
      document.querySelectorAll(".faq__item.is-open").forEach(function (outro) {
        outro.classList.remove("is-open");
        outro.querySelector(".faq__a").style.maxHeight = null;
      });
      if (!jaAberto) {
        item.classList.add("is-open");
        resposta.style.maxHeight = resposta.scrollHeight + "px";
      }
    });
  });

  /* ---------- Vídeos (play sob demanda) ---------- */
  document.querySelectorAll(".reel").forEach(function (reel) {
    const video = reel.querySelector("video");
    const botao = reel.querySelector(".reel__play");
    botao.addEventListener("click", function () {
      document.querySelectorAll(".reel.is-playing").forEach(function (outro) {
        if (outro === reel) return;
        outro.querySelector("video").pause();
        outro.classList.remove("is-playing");
      });
      reel.classList.add("is-playing");
      video.controls = true;
      video.play();
    });
    video.addEventListener("pause", function () {
      reel.classList.remove("is-playing");
    });
  });

  /* ---------- Esteira de vídeos (celular) ---------- */
  var faixaReels = document.querySelector(".reels");
  var pontosReels = document.getElementById("reelsPontos");
  if (faixaReels && pontosReels) {
    var reels = faixaReels.querySelectorAll(".reel");

    reels.forEach(function (reel, i) {
      var ponto = document.createElement("button");
      ponto.setAttribute("aria-label", "Ir para o vídeo " + (i + 1));
      if (i === 0) ponto.classList.add("is-active");
      ponto.addEventListener("click", function () {
        faixaReels.scrollTo({ left: reel.offsetLeft - faixaReels.offsetLeft, behavior: "smooth" });
      });
      pontosReels.appendChild(ponto);
    });

    var marcarPonto = function () {
      var meio = faixaReels.scrollLeft + faixaReels.clientWidth / 2;
      var atual = 0;
      reels.forEach(function (reel, i) {
        var centro = reel.offsetLeft - faixaReels.offsetLeft + reel.clientWidth / 2;
        if (Math.abs(centro - meio) < reel.clientWidth / 2) atual = i;
      });
      pontosReels.querySelectorAll("button").forEach(function (b, i) {
        b.classList.toggle("is-active", i === atual);
      });
    };
    faixaReels.addEventListener("scroll", marcarPonto, { passive: true });
  }

  /* ---------- Fotos do produto dentro do card ---------- */
  document.querySelectorAll(".model").forEach(function (card) {
    var fotos  = card.querySelectorAll(".model__img img");
    var pontos = card.querySelectorAll(".model__thumb");
    if (fotos.length < 2) return;

    var atual = 0, timer = null;

    var mostrar = function (i) {
      atual = (i + fotos.length) % fotos.length;
      fotos.forEach(function (img, k) { img.classList.toggle("is-active", k === atual); });
      pontos.forEach(function (p, k) { p.classList.toggle("is-active", k === atual); });
    };

    pontos.forEach(function (p) {
      p.addEventListener("click", function (e) {
        e.stopPropagation();
        window.clearInterval(timer);
        mostrar(parseInt(p.getAttribute("data-i"), 10));
      });
    });

    // passa as fotos sozinho enquanto o mouse estiver sobre o card
    card.addEventListener("mouseenter", function () {
      timer = window.setInterval(function () { mostrar(atual + 1); }, 1600);
    });
    card.addEventListener("mouseleave", function () {
      window.clearInterval(timer);
      mostrar(0);
    });
  });

  /* ---------- Lightbox das fotos do produto ---------- */
  var lightbox = document.getElementById("lightbox");
  var lbImg    = document.getElementById("lbImg");
  var fotosLb  = [];
  var indiceLb = 0;

  var mostrarLb = function (i) {
    if (!fotosLb.length) return;
    indiceLb = (i + fotosLb.length) % fotosLb.length;
    lbImg.src = fotosLb[indiceLb].src;
    lbImg.alt = fotosLb[indiceLb].alt;
  };
  var abrirLb = function (card) {
    fotosLb = Array.prototype.slice.call(card.querySelectorAll(".model__img img"));
    mostrarLb(0);
    lightbox.classList.add("is-open");
    document.body.style.overflow = "hidden";
  };
  var fecharLb = function () {
    lightbox.classList.remove("is-open");
    document.body.style.overflow = "";
  };

  if (lightbox && lbImg) {
    document.querySelectorAll(".model").forEach(function (card) {
      var lupa = card.querySelector(".model__zoom");
      if (lupa) lupa.addEventListener("click", function () { abrirLb(card); });
      var area = card.querySelector(".model__img");
      if (area) area.addEventListener("click", function () { abrirLb(card); });
    });

    document.getElementById("lbClose").addEventListener("click", fecharLb);
    document.getElementById("lbPrev").addEventListener("click", function (e) {
      e.stopPropagation(); mostrarLb(indiceLb - 1);
    });
    document.getElementById("lbNext").addEventListener("click", function (e) {
      e.stopPropagation(); mostrarLb(indiceLb + 1);
    });
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) fecharLb();
    });
    document.addEventListener("keydown", function (e) {
      if (!lightbox.classList.contains("is-open")) return;
      if (e.key === "Escape")     fecharLb();
      if (e.key === "ArrowLeft")  mostrarLb(indiceLb - 1);
      if (e.key === "ArrowRight") mostrarLb(indiceLb + 1);
    });
  }

  /* ---------- Formulário → WhatsApp ---------- */
  const form = document.getElementById("quoteForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const v = function (id) {
        const campo = document.getElementById(id);
        return campo && campo.value.trim() ? campo.value.trim() : "";
      };

      let texto = "*Solicitação de orçamento — site Stoff Line*\n\n";
      texto += "*Nome:* " + (v("nome") || "-") + "\n";
      if (v("cidade"))   texto += "*Cidade:* " + v("cidade") + "\n";
      if (v("modelo"))   texto += "*Tipo de peça:* " + v("modelo") + "\n";
      if (v("medida"))   texto += "*Medida disponível:* " + v("medida") + "\n";
      if (v("mensagem")) texto += "\n*Detalhes do projeto:*\n" + v("mensagem") + "\n";

      window.open("https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(texto), "_blank", "noopener");
    });
  }

  /* ---------- Ano no rodapé ---------- */
  const anoEl = document.getElementById("year");
  if (anoEl) anoEl.textContent = String(new Date().getFullYear());

});
