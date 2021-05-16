/* eslint-disable quote-props */
export default axios => ({
  addInvestmentToWallet: async (id, request) => {
    const token = sessionStorage.getItem('token')
    // TODO: move to const
    // TODO: crypto encoding
    const url = `http://localhost:8181/api/product/investment/wallet/${id}`
    const headers = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
    return await axios.post(url, request, headers)
      .catch(error => error.response)
  },

  getWalletInfo: async (id) => {
    const token = sessionStorage.getItem('token')
    // TODO: move to const
    // TODO: crypto encoding
    const url = `http://localhost:8181/api/wallet/${id}`
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
