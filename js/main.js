(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var revealTargets = document.querySelectorAll(".reveal, .icon-draw");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealTargets.forEach(function (el) {
      el.classList.add("in-view");
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  revealTargets.forEach(function (el) {
    observer.observe(el);
  });

  var textures = document.querySelectorAll(".bg-texture");
  if (textures.length) {
    var ticking = false;

    var updateParallax = function () {
      textures.forEach(function (el) {
        var section = el.closest("section, footer");
        if (!section) return;
        var rect = section.getBoundingClientRect();
        var offset = rect.top * 0.04;
        el.style.transform = "translateY(" + offset + "px)";
      });
      ticking = false;
    };

    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          window.requestAnimationFrame(updateParallax);
          ticking = true;
        }
      },
      { passive: true }
    );

    updateParallax();
  }
})();
