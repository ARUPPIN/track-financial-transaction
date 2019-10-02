"use strict";
import React from "react";
import { Button, Form, FormGroup } from "reactstrap";
import Datetime from "react-datetime";
import { FormErrors } from "./FormErrors";
import { convertMillisToDate, isValidDate } from "../../common/utils";
import { ACCOUNT_ID_FORMAT } from "../../common/constants";
import "../../styles/SearchTransactions.css";

class SearchTransactions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accountId: "",
      fromDate: "",
      toDate: "",
      formErrors: { accountId: "", fromDate: "", toDate: "" },
      accountIdValid: false,
      fromDateValid: false,
      toDateValid: false,
      formValid: false
    };
    this.searchTransaction = this.searchTransaction.bind(this);
    this.handleAccountIdChg = this.handleAccountIdChg.bind(this);
    this.handleFromDateChg = this.handleFromDateChg.bind(this);
    this.handleToDateChg = this.handleToDateChg.bind(this);
    this.validateChange = this.validateChange.bind(this);
  }

  validateChange(name, val) {
    let { formErrors, accountIdValid, fromDateValid, toDateValid } = this.state;
    switch (name) {
      case "accountId":
        var patt = new RegExp(ACCOUNT_ID_FORMAT);
        accountIdValid = patt.test(val);
        formErrors.accountId = accountIdValid ? "" : " is invalid";
        break;
      case "fromDate":
        fromDateValid = isValidDate(val);
        formErrors.fromDate = fromDateValid ? "" : " is invalid";
        break;
      case "toDate":
        toDateValid = isValidDate(val);
        formErrors.toDate = toDateValid ? "" : " is invalid";
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: formErrors,
        accountIdValid: accountIdValid,
        fromDateValid: fromDateValid,
        toDateValid: toDateValid
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid:
        this.state.accountIdValid &&
        this.state.fromDateValid &&
        this.state.toDateValid
    });
  }

  handleAccountIdChg(e) {
    if (e && e.target) {
      e.preventDefault();
      const name = e.target.name;
      const value = e.target.value;
      //Add sufficient validations
      this.setState({ accountId: e.target.value.toString() }, () => {
        this.validateChange(name, value);
      });
    }
  }

  handleFromDateChg(e) {
    const date = e;
    this.setState({ fromDate: convertMillisToDate(e) }, () => {
      this.validateChange("fromDate", date);
    });
  }

  handleToDateChg(e) {
    const date = e;
    this.setState({ toDate: convertMillisToDate(e) }, () => {
      this.validateChange("toDate", date);
    });
  }

  searchTransaction(e) {
    e.preventDefault();
    this.props.searchTransactionsInfo(
      this.state.accountId,
      this.state.fromDate,
      this.state.toDate
    );
  }

  render() {
    const { accountId, fromDate, toDate, formValid } = this.state;
    return (
      <>
        <Form className="container-search" onSubmit={this.searchTransaction}>
          <FormGroup>
            <label className="search-field-label">Account Id: </label>
            <input
              name="accountId"
              className="search-field-input"
              type="text"
              value={accountId}
              onChange={this.handleAccountIdChg}
              required
              placeholder="Enter Account Id"
            />
          </FormGroup>
          <FormGroup>
            <label>From Date: </label>
            <i className="far fa-calendar-alt"></i>
            <Datetime
              dateFormat="DD/MM/YYYY"
              timeFormat="HH:mm:ss"
              timeConstraints={{
                hours: { min: 0, max: 23 },
                minutes: { min: 0, max: 59 },
                seconds: { min: 0, max: 59 }
              }}
              closeOnTab={true}
              closeOnSelect={true}
              value={fromDate}
              onChange={this.handleFromDateChg}
              inputProps={{
                placeholder: "Select transaction start date",
                required: true,
                className: "field-from-date"
              }}
            />
          </FormGroup>
          <FormGroup>
            <label>To Date: </label>
            <Datetime
              dateFormat="DD/MM/YYYY"
              timeFormat="HH:mm:ss"
              timeConstraints={{
                hours: { min: 0, max: 23 },
                minutes: { min: 0, max: 59 },
                seconds: { min: 0, max: 59 }
              }}
              closeOnTab={true}
              closeOnSelect={true}
              value={toDate}
              onChange={this.handleToDateChg}
              inputProps={{
                placeholder: "Select transaction end date",
                required: true,
                className: "field-to-date"
              }}
            />
          </FormGroup>
          <FormGroup className="form-btn-align">
            {formValid ? (
              <Button outline color="primary" type="submit">
                Search Transactions
              </Button>
            ) : (
              <Button outline disabled>
                Search Transactions
              </Button>
            )}
          </FormGroup>
          <FormGroup>
            <div className="panel panel-default">
              <FormErrors formErrors={this.state.formErrors} />
            </div>
          </FormGroup>
        </Form>
      </>
    );
  }
}

export default SearchTransactions;
