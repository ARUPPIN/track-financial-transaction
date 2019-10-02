"use strict";
import React from "react";
import { configure, mount } from "enzyme";
import { mountToJson } from "enzyme-to-json";
import babelPolyfill from "babel-polyfill";
import {
  readCSVFile,
  getTransactionsWithAcctId,
  calculateBalance
} from "../common/utils";
import ReactSixteenAdapter from "enzyme-adapter-react-16";
import App from "./App";
configure({ adapter: new ReactSixteenAdapter() });

describe("App", () => {
  const component = mount(<App />);
  it("snapshot renders", () => {
    let tree = mountToJson(component, { mode: "deep" });
    expect(tree).toMatchSnapshot();
  });

  it("component did mount with SearchTransactions form", () => {
    const header = component.find(".App-header");
    expect(header.length).toEqual(1);
    const searchContainer = component.find(".container-search");
    expect(searchContainer.length).toEqual(2);
  });

  it("component doesnt load with transaction list", () => {
    const trList = component.find(".tr-balance");
    expect(trList.length).toEqual(0);
  });

  it("component load with transaction list if state is passed", () => {
    component.setState({
      transactionList: [
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
      ]
    });
    const trList = component.find(".tr-balance");
    expect(trList.length).toEqual(1);
  });

  it("component fetched data updates tr list", () => {
    const transactionList = {
      data: [
        [
          "Transaction Id",
          "From Account Id",
          "To Account Id",
          "Created At",
          "Amount",
          "Transaction Type",
          "Related Transaction"
        ],
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
        ]
      ]
    };
    const expectedVal = [
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
      ]
    ];
    component.instance().fetchedData(transactionList);
    expect(component.state("allTransactions")).toEqual(expectedVal);
  });

  it("component searchTransactionsInfo filters transactions and updates balance", () => {
    jest.mock("../common/utils", () => ({
      readCSVFile: jest
        .fn()
        .mockImplementation(() => [
          [
            "TX10002",
            "ACC334455",
            "ACC998877",
            "20/10/2018 17:33:43",
            10.5,
            "PAYMENT",
            null
          ]
        ]),
      getTransactionsWithAcctId: jest.fn().mockImplementation(() => []),
      calculateBalance: jest.fn().mockImplementation(() => [])
    }));
    component
      .instance()
      .searchTransactionsInfo(
        "ACC334455",
        "20/10/2018 12:47:55",
        "20/10/2018 19:45:00"
      );
    expect(component.state("calculatedBalance")).toEqual(0.0);
  });
});
