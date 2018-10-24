FROM node:10-alpine

LABEL name="parking-notifier-frontend"
LABEL version="1.0.0"

WORKDIR /parkingNotifier/frontend

COPY . .

RUN npm install
RUN npm install react-scripts -g

CMD ["npm", "start"]