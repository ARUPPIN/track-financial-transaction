# Financial Trasaction Evaluator

Financial Trasactions Evaluator is an application which takes a transactions list input and assesses the transactions performed in an Account with its reversal and calculate(s)/print(s) the effective balance (positive or negative) with the relevant number of transactions that were considered, in a given time frame.

Financial Trasactions are calculated using the following guidelines:

The effective account balance is the sum of funds that were transferred to / from an account in a given time frame.
Also Reversed transactions are omitted as part of the calculation, even if the reversing transaction is outside the given time frame.

## Application Design Overview

Financial Trasactions Evaluator is built on react and uses the following main components:

- **App Component** - Main component which encompasses a form for entering user inputs and a transaction list component.
- **SearchTransaction Component** - A Form component which gets valid Account Id, From Date, To date and searches the input csv to get list of eligible transactions within the timeframe.
- **List Transaction Component** - This component mainly lists all the relevant transactions performed with the mentioned timeframe.
- **FormErrors** - Error handling component for SearchTransaction component.
- **Utils** - Used to list all common functions. Also does the business processing and calculates the relative balance by taking the inputs entries (AccountID, fromDate, toDate).

## Validatoin and Error Handling

## Search Relevant Transactions and Balance Calculation

- Initially relevant 'PAYMENT' type transactions for a given accountID are filtered based on the given time frame.
- Then all 'REVERSAL' type transactions for the accountID are filtered, irrespective of the time frame.
- After fintering REVERSAL transactions, the related PAYMENT transaction from the list of PAYMENT transactions in Step 1 is removed.
- Then account balance is calculated, based on whether the input accountID transactions.

## Technologies/Libraries Used

React, Babel, CSV Papa Parser, Moment, Reactstrap, Webpack, Jest and Enzyme

## Clone track-financial-transaction

Clone the track-financial-transaction repository using

```
git clone https://github.com/ARUPPIN/track-financial-transaction.git
```

Get into the root directory of the application

```
cd track-financial-transaction
```

_Commands and its use:_

**yarn build** - Build and start the Financial Trasactions Evaluator from the source

**yarn start** - To Start the applicatoin locally

**yarn test** - To start the unit test(s)

**yarn format** - To format the code

## To start local static server:

For environments using Node, the easiest way to handle this would be to install serve

```
yarn build
npm install -g serve
serve -s build
```

The last command shown above will serve your static site on the port 5000. Like many of serve’s internal settings, the port can be adjusted using the -l or --listen flags:

```
serve -s build -l 4000
```
