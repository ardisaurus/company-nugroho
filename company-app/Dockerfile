FROM node:14

WORKDIR /company-app
COPY package.json .
RUN npm install
COPY . .
CMD npm start
