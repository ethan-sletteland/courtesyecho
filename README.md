# courtesyecho 🤫

Courtesy Echo is a tiny web toy that feeds your mic audio back with a controllable delay. It doubles as a stealthy “incognito” spreadsheet view.

## set up the project

`npm i`

## run locally

`npm run dev`

## scripts

- `npm run dev` start Vite dev server
- `npm run build` build for production
- `npm run preview` preview the production build
- `npm run lint` run ESLint
- `npm run format` run Prettier
- `npm run format:check` check formatting

## features

- click the status bar to toggle audio on/off
- adjust delay with the slider
- incognito mode disguises the page as a spreadsheet (exit button in the header)

## deploy

`???`

## native app (capacitor)

Install dependencies:

`npm i`

Build the web assets:

`npm run build`

Add a platform (one-time):

`npx cap add ios`
`npx cap add android`

Sync web assets to native projects:

`npm run cap:sync`

Open the native IDEs:

`npm run cap:open:ios`
`npm run cap:open:android`

Update `appId` and `appName` in `capacitor.config.json` if you want custom values.
