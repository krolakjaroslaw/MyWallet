/* eslint-disable quote-props */
export default axios => ({
  createWallet: async (request) => {
    const token = sessionStorage.getItem('token')
    // TODO: move to const
    // TODO: crypto encoding
    const url = 'http://localhost:8181/api/wallet'
    const headers = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
    return await axios.post(url, request, headers)
      .catch(error => error.response)
  },

  deleteWallet: async (id) => {
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
    return await axios.delete(url, headers)
      .catch(error => error.response)
  },

  getAllProductTypes: async () => {
    const token = sessionStorage.getItem('token')
    // TODO: move to const
    // TODO: crypto encoding
    const url = 'http://localhost:8181/api/wallet/product-types'
    const headers = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
    return await axios.get(url, headers)
      .catch(error => error.response)
  },

  getProductTypesInWallet: async (id) => {
    const token = sessionStorage.getItem('token')
    // TODO: move to const
    // TODO: crypto encoding
    const url = `http://localhost:8181/api/wallet/${id}/product-types`
    const headers = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
    return await axios.get(url, headers)
      .catch(error => error.response)
  },

  getWallets: async () => {
    const token = sessionStorage.getItem('token')
    // TODO: move to const
    // TODO: crypto encoding
    const url = 'http://localhost:8181/api/wallet'
    const headers = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
    return await axios.get(url, headers)
      .catch(error => error.response)
  },

  updateWalletName: async (request) => {
    const token = sessionStorage.getItem('token')
    // TODO: move to const
    // TODO: crypto encoding
    const url = `http://localhost:8181/api/wallet/${request.id}`
    const data = {
      name: request.name,
      currency: request.currency
    }
    const headers = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
    return await axios.put(url, data, headers)
      .catch(error => error.response)
  }
})
