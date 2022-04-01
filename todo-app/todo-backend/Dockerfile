FROM node:lts-alpine@sha256:5e20a4e2e52daa1743006c224f2971b1218201e284d17c6eff4a696c9020f1a2
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY --chown=node:node . .
RUN npm ci --only=production
USER node
CMD npm start
