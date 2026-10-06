# Tarakki — first working MVP

Tarakki helps local shopkeepers create a catalogue website, manage products, and prepare social content from one workspace. Meta ads are excluded.

## Working features

- Shop profile, website address and three accent themes.
- Product creation, editing, deletion, prices, stock and PNG/JPEG/WebP image upload.
- A separate responsive shop website route with search and WhatsApp enquiries.
- Hindi, English and Hinglish caption templates based on saved product facts.
- Editable caption drafts and a dated post planner.
- Durable D1 database storage and R2 image storage, with user-scoped access and conflicting-edit detection.

## Current limits

This is a private pilot, not a public commercial launch. Hosted access is controlled by Sites; the shopkeeper workspace uses ChatGPT sign-in. A public launch needs the intended audience/access configuration and a confirmed public customer authentication path. Previewing a shop does not make the whole private Site public.

Captions are template-generated, not calls to a live AI model. The post planner stores plans; it does not publish to Instagram, Facebook or Threads. Those integrations require a Meta developer application, account connections, publishing permissions, token storage and background job processing. The Connections screen explains this instead of claiming an account is connected. No payment collection or subscription billing is implemented.

## Run locally

Requires Node.js 22.13 or newer.

1. Run `npm run install:ci` if dependencies are not already installed.
2. Run `npm run build` to create the local Worker configuration.
3. Apply the initial local migration:

   `node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_purple_toad.sql`

4. Run `npm run dev` and open the Local URL it prints.
5. Local sign-in uses the starter's loopback-only development identity. Hosted sign-in is provided by the platform; the local identity is never enabled in production.

Saved local data lives in the ignored `.wrangler/state` folder. Production storage is independent. Do not commit credentials or local runtime state.

## Before a public launch

Connect a live AI provider and approved Meta integrations; implement reliable publishing jobs, retries and token renewal; add commercial authentication and subscriptions; verify Tarakki's name/domain; and review account isolation, abuse limits and data/privacy handling with the final deployment setup.
