/* eslint-disable quote-props */
export default axios => ({
  addDepositAccountToWallet: async (id, request) => {
    const token = sessionStorage.getItem('token')
    // TODO: move to const
    // TODO: crypto encoding
    const url = `http://localhost:8181/api/product/deposit/wallet/${id}`
    const headers = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
    return await axios.post(url, request, headers)
      .catch(error => error.response)
  },

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

  addRealEstateToWallet: async (id, request) => {
    const token = sessionStorage.getItem('token')
    // TODO: move to const
    // TODO: crypto encoding
    const url = `http://localhost:8181/api/product/realestate/wallet/${id}`
    const headers = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
    return await axios.post(url, request, headers)
      .catch(error => error.response)
  },

  addTimeDepositToWallet: async (id, request) => {
    const token = sessionStorage.getItem('token')
    // TODO: move to const
    // TODO: crypto encoding
    const url = `http://localhost:8181/api/product/time-deposit/wallet/${id}`
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
  },

  removeDepositAccountFromWallet: async (id) => {
    const token = sessionStorage.getItem('token')
    // TODO: move to const
    // TODO: crypto encoding
    const url = `http://localhost:8181/api/product/deposit/${id}`
    const headers = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
    return await axios.delete(url, headers)
      .catch(error => error.response)
  },

  removeRealEstateFromWallet: async (id) => {
    const token = sessionStorage.getItem('token')
    // TODO: move to const
    // TODO: crypto encoding
    const url = `http://localhost:8181/api/product/realestate/${id}`
    const headers = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
    return await axios.delete(url, headers)
      .catch(error => error.response)
  },

  stopTimeDeposit: async (id) => {
    const token = sessionStorage.getItem('token')
    // TODO: move to const
    // TODO: crypto encoding
    const url = `http://localhost:8181/api/product/time-deposit/${id}`
    const headers = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
    return await axios.patch(url, headers)
      .catch(error => error.response)
  }
})
