FROM node:20.10-alpine3.18
EXPOSE 3000
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm i
COPY . .
ENV NODE_ENV=production
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000
CMD ["npm", "run", "build"]
CMD ["npm", "run", "start"]
