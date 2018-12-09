#########################
# PRODUCTION CONTAINER #
FROM node:alpine 

WORKDIR /usr/src/mailer

#TO BUILD INSIDE A CONTAINER
# COPY . .
#RUN npm install && npm run build && npm prune --production


#TO BUILD IN PIPELINE
COPY . .

RUN npm i --production

EXPOSE 3000

CMD [ "npm", "start" ]
