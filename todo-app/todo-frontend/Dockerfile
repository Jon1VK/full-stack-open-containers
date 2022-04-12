FROM node:16-alpine3.15 AS base
WORKDIR /usr/src/app
COPY . .

FROM base as development
ENV NODE_ENV=development
RUN npm install
ENV PORT=80
CMD ["npm", "start"]

FROM base AS test
ENV NODE_ENV=test
ENV CI=true
RUN npm ci
RUN npm run test

FROM test AS build
ENV NODE_ENV=production
ARG BACKEND_URL
ENV REACT_APP_BACKEND_URL $BACKEND_URL
RUN npm ci
RUN npm run build

FROM nginx:1.21-alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html
