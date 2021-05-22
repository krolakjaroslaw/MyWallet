/* eslint-disable quote-props */
export default axios => ({
  getDepositHistoryData: async (id) => {
    const token = sessionStorage.getItem('token')
    // TODO: move to const
    // TODO: crypto encoding
    const url = `http://localhost:8181/api/product/deposit/${id}/history`
    const headers = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
    return await axios.get(url, headers)
      .catch(error => error.response)
  },

  getDepositProductSummary: async (id) => {
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
    return await axios.get(url, headers)
      .catch(error => error.response)
  },

  getInvestmentHistoryData: async (id) => {
    const token = sessionStorage.getItem('token')
    // TODO: move to const
    // TODO: crypto encoding
    const url = `http://localhost:8181/api/product/investment/${id}/history`
    const headers = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
    return await axios.get(url, headers)
      .catch(error => error.response)
  },

  getInvestmentProductSummary: async (id) => {
    const token = sessionStorage.getItem('token')
    // TODO: move to const
    // TODO: crypto encoding
    const url = `http://localhost:8181/api/product/investment/${id}`
    const headers = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
    return await axios.get(url, headers)
      .catch(error => error.response)
  },

  getRealEstateHistoryData: async (id) => {
    const token = sessionStorage.getItem('token')
    // TODO: move to const
    // TODO: crypto encoding
    const url = `http://localhost:8181/api/product/realestate/${id}/history`
    const headers = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
    return await axios.get(url, headers)
      .catch(error => error.response)
  },

  getRealEstateProductSummary: async (id) => {
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
    return await axios.get(url, headers)
      .catch(error => error.response)
  },

  getTimeDepositProductSummary: async (id) => {
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
    return await axios.get(url, headers)
      .catch(error => error.response)
  }
})
