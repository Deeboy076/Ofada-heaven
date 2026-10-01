# Ofada Heaven React scene demo

This is a separate Vite + React + TypeScript + Tailwind app. The existing root-level website remains plain HTML/CSS/JavaScript and is unchanged by this demo.

## Run

Install Node.js 20.19+ or 22.12+, then from this directory run:

```bash
npm install
npm run dev
```

For a production check, run `npm run build`.

## shadcn setup

The app is already configured with `components.json`, TypeScript alias `@/*`, and component aliases pointing to `src/components/ui` and `src/lib/utils`. This keeps reusable UI primitives in shadcn's conventional location. Run `npx shadcn@latest add card` to let the CLI manage the Card primitive later; the current Card is included locally.

To initialize a separate shadcn project from scratch instead, use `npx shadcn@latest init` and choose TypeScript, Tailwind CSS, and `src/components/ui` when prompted. Keeping primitives in `/components/ui` makes CLI-generated components and imports predictable, and avoids scattering reusable building blocks across feature code.

## Spline scene

The 3D scene is loaded from Spline's hosted scene URL and requires a network connection. The food photograph is copied from the existing website's `images/ofada.jpg` into `public/images/ofada.jpg` and is served locally.
