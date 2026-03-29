document.addEventListener("DOMContentLoaded", () => {
    const navToggle = document.getElementById("nav-toggle");
    const navLinks = document.querySelectorAll(".nav a[href^='#']");
    const sections = document.querySelectorAll("section[id]");
    const animatedItems = document.querySelectorAll(
        ".section__heading, .about-card, .skill-card, .portfolio-card, .contact-card, .cta-card, .stat-card"
    );

    const preloader = document.querySelector(".preloader");

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            if (navToggle) navToggle.checked = false;
        });
    });

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.14,
            rootMargin: "0px 0px -40px 0px",
        }
    );

    animatedItems.forEach((item, index) => {
        item.classList.add("reveal");
        item.style.transitionDelay = `${Math.min(index * 60, 360)}ms`;
        revealObserver.observe(item);
    });

    const setActiveNavLink = () => {
        const scrollPosition = window.scrollY + 140;
        let currentSectionId = "";

        sections.forEach((section) => {
            const top = section.offsetTop;
            const height = section.offsetHeight;

            if (scrollPosition >= top && scrollPosition < top + height) {
                currentSectionId = section.id;
            }
        });

        navLinks.forEach((link) => {
            const targetId = link.getAttribute("href")?.replace("#", "");
            if (!targetId) return;
            link.classList.toggle("is-active", targetId === currentSectionId);
        });
    };

    setActiveNavLink();
    window.addEventListener("scroll", setActiveNavLink, { passive: true });

    window.addEventListener("load", () => {
        if (preloader) {
            preloader.classList.add("is-hidden");
            setTimeout(() => preloader.remove(), 600);
        }
    });
});