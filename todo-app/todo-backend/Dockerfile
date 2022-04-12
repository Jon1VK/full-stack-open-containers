FROM node:16-alpine3.15 AS base
WORKDIR /usr/src/app
COPY --chown=node:node . .

FROM base as development
ENV NODE_ENV=development
RUN npm install
CMD ["npm", "run", "dev"]

FROM base AS build
ENV NODE_ENV=production
RUN npm ci
USER node
CMD ["npm", "start"]
