# Instructions
This project is built using the provided NestJs skeleton. 

## Prerequisites
- Make sure you have node version 23 installed.
- In the terminal, navigate to the project folder.
- Run:
  ```bash
  npm install
  ```
- Then run:
  ```bash
  docker-compose up
  ```
  (to run the DB)

## Running server
- Run:
  ```bash
  npm start
  ```
  The app is now exposed on port 3000.

## Running tests
(I've chosen to test the project using end-to-end tests, since it was the fitting for testing endpoints validations, CRUD operations and DB queries. All requirements are covered by the e2e tests.)

- Run:
  ```bash
  npm run test:e2e
  ```
