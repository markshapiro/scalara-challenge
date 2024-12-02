

1. instaliere alles mit `yarn install`

2. stelle Postgres bereit auf Docker:
```
docker run --name postgres -d -p 5432:5432 -e POSTGRES_PASSWORD=password postgres:alpine
```

3. starte Server mit `npm run start`
<br> Sie könne alle Endpukte ansehen und nutzen in `http://localhost:3000/api`

4. rufe Webhook Endpunkt auf in http://localhost:3000/api#/Webhooks/WebhookController_webhook

5. sehe den maximalen Leih-Betrag in http://localhost:3000/api#/Users/UserController_getMaxLend

6. kreiere neue Transaktionen in http://localhost:3000/api#/Transactions/TransactionController_createTransaction
<br/>(mögliche IBANs 1.1, 2.1, 2.2, 2.3, 3.1)
<br/>(Hinweiss: 1.2 ist ein IBAN von Nutzer mit id=1 und Bank mit id=2)

7. mache Schritte 4. und 5. um neue Werte von maximalen Leih-Beträge zu kriegen