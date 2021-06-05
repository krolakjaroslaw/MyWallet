/* eslint-disable quote-props */
import { BASE_URL, API_PACKAGE } from 'assets/constant/api'

export default axios => ({
  addDepositAccountToWallet: async (id, request) => {
    const token = sessionStorage.getItem('token')
    const url = `${BASE_URL.api}${API_PACKAGE.product}/deposit/wallet/${id}`
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
    const url = `${BASE_URL.api}${API_PACKAGE.product}/investment/wallet/${id}`
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
    const url = `${BASE_URL.api}${API_PACKAGE.product}/realestate/wallet/${id}`
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
    const url = `${BASE_URL.api}${API_PACKAGE.product}/time-deposit/wallet/${id}`
    const headers = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
    return await axios.post(url, request, headers)
      .catch(error => error.response)
  },

  getAllProductsInWallet: async (id) => {
    const token = sessionStorage.getItem('token')
    const url = `${BASE_URL.api}${API_PACKAGE.wallet}/${id}/products`
    const headers = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
    return await axios.get(url, headers)
      .catch(error => error.response)
  },

  getWalletDepositProducts: async (id) => {
    const token = sessionStorage.getItem('token')
    const url = `${BASE_URL.api}${API_PACKAGE.product}/deposit/wallet/${id}`
    const headers = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
    return await axios.get(url, headers)
      .catch(error => error.response)
  },

  getWalletInfo: async (id) => {
    const token = sessionStorage.getItem('token')
    const url = `${BASE_URL.api}${API_PACKAGE.wallet}/${id}`
    const headers = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
    return await axios.get(url, headers)
      .catch(error => error.response)
  },

  getWalletInvestmentProducts: async (id, productType) => {
    const token = sessionStorage.getItem('token')
    const url = `${BASE_URL.api}${API_PACKAGE.product}/investment/wallet/${id}/${productType}`
    const headers = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
    return await axios.get(url, headers)
      .catch(error => error.response)
  },

  getWalletRealEstateProducts: async (id) => {
    const token = sessionStorage.getItem('token')
    const url = `${BASE_URL.api}${API_PACKAGE.product}/realestate/wallet/${id}`
    const headers = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
    return await axios.get(url, headers)
      .catch(error => error.response)
  },

  // TODO: ?
  getWalletScore: async (id) => {
    const token = sessionStorage.getItem('token')
    const url = `${BASE_URL.api}${API_PACKAGE.wallet}/${id}/score`
    const headers = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
    return await axios.get(url, headers)
      .catch(error => error.response)
  },

  getWalletTimeDepositProducts: async (id) => {
    const token = sessionStorage.getItem('token')
    const url = `${BASE_URL.api}${API_PACKAGE.product}/time-deposit/wallet/${id}`
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
    const url = `${BASE_URL.api}${API_PACKAGE.product}/deposit/${id}`
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
    const url = `${BASE_URL.api}${API_PACKAGE.product}/realestate/${id}`
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
    const url = `${BASE_URL.api}${API_PACKAGE.product}/time-deposit/${id}`
    const headers = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
    return await axios.patch(url, headers)
      .catch(error => error.response)
  },

  updateSubAccountBalance: async (id, request) => {
    const token = sessionStorage.getItem('token')
    const url = `${BASE_URL.api}${API_PACKAGE.wallet}/${id}/sub-account`
    const headers = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
    return await axios.patch(url, request, headers)
      .catch(error => error.response)
  }
})
