/* eslint-disable quote-props */
export default axios => ({
  login: async (request) => {
    // TODO: move to const
    const url = 'http://localhost:8181/auth/signin'
    return await axios.post(url, request)
      .catch(error => error.response)
  },

  getUserPhoto: async () => {
    const token = sessionStorage.getItem('token')
    // TODO: move to const
    const url = 'http://localhost:8181/api/user/photo'
    const headers = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'image/jpeg'
      }
    }
    return await axios.get(url, headers)
      .catch(error => error.response)
  },

  registerUser: async (request) => {
    // TODO: move to const
    const url = 'http://localhost:8181/auth/signup'
    return await axios.post(url, request)
      .catch(error => error.response)
  },

  updatePassword: async (request) => {
    const token = sessionStorage.getItem('token')
    // TODO: move to const
    const url = 'http://localhost:8181/api/user/pass'
    const headers = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
    return await axios.put(url, request, headers)
      .catch(error => error.response)
  },

  updateUserPhoto: async (request) => {
    const token = sessionStorage.getItem('token')
    // TODO: move to const
    const url = 'http://localhost:8181/api/user/photo'
    const headers = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'image/*'
      }
    }
    return await axios.post(url, request, headers)
      .catch(error => error.response)
  },

  updateUserName: async (name) => {
    const token = sessionStorage.getItem('token')
    // TODO: move to const
    const url = 'http://localhost:8181/api/user/name'
    const data = { name }
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
