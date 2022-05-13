# bank-scam-spam

A simple (and quickly written) script for spamming bank scam APIs.

## Goal

To fill the attacker's database with dummy data. I'm doing that just because I hate that kind of attack, and if we spam their APIs, MAYBE the actual people who fall into that kind of scam will be a little bit "safer" because their data will be among a bunch of unusable crap.

## Adapting it to your use case

Modify `index.js`'s `URL` and `payload` according to the target API endpoint.
To do that, you'll have to check how the scam page works and where the API is located (Chrome DevTools is your friend).
**USE INCOGNITO IF YOU NAVIGATE THOSE PAGES!**

## Usage
- `npm i` / `yarn`
- `npm start` / `yarn start` / `node index.js`
