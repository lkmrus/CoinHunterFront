FROM node:20.10-slim AS build

WORKDIR /app
COPY . .

RUN npm i --no-audit
RUN npm run build

FROM node:20.10-slim AS base

RUN apt-get update -qq \
    && apt-get install -y curl tini \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY --from=build /app/.output ./.output
COPY --from=build /app/.nuxt ./.nuxt
COPY --from=build /app/dist .
COPY --from=build /app/node_modules /app/node_modules
COPY ["package.json", "package-lock.json*", "./"]

ENTRYPOINT [ "/usr/bin/tini" ]
CMD [ "npm", "run", "start" ]
