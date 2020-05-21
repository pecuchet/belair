FROM node:14.3-alpine3.11

ARG NODE_ENV=${NODE_ENV}
ENV NODE_ENV=${NODE_ENV}

LABEL maintainer="dotburo <ops@dotburo.org>"

WORKDIR /var/www/html

COPY package*.json ./

COPY . .

USER node

CMD ["npm", "run", "dev"]
