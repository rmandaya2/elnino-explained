(function () {
  var cfg = window.SITE_CONFIG || {};

  // ---- Google Analytics (only if an ID is set) ----
  var id = (cfg.gaMeasurementId || "").trim();
  if (/^G-[A-Z0-9]+$/i.test(id)) {
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(id);
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", id, { anonymize_ip: true });
  }

  document.addEventListener("DOMContentLoaded", function () {
    // ---- Fill in partner / support placeholders ----
    document.querySelectorAll("[data-partner]").forEach(function (el) {
      el.textContent = cfg.partnerName || "our certificate partner";
    });
    document.querySelectorAll("[data-support]").forEach(function (el) {
      var email = (cfg.supportEmail || "").trim();
      el.textContent = email;
      if (email.indexOf("@") > 0) { el.href = "mailto:" + email; }
    });

    // ---- Quiz embed ----
    var slot = document.getElementById("quiz-slot");
    if (slot) {
      var url = (cfg.formEmbedUrl || "").trim();
      if (/^https:\/\/docs\.google\.com\/forms\//.test(url)) {
        var f = document.createElement("iframe");
        f.src = url;
        f.title = "El Niño final quiz";
        f.loading = "lazy";
        f.className = "quiz-frame";
        slot.innerHTML = "";
        slot.appendChild(f);
        slot.classList.add("has-form");
      }
    }

    // ---- Checklist: print button ----
    var p = document.getElementById("print-btn");
    if (p) { p.addEventListener("click", function () { window.print(); }); }
  });
})();
