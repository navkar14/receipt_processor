FROM node:alpine
WORKDIR /receipt_processor
COPY . /receipt_processor
RUN npm install
EXPOSE 3000
CMD node server.js
