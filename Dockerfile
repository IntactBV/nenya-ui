FROM node:21-alpine
RUN mkdir -p /app
WORKDIR /app
COPY . .
RUN yarn
RUN yarn build
EXPOSE 8080

ENV PORT 8080
CMD ["yarn", "start"]