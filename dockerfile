# Stage 1 - the build process
FROM node:8.11.3
ADD . /code
WORKDIR /code

COPY package*.json ./
RUN yarn
COPY . .
# start app
EXPOSE 80
CMD ["npm", "start"]
