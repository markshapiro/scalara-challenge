


steps:

1. run postgres on docker:
<br/>
```
docker run --name postgres -d -p 5432:5432 -e POSTGRES_PASSWORD=password postgres:alpine
```

2. run: `npm run start`
<br> you can now see the endpoints in `http://localhost:3000/api`

3. add some transactions to banks using `transactions` endpoint:
<br/>(possible IBANs 1.1, 2.1, 2.2, 2.3, 3.1)
<br/>(note: 1.2 is IBAN of user id=1 and bank id=2)
<br/>
<br/>POST http://localhost:3000/transactions
<br/>
`{
  "IBAN": "2.1",
  "amount": 123
}`

4. run webhook endpoint:
<br/>POST http://localhost:3000/webhooks/run-processes
<br/>
`{
  "process_id": 3,
  "url": "..."
}`

4. check max value user can lend using `users/:user_id/max-lend` endpoint:
<br/>GET http://localhost:3000/users/2/max-lend
