# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

## Docker using

App using nginx as reverse-proxy to access to site service.

Nginx needs certificates to serve TLS connections. Put your own certificates to local directory `certs`, or [create self-signed certificates](#create-self-signed-certificates)

### Docker deployment

```bash
docker compose build

docker compose up -d
```

### Docker stop

```bash
docker compose down --remove-orphans
```

### Docker logging

```bash
docker compose logs
# ... follow logs
docker compose logs -f
# ... follow logs exact service
docker compose logs -f site
# ... show last n lines of logs
docker compose logs --tail 100 site
```

### Create self-signed certificates

```bash
cd certs

bash create.sh domainname.zone
# ... or
chmod u+x create.sh

./create.sh domainname.zone
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
