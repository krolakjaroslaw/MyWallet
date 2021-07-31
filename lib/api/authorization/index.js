/* eslint-disable quote-props */
import { BASE_URL, API_PACKAGE } from 'assets/constant/api'

export default axios => ({
  login: async (request) => {
    const url = `${BASE_URL.auth}/signin`
    return await axios.post(url, request)
      .catch(error => error.response)
  },

  getUserDetails: async () => {
    const token = sessionStorage.getItem('token')
    const url = `${BASE_URL.api}${API_PACKAGE.user}`
    const headers = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
    return await axios.get(url, headers)
      .catch(error => error.response)
  },

  // getUserPhoto: async () => {
  //   const token = sessionStorage.getItem('token')
  //   const url = `${BASE_URL.api}${API_PACKAGE.user}/photo`
  //   const headers = {
  //     headers: {
  //       'Authorization': `Bearer ${token}`,
  //       'Content-Type': 'image/jpeg'
  //     }
  //   }
  //   return await axios.get(url, headers)
  //     .catch(error => error.response)
  // },

  registerUser: async (request) => {
    const url = `${BASE_URL.auth}/signup`
    return await axios.post(url, request)
      .catch(error => error.response)
  },

  updatePassword: async (request) => {
    const token = sessionStorage.getItem('token')
    const url = `${BASE_URL.api}${API_PACKAGE.user}/pass`
    const headers = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
    return await axios.put(url, request, headers)
      .catch(error => error.response)
  },

  // updateUserPhoto: async (request) => {
  //   const token = sessionStorage.getItem('token')
  //   const url = `${BASE_URL.api}${API_PACKAGE.user}/photo`
  //   const headers = {
  //     headers: {
  //       'Authorization': `Bearer ${token}`,
  //       'Content-Type': 'image/*'
  //     }
  //   }
  //   return await axios.post(url, request, headers)
  //     .catch(error => error.response)
  // },

  updateUserName: async (name) => {
    const token = sessionStorage.getItem('token')
    const url = `${BASE_URL.api}${API_PACKAGE.user}/name`
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
