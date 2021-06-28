# Backend

## 1. Setup environment variables

Copy `.env.example` to `.env` & modify env vars.

## 2. Install node modules

```bash
npm i
```

## Run tests

```bash
npm run test
```

## Run server

Start GRPC server

```bash
npm run start:grpc
```

Start HTTP server

```bash
npm run start:http
```

## 3. Import CSV

For this project I've used a in-memory database, so we need to import CSV to it.
I've already imported, if you want reimport it here's how to do it.

```bash
cat data/meterusage.csv | node tools/importData.js
```
