"use strict";
import moment from "moment";
import Papa from "papaparse";
import { DATE_TIME_FORMAT, TRANSACTIONS_CSV_PATH } from "./constants";

export const convertMillisToDate = millis => {
  return moment(millis).format(DATE_TIME_FORMAT);
};

export const convertStrToDate = dateStr => {
  return moment(dateStr, DATE_TIME_FORMAT);
};

export const isValidDate = date => {
  console.log("moment(date).isValid: " + moment(date).isValid());
  return moment(date).isValid();
};
function fetchCsv() {
  return fetch(TRANSACTIONS_CSV_PATH).then(function(response) {
    let reader = response.body.getReader();
    let decoder = new TextDecoder("utf-8");

    return reader.read().then(function(result) {
      return decoder.decode(result.value);
    });
  });
}

async function getCsvData(callback) {
  let csvData = await fetchCsv();
  Papa.parse(csvData, {
    complete: callback
  });
}

export const readCSVFile = callback => {
  getCsvData(callback);
};

export const accountTransactions = (trList, accountId, fromDate, toDate) => {
  let acctTrWithReversal = trList.filter(trRow => {
    return trRow[1] === accountId;
  });
  let trToBeReversed = acctTrWithReversal.filter(trRow => {
    return trRow[6] !== null && trRow[6] !== "";
  });
  //console.log("acctTrWithReversal: " + acctTrWithReversal);
  let acctTrInTimeFrame = acctTrWithReversal.filter(trRow => {
    let trDate = convertStrToDate(trRow[3]);
    fromDate = convertStrToDate(fromDate);
    toDate = convertStrToDate(toDate);
    /*console.log(
      "trDate: " + trDate + ", fromDate: " + fromDate + ", toDate: " + toDate
    );
    console.log("is valid fromDate: " + (trDate >= fromDate));
    console.log("is valid toDate: " + (trDate <= toDate));
    console.log("is valid: " + (trDate >= fromDate && trDate <= toDate));*/
    return trDate >= fromDate && trDate <= toDate;
  });
  //console.log("acctTrInTimeFrame: " + acctTrInTimeFrame);
  let reversedTransactions = acctTrInTimeFrame;
  trToBeReversed.forEach(reversedTr => {
    reversedTransactions = reversedTransactions.filter(trRow => {
      return trRow[0] !== reversedTr[0] && trRow[0] !== reversedTr[6];
    });
  });
  return reversedTransactions;
};

export const calculateBalance = filteredTransactions => {
  let balanceEntries = filteredTransactions.map((trRow, idx) => {
    return trRow[4];
  });
  return balanceEntries.reduce((bal, amt) => parseFloat(bal) + parseFloat(amt));
};
