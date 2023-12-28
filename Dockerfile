FROM node:20.10-alpine3.18
EXPOSE 3000
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install -g pnpm --prod
RUN pnpm i
COPY . .
ENV NODE_ENV=production
CMD ["pnpm", "run", "build"]
CMD ["pnpm", "start"]
