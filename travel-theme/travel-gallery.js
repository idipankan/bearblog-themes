/**
 * Travel Gallery — Carousel & Grid enhancements
 * Paste this into Bear Blog's Footer JavaScript field.
 */
(function () {
    document.addEventListener('DOMContentLoaded', function () {

        // ── Photo Carousel ──────────────────────────────
        document.querySelectorAll('.photo-carousel').forEach(function (carousel) {
            var items = carousel.querySelectorAll('.carousel-slide');
            if (items.length < 2) return;

            // Wrap slides in a track if not already
            var track = carousel.querySelector('.carousel-track');
            if (!track) {
                track = document.createElement('div');
                track.className = 'carousel-track';
                while (carousel.firstChild) track.appendChild(carousel.firstChild);
                carousel.appendChild(track);
            }

            var current = 0;
            var total = items.length;

            function slideWidth() {
                return items[0].offsetWidth || carousel.offsetWidth;
            }

            function goTo(index) {
                if (index < 0) index = total - 1;
                if (index >= total) index = 0;
                current = index;
                track.style.transform = 'translateX(-' + (current * slideWidth()) + 'px)';
                var dots = carousel.querySelectorAll('.dot');
                dots.forEach(function (d, i) {
                    d.classList.toggle('active', i === current);
                });
            }

            // Create arrows
            var prev = document.createElement('button');
            prev.className = 'carousel-arrow prev';
            prev.innerHTML = '&#8249;';
            prev.setAttribute('aria-label', 'Previous');
            prev.addEventListener('click', function () { goTo(current - 1); });

            var next = document.createElement('button');
            next.className = 'carousel-arrow next';
            next.innerHTML = '&#8250;';
            next.setAttribute('aria-label', 'Next');
            next.addEventListener('click', function () { goTo(current + 1); });

            carousel.appendChild(prev);
            carousel.appendChild(next);

            // Create dots
            if (total > 1) {
                var dotsContainer = document.createElement('div');
                dotsContainer.className = 'carousel-dots';
                for (var i = 0; i < total; i++) {
                    var dot = document.createElement('button');
                    dot.className = 'dot' + (i === 0 ? ' active' : '');
                    dot.setAttribute('aria-label', 'Slide ' + (i + 1));
                    dot.dataset.index = i;
                    dot.addEventListener('click', function () {
                        goTo(parseInt(this.dataset.index));
                    });
                    dotsContainer.appendChild(dot);
                }
                carousel.appendChild(dotsContainer);
            }

            // Touch / swipe support
            var touchStartX = 0;
            var touchStartY = 0;
            var isSwiping = false;

            carousel.addEventListener('touchstart', function (e) {
                touchStartX = e.touches[0].clientX;
                touchStartY = e.touches[0].clientY;
                isSwiping = false;
            }, { passive: true });

            carousel.addEventListener('touchmove', function (e) {
                if (!isSwiping) {
                    var dx = Math.abs(e.touches[0].clientX - touchStartX);
                    var dy = Math.abs(e.touches[0].clientY - touchStartY);
                    if (dx > dy && dx > 5) {
                        isSwiping = true;
                    }
                }
            }, { passive: true });

            carousel.addEventListener('touchend', function (e) {
                if (!isSwiping) return;
                var dx = e.changedTouches[0].clientX - touchStartX;
                if (Math.abs(dx) > 40) {
                    goTo(dx < 0 ? current + 1 : current - 1);
                }
                isSwiping = false;
            }, { passive: true });

            // Recalculate pixel position on resize / orientation change
            window.addEventListener('resize', function () {
                track.style.transition = 'none';
                track.style.transform = 'translateX(-' + (current * slideWidth()) + 'px)';
                requestAnimationFrame(function () {
                    track.style.transition = '';
                });
            });
        });

        // ── Photo Grid — auto-set column hints ────────
        document.querySelectorAll('.photo-grid').forEach(function (grid) {
            var imgs = grid.querySelectorAll(':scope > img, :scope > figure');
            if (imgs.length === 2) grid.classList.add('cols-2');
            if (imgs.length === 3) grid.classList.add('cols-3');
        });

    });
})();
