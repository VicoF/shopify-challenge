# Install dependencies only when needed
FROM node:16-alpine
WORKDIR /app
USER root
COPY ./ ./
RUN yarn install --frozen-lockfile

CMD ["./start.sh"]