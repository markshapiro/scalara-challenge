

docker run --name postgres -d -p 5432:5432 -e POSTGRES_PASSWORD=password postgres:alpine




npm run start:dev


POST http://localhost:3000/transactions

{
  "IBAN": "2.1",
  "amount": 123
}