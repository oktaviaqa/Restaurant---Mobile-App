FROM node:18.16.1

WORKDIR /users

ENV PORT=4001

COPY package.json package-lock.json /users/

RUN npm install && npm cache clean --force

COPY ./ ./

CMD [ "npm", "run", "start" ]