/* eslint-disable quote-props */
import { BASE_URL, API_PACKAGE } from 'assets/constant/api'

export default axios => ({
  getCommoditySymbols: async () => {
    const token = sessionStorage.getItem('token')
    const url = `${BASE_URL.api}${API_PACKAGE.finance}/commodity`
    const headers = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
    return await axios.get(url, headers)
      .catch(error => error.response)
  },

  getCommodityTranslation: async () => {
    const token = sessionStorage.getItem('token')
    const url = `${BASE_URL.api}${API_PACKAGE.finance}/chart/commodities/names`
    const headers = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
    return await axios.get(url, headers)
      .catch(error => error.response)
  },

  getCurrencySymbols: async () => {
    const token = sessionStorage.getItem('token')
    const url = `${BASE_URL.api}${API_PACKAGE.product}/investment/currencies`
    const headers = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
    return await axios.get(url, headers)
      .catch(error => error.response)
  },

  getETFSymbols: async () => {
    const token = sessionStorage.getItem('token')
    const url = `${BASE_URL.api}${API_PACKAGE.finance}/gpw/etf/symbols`
    const headers = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
    return await axios.get(url, headers)
      .catch(error => error.response)
  },

  getStockSymbols: async () => {
    const token = sessionStorage.getItem('token')
    const url = `${BASE_URL.api}${API_PACKAGE.finance}/gpw/stock/symbols`
    const headers = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
    return await axios.get(url, headers)
      .catch(error => error.response)
  }
})
