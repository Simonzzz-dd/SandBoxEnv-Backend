FROM node:21-alpine

RUN npm install pm2 -g

RUN npm install -g nodemon


WORKDIR /backend

COPY package.json .

ENV PORT=3500
ENV MONGO_URI=mongodb://mongo_instance:27017/?retryWrites=true&w=majority
ENV apiResultDB=mongodb://mongo_instance:27017/api_result
ENV apiResponseDB=mongodb://mongo_instance:27017/api_response
ENV apiRequestDB=mongodb://mongo_instance:27017/api_request
ENV user=mongodb://mongo_instance:27017/users
ENV G2URL=http://localhost:5800/api/
ENV ORIGIN=*

RUN npm install

COPY . .

EXPOSE 3500

CMD ["npm", "run", "dev"]

