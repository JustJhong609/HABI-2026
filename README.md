# AgriGasAI Front-End Prototype

AgriGasAI is an Ionic React + TypeScript front-end prototype that simulates an AI tool for estimating biogas potential from farm waste. It runs fully in the browser with mock data and no backend.

## Tech Stack

- Ionic React + TypeScript
- React Router
- Tailwind CSS
- Local mock data and in-app simulation logic

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Start the prototype:

```bash
npm start
```

3. Open the local URL shown by Vite (usually `http://localhost:5173`).

## User Flow

1. Onboarding / Profile
- Select farm location (Laguna, Nueva Ecija, Benguet, Iloilo).
- Select primary activities (rice farming, coconut farming, livestock raising).

2. Waste Input
- Add waste manually: type + weight in kg.
- Upload photo (mock): opens file picker, shows AI-like identification delay, auto-fills type and weight.
- Edit or remove entries before prediction.

3. Prediction Dashboard
- Estimated biogas yield (m3/day)
- LPG savings (PHP/month and PHP/year)
- Carbon emissions avoided (kg CO2e/month)
- Cooking hours/day gauge card

4. Guidance Screen
- Recommended digester size (4m3, 6m3, 8m3)
- Tailored feedstock mixing tips
- Digester maintenance checklist

## Mock AI Simulation Logic

The app computes outputs locally using this mock formula:

- Biogas yield/day = sum of (`waste_kg x conversion_factor`) x `location_multiplier`
- LPG savings/month = `biogas_m3_per_day x 30 x 0.5 kg LPG/m3 x PHP 70/kg`

Reference factors included in mock data:

- Rice straw: 0.025 m3/kg
- Coconut husk: 0.020 m3/kg
- Cow manure: 0.040 m3/kg
- Pig manure: 0.045 m3/kg
- Corn stover: 0.028 m3/kg
- Chicken litter: 0.035 m3/kg

The prediction action includes an intentional delay (~1.6 seconds) to mimic AI processing.

## Notes

- No backend, database, or external API calls are used.
- All values are illustrative and intended for demo/workshop prototype storytelling.
- The interface is responsive and optimized for mobile-first usage.