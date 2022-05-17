# shopify-challenge
 Basic inventory management CRUD made for shopify challenge application


# How to run?

## With docker
1. Create inventauraus/.env file and write `DATABASE_URL="postgresql://postgres:postgres@localhost:5433/inventaurus?schema=public"`
0. Start docker
0. At the root of the project, run `docker-compose up`
0. The site should be accessible at [http://localhost:3000](http://localhost:3000)

## With nix (replit.com)
Replit config files are all present, you should be able to start everything by running the start.sh script
