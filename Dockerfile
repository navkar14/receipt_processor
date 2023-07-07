FROM node:alpine
WORKDIR /receipt_processor
COPY package.json .
RUN npm install
COPY . /receipt_processor
EXPOSE 3000
ARG PORT_ARG=3000
ENV PORT=$PORT_ARG
CMD npm start
