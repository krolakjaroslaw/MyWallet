/* eslint-disable quote-props */
// noinspection JSUnresolvedVariable

import { BASE_URL, API_PACKAGE } from 'assets/constant/api'

const mapFromBackend = (promise) => {
  const result = { ...promise }
  result.data = result.data.map(item => ({
    askPrice: item.askPrice.toFixed(4),
    change: item.bidDatChangePercentage,
    bidPrice: item.bidPrice.toFixed(4),
    highBidPrice: item.highBidPrice.toFixed(4),
    lowBidPrice: item.lowBidPrice.toFixed(4),
    symbol: item.symbol.split('.')[0]
  }))
  return result
}

const mapIndexFromBackend = (promise) => {
  const result = { ...promise }
  result.data = result.data.map(item => ({
    change: item.change.toFixed(2) + '%',
    quote: item.quote.toFixed(4),
    quoteMax: item.quoteMax.toFixed(4),
    quoteMin: item.quoteMin.toFixed(4),
    symbol: item.symbol
  }))
  return result
}

const mapStockFromBackend = (promise) => {
  const result = { ...promise }
  result.data = result.data.map(item => ({
    askSize: item.askSize !== null ? item.askSize.toFixed(4) : '-',
    bidSize: item.bidSize !== null ? item.bidSize.toFixed(4) : '-',
    change: item.change !== null ? item.change.toFixed(2) + '%' : '-',
    quote: item.quote !== null ? item.quote.toFixed(4) : '-',
    quoteMax: item.quoteMax !== null ? item.quoteMax.toFixed(4) : '-',
    quoteMin: item.quoteMin !== null ? item.quoteMin.toFixed(4) : '-',
    symbol: item.symbol,
    symbolShort: item.symbolShort,
    volume: item.volume ?? '-'
  }))
  return result
}

export default axios => ({
  getCommodity: async () => {
    const token = sessionStorage.getItem('token')
    const url = `${BASE_URL.api}${API_PACKAGE.finance}/commodity`
    const headers = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
    const promise = await axios.get(url, headers)
      .catch(error => error.response)
    return mapFromBackend(promise)
  },

  getCurrency: async () => {
    const token = sessionStorage.getItem('token')
    const url = `${BASE_URL.api}${API_PACKAGE.finance}/currency/info`
    const headers = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
    const promise = await axios.get(url, headers)
      .catch(error => error.response)
    return mapFromBackend(promise)
  },

  getIndexGpw: async () => {
    const token = sessionStorage.getItem('token')
    const url = `${BASE_URL.api}${API_PACKAGE.finance}/gpw/index`
    const headers = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
    const promise = await axios.get(url, headers)
      .catch(error => error.response)
    return mapIndexFromBackend(promise)
  },

  getEtfGpw: async () => {
    const token = sessionStorage.getItem('token')
    const url = `${BASE_URL.api}${API_PACKAGE.finance}/gpw/etf`
    const headers = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
    const promise = await axios.get(url, headers)
      .catch(error => error.response)
    return mapStockFromBackend(promise)
  },

  getStockGpw: async () => {
    const token = sessionStorage.getItem('token')
    const url = `${BASE_URL.api}${API_PACKAGE.finance}/gpw/stock`
    const headers = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
    const promise = await axios.get(url, headers)
      .catch(error => error.response)
    return mapStockFromBackend(promise)
  }
})
