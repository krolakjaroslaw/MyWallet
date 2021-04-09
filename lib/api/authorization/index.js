export default axios => ({
  login: async (request) => {
    // TODO: move to const
    // TODO: crypto encoding
    const url = 'http://localhost:8181/auth/signin'
    return await axios.post(url, request)
      .catch(error => error.response)
  },

  registerUser: async (request) => {
    // TODO: move to const
    // TODO: crypto encoding
    const url = 'http://localhost:8181/auth/signup'
    return await axios.post(url, request)
      .catch(error => error.response)
  }
})
