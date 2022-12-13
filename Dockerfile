FROM node:alpine

WORKDIR /usr/src/app

COPY ./package.json ./
RUN npm install --force

COPY . .

RUN npm run build-client
RUN npm run build


EXPOSE 3000

# CMD ["npm","run","build-client"]
# CMD ["npm","run","build"]
CMD ["npm","start"]