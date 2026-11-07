/**
 * Twenty Twenty-Two photo gallery enhancements, adapted from Travel Gallery.
 * Paste inside its own <script> block in Bear Blog's Footer Directives.
 */
(function () {
    function initializeGalleries() {
        document.querySelectorAll('.photo-grid').forEach(function (grid) {
            if (grid.classList.contains('cols-2') || grid.classList.contains('cols-3')) return;
            var items = grid.querySelectorAll(':scope > img, :scope > figure');
            if (items.length === 2) grid.classList.add('cols-2');
            if (items.length === 3) grid.classList.add('cols-3');
        });

        document.querySelectorAll('.photo-carousel').forEach(function (carousel) {
            if (carousel.classList.contains('is-enhanced')) return;
            var track = carousel.querySelector(':scope > .carousel-track');
            var items = (track || carousel).querySelectorAll(':scope > .carousel-slide');
            if (!items.length) return;

            if (!track) {
                track = document.createElement('div');
                track.className = 'carousel-track';
                items.forEach(function (item) { track.appendChild(item); });
                carousel.appendChild(track);
            }
            if (items.length < 2) return;

            track.scrollLeft = 0;
            carousel.classList.add('is-enhanced');
            var current = 0;
            var total = items.length;
            var dots = [];

            function goTo(index) {
                current = (index + total) % total;
                track.style.transform = 'translateX(-' + (current * items[0].getBoundingClientRect().width) + 'px)';
                items.forEach(function (item, i) {
                    item.setAttribute('aria-hidden', i === current ? 'false' : 'true');
                    item.inert = i !== current;
                });
                dots.forEach(function (dot, i) {
                    dot.classList.toggle('active', i === current);
                    dot.setAttribute('aria-current', i === current ? 'true' : 'false');
                });
            }

            var prev = document.createElement('button');
            prev.type = 'button';
            prev.className = 'carousel-arrow prev';
            prev.innerHTML = '&#8249;';
            prev.setAttribute('aria-label', 'Previous slide');
            prev.addEventListener('click', function () { goTo(current - 1); });

            var next = document.createElement('button');
            next.type = 'button';
            next.className = 'carousel-arrow next';
            next.innerHTML = '&#8250;';
            next.setAttribute('aria-label', 'Next slide');
            next.addEventListener('click', function () { goTo(current + 1); });
            carousel.appendChild(prev);
            carousel.appendChild(next);

            var dotsContainer = document.createElement('div');
            dotsContainer.className = 'carousel-dots';
            for (var i = 0; i < total; i++) {
                var dot = document.createElement('button');
                dot.type = 'button';
                dot.className = 'dot';
                dot.setAttribute('aria-label', 'Slide ' + (i + 1));
                dot.dataset.index = i;
                dot.addEventListener('click', function () {
                    goTo(Number(this.dataset.index));
                });
                dots.push(dot);
                dotsContainer.appendChild(dot);
            }
            carousel.appendChild(dotsContainer);

            var touchStartX = 0;
            var touchStartY = 0;
            var isSwiping = false;
            carousel.addEventListener('touchstart', function (event) {
                touchStartX = event.touches[0].clientX;
                touchStartY = event.touches[0].clientY;
                isSwiping = false;
            }, { passive: true });
            carousel.addEventListener('touchmove', function (event) {
                var dx = Math.abs(event.touches[0].clientX - touchStartX);
                var dy = Math.abs(event.touches[0].clientY - touchStartY);
                if (dx > dy && dx > 5) isSwiping = true;
            }, { passive: true });
            carousel.addEventListener('touchend', function (event) {
                var dx = event.changedTouches[0].clientX - touchStartX;
                if (isSwiping && Math.abs(dx) > 40) {
                    goTo(dx < 0 ? current + 1 : current - 1);
                }
                isSwiping = false;
            }, { passive: true });
            carousel.addEventListener('touchcancel', function () {
                isSwiping = false;
            }, { passive: true });

            window.addEventListener('resize', function () {
                track.style.transition = 'none';
                goTo(current);
                requestAnimationFrame(function () { track.style.transition = ''; });
            });
            goTo(0);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeGalleries);
    } else {
        initializeGalleries();
    }
})();
