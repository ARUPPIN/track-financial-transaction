'use strict'
import React from 'react'
import { configure, mount } from 'enzyme'
import { mountToJson } from 'enzyme-to-json'
import ReactSixteenAdapter from 'enzyme-adapter-react-16'
import SearchTransactions from './SearchTransactions'
configure({ adapter: new ReactSixteenAdapter() })

describe('SearchTransactions', () => {
  const searchTransactionsInfo = jest.fn()
  const component = mount(
    <SearchTransactions searchTransactionsInfo={searchTransactionsInfo} />
  )
  it('snapshot renders', () => {
    let tree = mountToJson(component, { mode: 'deep' })
    expect(tree).toMatchSnapshot()
  })

  it('component did mount with form and submit button', () => {
    expect(component.find('form').length).toEqual(1)
    const submitBtn = component.find('button')
    expect(submitBtn.length).toEqual(1)
    expect(submitBtn.props().disabled).toBe(true)
  })

  it("component's accountId is updated", () => {
    const accountIdInput = component.find('.search-field-input')
    expect(accountIdInput.length).toEqual(1)
    accountIdInput.simulate('change', {
      target: { value: 'ACC334455', name: 'accountId' },
      preventDefault: jest.fn()
    })
    expect(component.state('accountId')).toBe('ACC334455')
    expect(component.state('accountIdValid')).toBe(true)
  })

  it("component's accountId is not updated", () => {
    const accountIdInput = component.find('.search-field-input')
    expect(accountIdInput.length).toEqual(1)
    accountIdInput.simulate('change', {
      target: { value: '123456789', name: 'accountId' },
      preventDefault: jest.fn()
    })
    expect(component.state('accountIdValid')).toBe(false)
  })

  it("component's fromDate is updated", () => {
    const fromDateInput = component.find('.field-from-date')
    expect(fromDateInput.length).toEqual(1)
    component.instance().handleFromDateChg('2016-10-19')
    expect(component.state('fromDateValid')).toBe(true)
  })

  it("component's fromDate is not updated", () => {
    const fromDateInput = component.find('.field-from-date')
    expect(fromDateInput.length).toEqual(1)
    component.instance().handleFromDateChg('')
    expect(component.state('fromDateValid')).toBe(false)
  })

  it("component's toDate is updated", () => {
    const toDateInput = component.find('.field-to-date')
    expect(toDateInput.length).toEqual(1)
    component.instance().handleToDateChg('2016-10-19')
    expect(component.state('toDateValid')).toBe(true)
  })

  it("component's toDate is not updated", () => {
    const toDateInput = component.find('.field-to-date')
    expect(toDateInput.length).toEqual(1)
    component.instance().handleToDateChg('')
    expect(component.state('toDateValid')).toBe(false)
    expect(component.state('formValid')).toBe(false)
  })

  it('component formValid test', () => {
    expect(component.state('formValid')).toBe(false)
  })

  it('component searchTransaction test', () => {
    let evt = {
      target: { value: '123456789' },
      preventDefault: jest.fn()
    }
    component.instance().searchTransaction(evt)
    expect(searchTransactionsInfo).toHaveBeenCalled()
  })

  it('component submit button is disabled', () => {
    expect(component.find('form').length).toEqual(1)
    const submitBtn = component.find('button')
    expect(submitBtn.length).toEqual(1)
    expect(submitBtn.props().disabled).toBe(true)
  })
})
