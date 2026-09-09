const root = document.documentElement;
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const themeToggle = document.getElementById("theme-toggle");
const themeToggleIcon = themeToggle?.querySelector("i");
const menuBtnIcon = menuBtn?.querySelector("i");
const themeStorageKey = "aot-theme";

const getSavedTheme = () => {
    try {
        const savedTheme = localStorage.getItem(themeStorageKey);
        return savedTheme === "light" || savedTheme === "dark" ? savedTheme : null;
    } catch {
        return null;
    }
};

const setTheme = (theme, persist = false) => {
    const isLight = theme === "light";
    root.dataset.theme = isLight ? "light" : "dark";

    if (themeToggle) {
        themeToggle.setAttribute("aria-pressed", String(isLight));
        themeToggle.setAttribute(
            "aria-label",
            isLight ? "Switch to dark theme" : "Switch to light theme"
        );
    }

    if (themeToggleIcon) {
        themeToggleIcon.className = isLight ? "ri-moon-line" : "ri-sun-line";
    }

    if (persist) {
        try {
            localStorage.setItem(themeStorageKey, isLight ? "light" : "dark");
        } catch {
            // Theme switching still works when storage is unavailable.
        }
    }
};

const savedTheme = getSavedTheme();
const systemPrefersDark = window.matchMedia
    ? window.matchMedia("(prefers-color-scheme: dark)").matches
    : true;
setTheme(savedTheme || (systemPrefersDark ? "dark" : "light"));

themeToggle?.addEventListener("click", () => {
    setTheme(root.dataset.theme === "light" ? "dark" : "light", true);
});

const setMenuState = (isOpen) => {
    if (!menuBtn || !navLinks) {
        return;
    }

    navLinks.classList.toggle("open", isOpen);
    menuBtn.setAttribute("aria-expanded", String(isOpen));
    menuBtn.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    if (menuBtnIcon) {
        menuBtnIcon.className = isOpen ? "ri-close-line" : "ri-menu-line";
    }
};

if (menuBtn && navLinks) {
    setMenuState(false);

    menuBtn.addEventListener("click", () => {
        setMenuState(!navLinks.classList.contains("open"));
    });

    navLinks.addEventListener("click", (event) => {
        if (event.target.closest("a")) {
            setMenuState(false);
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            setMenuState(false);
        }
    });
}

const setSeasonState = (toggle, isOpen) => {
    const card = toggle.closest(".season_card");
    const contentId = toggle.getAttribute("aria-controls");
    const content = contentId ? document.getElementById(contentId) : null;

    if (!card || !content) {
        return;
    }

    card.classList.toggle("open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    content.setAttribute("aria-hidden", String(!isOpen));
    content.style.maxHeight = isOpen ? `${content.scrollHeight}px` : "0px";
};

document.querySelectorAll(".season_toggle").forEach((toggle) => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    setSeasonState(toggle, isOpen);

    toggle.addEventListener("click", () => {
        setSeasonState(toggle, toggle.getAttribute("aria-expanded") !== "true");
    });
});

window.addEventListener("resize", () => {
    document.querySelectorAll(".season_toggle[aria-expanded=\"true\"]").forEach((toggle) => {
        setSeasonState(toggle, true);
    });
});
