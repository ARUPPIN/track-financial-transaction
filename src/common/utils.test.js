"use strict";
jest.mock("papaparse");
import babelPolyfill from "babel-polyfill";
import Papa from "papaparse";
import { DATE_TIME_FORMAT, TRANSACTIONS_CSV_PATH } from "./constants";
import {
  convertMillisToDate,
  convertStrToDate,
  isValidDate,
  camelCaseToTitle,
  getTransactionsWithAcctId,
  calculateBalance,
  readCSVFile
} from "./utils.js";

describe("Utils function coverage", () => {
  it("convertMillisToDate test", () => {
    const millis = 1569973983465;
    const convertedDate = convertMillisToDate(millis);
    expect(convertedDate).toBe("02/10/2019 09:53:03");
  });

  it("convertStrToDate test", () => {
    const dateStr = "02/10/2019 09:53:03";
    const convertedToDate = convertStrToDate(dateStr);
    expect(convertedToDate.format(DATE_TIME_FORMAT)).toBe(dateStr);
  });

  it("isValidDate test", () => {
    const input = 1569973983465;
    const validDate = isValidDate(input);
    expect(validDate).toEqual(true);
  });

  it("isValidDate test", () => {
    const input = "test input";
    const validDate = isValidDate(input);
    expect(validDate).toEqual(false);
  });

  it("camelCaseToTitle test", () => {
    const inputStr = "accountId";
    const opStr = camelCaseToTitle(inputStr);
    expect(opStr).toEqual("Account Id");
  });

  it("readCSVFile test", done => {
    const mockSuccessResponse = {};
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise
    });
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

    Papa.parse(() => {});

    const callbackFn = jest.fn();
    readCSVFile(callbackFn);

    expect(global.fetch).toHaveBeenCalledTimes(1);

    global.fetch.mockClear();
    delete global.fetch;
    done();
  });

  it("getTransactionsWithAcctId test", () => {
    const transactionList = [
      [
        "TX10001",
        "ACC334455",
        "ACC778899",
        "20/10/2018 12:47:55",
        25.0,
        "PAYMENT",
        null
      ],
      [
        "TX10002",
        "ACC334455",
        "ACC998877",
        "20/10/2018 17:33:43",
        10.5,
        "PAYMENT",
        null
      ],
      [
        "TX10003",
        "ACC998877",
        "ACC778899",
        "20/10/2018 18:00:00",
        5.0,
        "PAYMENT",
        null
      ],
      [
        "TX10004",
        "ACC334455",
        "ACC998877",
        "20/10/2018 19:45:00",
        10.5,
        "REVERSAL",
        "TX10002"
      ],
      [
        "TX10005",
        "ACC334455",
        "ACC778899",
        "21/10/2018 09:30:00",
        7.25,
        "PAYMENT",
        null
      ]
    ];
    const acctId = "ACC334455";
    const fromDate = "20/10/2018 12:00:00";
    const toDate = "20/10/2018 19:00:00";

    const listOfTr = getTransactionsWithAcctId(
      transactionList,
      acctId,
      fromDate,
      toDate
    );
    const expectedTr = [
      [
        "TX10001",
        "ACC334455",
        "ACC778899",
        "20/10/2018 12:47:55",
        25.0,
        "PAYMENT",
        null
      ]
    ];

    expect(listOfTr).toEqual(expectedTr);
  });

  it("calculateBalance test", () => {
    const transactions = [
      [
        "TX10001",
        "ACC334455",
        "ACC778899",
        "20/10/2018 12:47:55",
        25.0,
        "PAYMENT",
        null
      ],
      [
        "TX10005",
        "ACC334455",
        "ACC778899",
        "21/10/2018 09:30:00",
        7.25,
        "PAYMENT",
        null
      ]
    ];
    const calculatedBal = calculateBalance(transactions);
    const expectedBalance = 32.25;
    expect(calculatedBal).toEqual(expectedBalance);
  });
});
