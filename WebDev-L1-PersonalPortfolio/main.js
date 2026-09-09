const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
const toggleIcon = navToggle.querySelector("i");

navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    toggleIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        toggleIcon.setAttribute("class", "ri-menu-line");
    });
});
