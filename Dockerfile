FROM node:16-alpine as builder

COPY . /politics-dashboard-dev

WORKDIR /politics-dashboard-dev

RUN yarn
# Build the app
RUN yarn build

FROM nginx:alpine

RUN mkdir -p /var/www/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /politics-dashboard-dev/dist /var/www/html
