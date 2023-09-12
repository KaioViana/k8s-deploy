FROM node:18-alpine3.17 as builder

WORKDIR /usr/src/app

ARG PORT=3333

RUN apk update --no-cache \
  && apk add bash \
  && apk add --no-cache coreutils curl

COPY --chown=node:node package.json ./
COPY --chown=node:node yarn.lock ./
COPY --chown=node:node tsconfig.json ./

EXPOSE ${PORT}

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD curl --fail http://localhost:$PORT || exit 1


# =================
# DEVELOPMENT
# =================
FROM builder as development

WORKDIR /usr/src/app

ENV NODE_ENV development

COPY --chown=node:node src/ ./src/

COPY docker/wait-for-it.sh /usr/local/bin/wait-for-it
RUN chmod +x /usr/local/bin/wait-for-it

COPY docker/dev-entrypoint.sh .
RUN chmod +x ./dev-entrypoint.sh

RUN yarn install

USER node

ENTRYPOINT ["sh", "dev-entrypoint.sh" ]

CMD ["yarn", "start:dev"]


# ==============
# STAGE
# ==============
FROM builder as stage

WORKDIR /usr/src/app

COPY --chown=node:node src/ ./src/

RUN yarn install && yarn build

USER node


# ===========
# PRODUCTION
# ===========
FROM node:lts-buster-slim as production

WORKDIR /usr/src/app

ENV NODE_ENV production

COPY --from=stage /usr/src/app/package.json ./
COPY --from=stage /usr/src/app/dist ./dist

RUN yarn install --production --frozen-lockfile

USER node

CMD ["yarn", "start:prod"]
