FROM node:latest

# create destination directory
RUN mkdir -p ~/luiz/development/beachtennisstudentsmanager
WORKDIR /luiz/development/beachtennisstudentsmanager

RUN rm -rf ./node_modules
RUN rm -rf package-lock.json

# Install app dependencies
COPY ./package.json .
RUN yarn install

# Bundle app source
COPY . .

# run
CMD yarn start
