FROM node:16-alpine3.15 AS base
WORKDIR /usr/src/app
COPY --chown=node:node . .

FROM base as development
ENV NODE_ENV=development
RUN npm install
CMD ["npm", "run", "start:dev"]

FROM base AS production
ENV NODE_ENV=production
RUN npm ci
USER node
CMD ["npm", "run", "start:prod"]
