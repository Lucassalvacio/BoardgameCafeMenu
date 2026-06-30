# Meeple & Mug — Table Ordering App (React + TypeScript)

A QR-code table-ordering web app for a board game café: scan the code on
your table, the site opens already knowing your table number, browse the
menu and game library, and send your order to the counter.

## Running it

```bash
npm install
npm run dev
```

Open `http://localhost:5173/?table=7` to simulate scanning Table 7's QR
code. Without a `table` param, the app shows a manual entry box.

No backend is required to try it out — `src/api/client.ts` automatically
falls back to local mock data (`src/api/mockData.ts`) if it can't reach a
REST API, so the UI is fully usable out of the box.

## Project structure

```
src/
  api/
    client.ts      <- the ONLY file that talks to the network
    mockData.ts    <- local fallback data, matches the REST contract below
  components/       <- presentational React components
  hooks/
    useTableNumber.ts  <- reads ?table=N from the URL
    useCart.ts         <- cart state + totals
  types/index.ts    <- shared TypeScript types
  utils/format.ts   <- IDR currency formatting
  App.tsx           <- wires everything together
  styles.css
```
