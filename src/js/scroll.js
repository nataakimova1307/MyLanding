document.addEventListener("DOMContentLoaded", () => {
    const hero = document.querySelector(".hero");
    const heroContent = document.querySelector(".hero__content");
    const blurShapes = document.querySelectorAll(".blur-shape");
    const counters = document.querySelectorAll("[data-counter]");

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!prefersReducedMotion) {
        const handleParallax = () => {
            const scrollY = window.scrollY;

            if (hero) {
                hero.style.backgroundPosition = `center calc(22% + ${scrollY * 0.08}px)`;
            }

            if (heroContent) {
                heroContent.style.transform = `translateY(${scrollY * 0.12}px)`;
            }

            blurShapes.forEach((shape, index) => {
                const speed = (index + 1) * 0.05;
                shape.style.transform = `translate3d(0, ${scrollY * speed}px, 0)`;
            });
        };

        window.addEventListener("scroll", handleParallax, { passive: true });
        handleParallax();
    }

    const animateCounter = (element) => {
        const target = Number(element.dataset.counter || 0);
        const duration = 1400;
        const startTime = performance.now();

        const step = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = Math.floor(target * eased);

            element.textContent = value.toString();

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                element.textContent = target.toString();
            }
        };

        requestAnimationFrame(step);
    };

    const counterObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            });
        },
        { threshold: 0.45 }
    );

    counters.forEach((counter) => counterObserver.observe(counter));
});