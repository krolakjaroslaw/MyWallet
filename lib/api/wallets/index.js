/* eslint-disable quote-props */
import { BASE_URL, API_PACKAGE } from 'assets/constant/api'

export default axios => ({
  createWallet: async (request) => {
    const token = sessionStorage.getItem('token')
    const url = `${BASE_URL.api}${API_PACKAGE.wallet}`
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
    const url = `${BASE_URL.api}${API_PACKAGE.wallet}/${id}`
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
    const url = `${BASE_URL.api}${API_PACKAGE.wallet}/product-types`
    const headers = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
    return await axios.get(url, headers)
      .catch(error => error.response)
  },

  // TODO: move to wallets/entity
  getProductTypesInWallet: async (id) => {
    const token = sessionStorage.getItem('token')
    const url = `${BASE_URL.api}${API_PACKAGE.wallet}/${id}/product-types`
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
    const url = `${BASE_URL.api}${API_PACKAGE.wallet}`
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
    const url = `${BASE_URL.api}${API_PACKAGE.wallet}/${request.id}`
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
