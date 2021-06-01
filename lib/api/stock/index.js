/* eslint-disable quote-props */
export default axios => ({
  // TODO: move to authorization
  getUserEvents: async () => {
    const token = sessionStorage.getItem('token')
    // TODO: move to const
    const url = 'http://localhost:8181/api/user/events'
    const headers = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
    return await axios.get(url, headers)
      .catch(error => error.response)
  },

  getAllMWig40: async () => {
    const token = sessionStorage.getItem('token')
    // TODO: move to const
    const url = 'http://localhost:8181/api/finance/gpw/mwig40'
    const headers = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
    return await axios.get(url, headers)
      .catch(error => error.response)
  },

  getAllWig20: async () => {
    const token = sessionStorage.getItem('token')
    // TODO: move to const
    const url = 'http://localhost:8181/api/finance/gpw/wig20'
    const headers = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
    return await axios.get(url, headers)
      .catch(error => error.response)
  },

  getCommodity: async () => {
    const token = sessionStorage.getItem('token')
    // TODO: move to const
    const url = 'http://localhost:8181/api/finance/commodity'
    const headers = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
    return await axios.get(url, headers)
      .catch(error => error.response)
  },

  getCurrency: async () => {
    const token = sessionStorage.getItem('token')
    // TODO: move to const
    const url = 'http://localhost:8181/api/finance/currency/info'
    const headers = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
    return await axios.get(url, headers)
      .catch(error => error.response)
  },

  getAllGpw: async () => {
    const token = sessionStorage.getItem('token')
    // TODO: move to const
    const url = 'http://localhost:8181/api/finance/gpw/index'
    const headers = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
    return await axios.get(url, headers)
      .catch(error => error.response)
  },

  getAllEtf: async () => {
    const token = sessionStorage.getItem('token')
    // TODO: move to const
    const url = 'http://localhost:8181/api/finance/gpw/etf'
    const headers = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
    return await axios.get(url, headers)
      .catch(error => error.response)
  },

  getAllStock: async () => {
    const token = sessionStorage.getItem('token')
    // TODO: move to const
    const url = 'http://localhost:8181/api/finance/gpw/stock'
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
