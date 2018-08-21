# Use an official Ubuntu Xenial as a parent image
FROM ubuntu:16.04

# Install Node.js 8 and npm 5
RUN apt-get update
RUN apt-get -qq update
RUN apt-get install -y build-essential
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash
RUN apt-get install -y nodejs

RUN apt-get install -y imagemagick

RUN apt-get -y install potrace
RUN npm install -g svgo sqip

WORKDIR .
ADD . .
RUN npm i

EXPOSE 3000
CMD PORT=$PORT node index.js
