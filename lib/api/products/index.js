/* eslint-disable quote-props */
export default axios => ({
  getETFSymbols: async () => {
    const token = sessionStorage.getItem('token')
    // TODO: move to const
    // TODO: crypto encoding
    const url = 'http://localhost:8181/api/finance/gpw/etf/symbols'
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
    // TODO: move to const
    // TODO: crypto encoding
    const url = 'http://localhost:8181/api/finance/gpw/stock/symbols'
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
