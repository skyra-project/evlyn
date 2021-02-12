FROM node:15-alpine

WORKDIR /usr/src/app

RUN apk add --no-cache \
	build-base \
	python

COPY package.json ./
COPY yarn.lock ./
COPY .yarnclean ./

# Replace dist with . because it will output to cwd
RUN sed -i 's/dist/./g' package.json

RUN yarn install --frozen-lockfile --link-duplicates

COPY dist/ .

CMD ["node", "./Evlyn.js"]
