import AOS from "aos";

// Initialize AOS when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  AOS.init({
    duration: 1000,
    once: true,
    easing: "ease-in-out",
    offset: 100,
  });
});

// Refresh AOS on page transitions (for Astro View Transitions if enabled)
document.addEventListener("astro:page-load", () => {
  AOS.refresh();
});
