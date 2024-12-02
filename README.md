

1. run `yarn install`

2. run postgres on docker:
```
docker run --name postgres -d -p 5432:5432 -e POSTGRES_PASSWORD=password postgres:alpine
```

3. run: `npm run start`
<br> you can now see the endpoints in `http://localhost:3000/api`

4. run webhook endpoint:
```
PATCH
http://localhost:3000/webhooks/run-processes
{
  "process_id": 3,
  "url": "..."
}
```

5. check max value user can lend using `users/:user_id/max-lend` endpoint:
```
GET http://localhost:3000/users/2/max-lend
```

6. add some transactions to banks using `transactions` endpoint:
<br/>(possible IBANs 1.1, 2.1, 2.2, 2.3, 3.1)
<br/>(note: 1.2 is IBAN of user id=1 and bank id=2)
```
POST
http://localhost:3000/transactions
{
  "IBAN": "2.1",
  "amount": 123
}
```

7. rerun steps 4. and 5. to see updated values