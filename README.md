


steps:

1. run postgres on docker:
<br/>
`docker run --name postgres -d -p 5432:5432 -e POSTGRES_PASSWORD=password postgres:alpine`

2. run `npm run start`

3. add some transactions to banks ()

POST http://localhost:3000/transactions
<br/>
`{
  "IBAN": "2.1",
  "amount": 123
}`


POST http://localhost:3000/webhooks/run-processes
<br/>
`{
  "process_id": 3,
  "url": "..."
}`