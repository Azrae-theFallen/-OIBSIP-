# Task 3 — Temperature Converter

An interactive temperature conversion tool, built as **Task 3, Level 1** of the OIBSIP Web Development & Designing track.

## Overview

A single-purpose utility that converts a temperature value between Celsius, Fahrenheit, and Kelvin, showing all three units at once. The design leans into the subject matter with an instrument-panel look: a gradient gauge that visually shifts from cold-blue to hot-coral based on the entered value.

## Features

- Numeric input with validation — rejects empty or non-numeric entries with a clear message
- Segmented control to choose the **input** unit (°C / °F / K)
- **Convert** button triggers the calculation (no live-typing recalculation, so partial input never shows a broken result)
- All three converted values displayed simultaneously, each with its unit label
- Absolute zero handling — any input that converts below −273.15 °C is rejected with a friendly explanation instead of a silent wrong answer
- Visual gauge marker showing where the result sits on a cold–hot scale
- Clean, centred, single-card layout

## Tech stack

- HTML5
- CSS3 (custom properties, Flexbox)
- JavaScript (Vanilla — no libraries)
- Google Fonts: Sora (headings), IBM Plex Sans (body), IBM Plex Mono (numeric readout)

## Conversion formulas used

```
Celsius → Fahrenheit:  F = C × (9/5) + 32
Celsius → Kelvin:       K = C + 273.15
Fahrenheit → Celsius:   C = (F − 32) × (5/9)
Kelvin → Celsius:       C = K − 273.15
```

All conversions route through Celsius as the base unit, then out to the other two — verified against known reference points (0 °C = 32 °F = 273.15 K, 37 °C = 98.6 °F) before shipping.

## Project structure

```
WebDev-L1-TemperatureConverter/
├── index.html
├── styles.css
├── main.js
└── assets/
```

## How to run

```bash
cd WebDev-L1-TemperatureConverter
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Possible improvements

- Keep a short history of recent conversions in the session
- Add a unit-swap button to instantly flip input/output units
- Animate the gauge marker transition more smoothly across large value jumps
- Add a Fahrenheit/Kelvin-native absolute-zero check message (currently phrased in Celsius regardless of input unit)
