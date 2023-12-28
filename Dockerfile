FROM node:20.10-alpine3.18
EXPOSE 3000
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install -g pnpm
RUN pnpm i
COPY . .
ENV NODE_ENV=production
CMD ["npm", "run", "build"]
CMD ["npm", "run", "start"]
