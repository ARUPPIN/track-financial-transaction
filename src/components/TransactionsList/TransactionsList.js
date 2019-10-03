"use strict";
import React from "react";
import { Spinner } from "reactstrap";
import { TR_LIST_ITEMS } from "../../common/constants";
import "../../styles/TransactionsList.css";

class TransactionsList extends React.Component {
  render() {
    const { transactionList, showSpinner } = this.props;
    return (
      <>
        {transactionList.length > 0 ? (
          <table align="center">
            <thead>
              <tr>
                {TR_LIST_ITEMS.map((headingItem, thIdx) => {
                  return (
                    <th className="th-style" key={thIdx}>
                      {headingItem}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {transactionList.map((trItem, trIdx) => {
                return (
                  <tr key={trIdx}>
                    {trItem.map((tdItem, tdIdx) => {
                      return (
                        <td className="th-style" key={tdIdx}>
                          {tdItem}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : showSpinner ? (
          <div align="center">
            <Spinner color="primary" />
          </div>
        ) : (
          <div align="center">
            No Transactions in specified timeframe! Please input values to
            search for transactions.
          </div>
        )}
      </>
    );
  }
}

export default TransactionsList;
