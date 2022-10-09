FROM node:lts
WORKDIR /ermancanitatli
COPY package.json .
COPY . .
RUN apt-get -qy update && apt-get -qy install openssl
RUN npm install
CMD rm -rf dist
RUN npm run build
COPY .env .env
CMD npx prisma db push

CMD npm start
