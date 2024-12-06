# Nostr Market App (nostr-market-app)

A Nostr marketplace

## Install the dependencies

```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```

### Lint the files

```bash
yarn lint
# or
npm run lint
```

### Format the files

```bash
yarn format
# or
npm run format
```

### create .env file

```bash
cp src/.env.sample src/.env
```

#### .env.sample

```bash
DEFAULT_NADDR=""
NADDR_PUBKEY=""
DEFAULT_BANNER=images/nostr-cover.png
DEFAULT_LOGO=images/nostr-avatar.png
```

### Build the app for production

> [!NOTE]
> We use `npm run build` here instead of the original `quasar build` because it loads the env variables
> I did this because I had it in my head not to add any extra dependencies, but that only applies to the extensions
> going to replace this with dotenv

```bash
npm run build
```

### Customize the configuration

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).
