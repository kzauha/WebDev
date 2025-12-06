// Main JS for support/index.html (demo-only)
(function () {
    'use strict';

    console.info('support/js/main.js loaded');

    // Active link highlighting: pick exactly one link whose section top is closest to nav bottom
    var navLinks = document.querySelectorAll('.topnav a[href^="#"]');
    var navEl = document.querySelector('.topnav');
    function setActiveLink() {
        if (!navEl || !navLinks.length) return;
        var navHeight = navEl.offsetHeight || 80;
        var triggerY = navHeight + 8; // small offset from top of viewport

        var bestLink = null;
        var bestDelta = Infinity;

        navLinks.forEach(function (link) {
            var href = link.getAttribute('href');
            var section = document.querySelector(href);
            if (!section) return;
            var rect = section.getBoundingClientRect();
            var delta = Math.abs(rect.top - triggerY);
            if (delta < bestDelta) {
                bestDelta = delta;
                bestLink = link;
            }
        });

        // Clear all then set best (ensures only one active)
        navLinks.forEach(function (l) { l.classList.remove('active'); });
        if (bestLink) bestLink.classList.add('active');
    }

    // Run on scroll, resize and load for robustness
    var throttled = false;
    window.addEventListener('scroll', function () {
        if (throttled) return;
        throttled = true;
        window.requestAnimationFrame(function () {
            setActiveLink();
            throttled = false;
        });
    }, {passive:true});
    window.addEventListener('resize', setActiveLink);
    window.addEventListener('load', setActiveLink);

})();
