(() => {
  const root = document.documentElement;
  const header = document.querySelector(".site-header");
  const themeToggle = document.getElementById("theme-toggle");
  const menuButton = document.getElementById("menu-button");
  const mobileNav = document.getElementById("mobile-nav");
  const year = document.getElementById("year");

  const savedTheme = localStorage.getItem("dm-portfolio-theme");
  const prefersLight = window.matchMedia?.("(prefers-color-scheme: light)")?.matches;

  root.dataset.theme = savedTheme || (prefersLight ? "light" : "dark");

  themeToggle?.addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    localStorage.setItem("dm-portfolio-theme", next);
  });

  menuButton?.addEventListener("click", () => {
    const open = mobileNav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
  });

  mobileNav?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("open");
      menuButton?.setAttribute("aria-expanded", "false");
    });
  });

  function updateHeader() {
    header?.classList.toggle("scrolled", window.scrollY > 10);
  }

  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  const items = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      });
    }, {
      threshold: 0.10,
      rootMargin: "0px 0px -35px 0px"
    });

    items.forEach(item => observer.observe(item));
  } else {
    items.forEach(item => item.classList.add("revealed"));
  }
})();
