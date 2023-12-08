FROM node:18.16.1

WORKDIR /app

ENV PORT=4002
# ENV NODE_ENV=production

COPY package.json package-lock.json /app/

RUN npm install && npm cache clean --force

RUN npm install -g nodemon

COPY ./ ./

CMD [ "npm", "run", "start" ]