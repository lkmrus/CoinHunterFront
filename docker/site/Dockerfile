FROM node:20.10-slim AS dependencies
ARG npm_cache_path=/var/tmp/.npm

WORKDIR /dependencies

COPY ["package.json", "package-lock.json*", "./"]
RUN pnpm i --prod

FROM dependencies AS build
ARG npm_cache_path=/var/tmp/.npm

WORKDIR /app
COPY . .

RUN pnpm i --prod
RUN pnpm run build

FROM node:20.10-slim AS base

RUN apt-get update -qq \
    && apt-get install -y curl tini \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY --from=build /app/.output ./.output
COPY --from=build /app/.nuxt ./.nuxt
COPY --from=build /app/dist .
COPY --from=dependencies /dependencies/node_modules /app/node_modules
COPY ["package.json", "package-lock.json*", "./"]

ENTRYPOINT [ "/usr/bin/tini" ]
CMD [ "pnpm", "run", "start" ]