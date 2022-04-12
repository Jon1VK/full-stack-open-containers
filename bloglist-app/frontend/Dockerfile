FROM node:16-alpine3.15 AS base
WORKDIR /usr/src/app
COPY . .

FROM base as development
ENV NODE_ENV=development
RUN npm install
CMD ["npm", "start"]

FROM base AS build
ENV NODE_ENV=production
RUN npm ci
ENV DISABLE_ESLINT_PLUGIN=true
RUN npm run build

FROM nginx:1.21-alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html
