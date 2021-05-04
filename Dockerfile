FROM node:15-alpine

WORKDIR /usr/src/app

RUN apk add --no-cache \
	build-base \
	python

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --frozen-lockfile --link-duplicates

COPY dist/ dist/

CMD ["yarn", "start"]
