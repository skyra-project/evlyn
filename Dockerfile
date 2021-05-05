FROM --platform=linux/amd64 node:16-alpine

WORKDIR /usr/src/app

RUN apk add --no-cache \
	build-base \
	dumb-init \
	python

COPY --chown=node:node package.json ./
COPY --chown=node:node yarn.lock ./
COPY --chown=node:node dist/ dist/

RUN yarn install --frozen-lockfile --link-duplicates

USER node

CMD [ "dumb-init", "yarn", "start" ]
