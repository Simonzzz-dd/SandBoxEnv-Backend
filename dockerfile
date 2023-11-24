FROM node:21-alpine

RUN npm install -g nodemon

WORKDIR /backend

COPY package.json .

ENV PORT=4000
ENV MONGO_URI=mongodb://mongo_instance:27017/?retryWrites=true&w=majority
ENV apiResultDB=mongodb://mongo_instance:27017/api_result
ENV apiResponseDB=mongodb://mongo_instance:27017/api_response
ENV apiRequestDB=mongodb://mongo_instance:27017/api_request
ENV user=mongodb://mongo_instance:27017/users
ENV G2URL=http://mongo_instance:5800/api/
ENV ORIGIN=http://127.0.0.1:3000

RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "run", "dev"]

