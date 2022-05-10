FROM node:16-alpine 
COPY package*.json ./
RUN npm install
COPY . .

# FROM prom/prometheus
# ADD  prometheus.yml /etc/prometheus/

CMD [ "node", "index.js" ] 