"use strict";
import React from "react";
import { configure, mount } from "enzyme";
import { mountToJson } from "enzyme-to-json";
import ReactSixteenAdapter from "enzyme-adapter-react-16";
import TransactionsList from "./TransactionsList";
configure({ adapter: new ReactSixteenAdapter() });

describe("TransactionsList", () => {
  const transactionsList = [];
  const component = mount(
    <TransactionsList transactionList={transactionsList} />
  );
  it("snapshot renders", () => {
    let tree = mountToJson(component, { mode: "deep" });
    expect(tree).toMatchSnapshot();
  });
});
