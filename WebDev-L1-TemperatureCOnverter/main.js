const form = document.getElementById("convertForm");
const tempInput = document.getElementById("tempValue");
const unitButtons = document.querySelectorAll(".unit_btn");
const message = document.getElementById("message");
const results = document.getElementById("results");
const gauge = document.getElementById("gauge");
const gaugeFill = document.getElementById("gaugeFill");

const valC = document.getElementById("valC");
const valF = document.getElementById("valF");
const valK = document.getElementById("valK");

const ABSOLUTE_ZERO_C = -273.15;
let selectedUnit = "C";

unitButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        unitButtons.forEach((button) => {
            button.classList.remove("active");
            button.setAttribute("aria-checked", "false");
        });

        btn.classList.add("active");
        btn.setAttribute("aria-checked", "true");
        selectedUnit = btn.dataset.unit;

        hideOutputs();
        validateCurrentInput();
    });
});

function toCelsius(value, unit) {
    if (unit === "C") return value;
    if (unit === "F") return (value - 32) * (5 / 9);
    if (unit === "K") return value - 273.15;
    return Number.NaN;
}

function hideOutputs() {
    results.hidden = true;
    gauge.hidden = true;
}

function clearMessage() {
    message.textContent = "";
    tempInput.setAttribute("aria-invalid", "false");
}

function showMessage(text) {
    message.textContent = text;
    tempInput.setAttribute("aria-invalid", "true");
    hideOutputs();
}

function validateCurrentInput(showEmpty = false) {
    const raw = tempInput.value.trim();

    if (raw === "") {
        if (showEmpty) {
            showMessage("Enter a valid number to convert.");
        } else {
            clearMessage();
        }
        return null;
    }

    // Allow an unfinished sign or decimal point while the user is typing.
    if (/^[+-]?\.?$/.test(raw)) {
        clearMessage();
        return null;
    }

    const value = Number(raw);
    if (!Number.isFinite(value)) {
        showMessage("Enter a valid number to convert.");
        return null;
    }

    const celsius = toCelsius(value, selectedUnit);
    if (!Number.isFinite(celsius)) {
        showMessage("Choose a valid temperature unit.");
        return null;
    }

    if (celsius < ABSOLUTE_ZERO_C) {
        showMessage(`That's below absolute zero (${ABSOLUTE_ZERO_C}°C) — no temperature can go lower than this.`);
        return null;
    }

    clearMessage();
    return { celsius };
}

function showResults(celsius) {
    const fahrenheit = celsius * (9 / 5) + 32;
    const kelvin = celsius + 273.15;

    valC.textContent = celsius.toFixed(2);
    valF.textContent = fahrenheit.toFixed(2);
    valK.textContent = kelvin.toFixed(2);

    clearMessage();
    results.hidden = false;
    gauge.hidden = false;

    // Position the gauge marker on a -50C to 50C visual scale, clamped to the track.
    const percent = ((celsius - -50) / (50 - -50)) * 100;
    const clamped = Math.max(0, Math.min(100, percent));
    gaugeFill.style.left = clamped + "%";
}

tempInput.addEventListener("input", () => {
    hideOutputs();
    validateCurrentInput();
});

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const validation = validateCurrentInput(true);
    if (!validation) return;

    showResults(validation.celsius);
});
