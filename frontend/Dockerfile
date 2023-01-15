FROM node:18-alpine as builder

WORKDIR /react-vite-app

COPY package.json package-lock.json ./

RUN npm install --silent

COPY . ./

EXPOSE 5173

RUN npm run build

FROM nginx:alpine as production-build

# # Basic auth credentials
# ENV BASIC_USERNAME=admin
# ENV BASIC_PASSWORD=admin

COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy from stage 1
COPY --from=builder /react-vite-app/dist /usr/share/nginx/html

EXPOSE 80

# COPY ./.nginx/run.sh ./
# RUN chmod 0755 ./run.sh
# CMD [ "./run.sh" ]

ENTRYPOINT ["nginx", "-g", "daemon off;"]