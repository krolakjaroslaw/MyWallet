/* eslint-disable no-console */
// noinspection JSCheckFunctionSignatures,JSUnresolvedVariable

const basicState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const role = {
  ROLE_ADMIN: 'ROLE_ADMIN',
  ROLE_USER: 'ROLE_USER'
}

export const state = () => ({
  ...basicState,
  roles: [],
  currentUser: null
})

export const getters = {
  getName: (store) => { return store.name },
  getEmail: (store) => { return store.email },
  getPassword: (store) => { return store.password },
  getConfirmPassword: (store) => { return store.confirmPassword },
  getCurrentUser: (store) => { return store.currentUser },
  getIsAdmin: (store) => { return store.roles.includes(role.ROLE_ADMIN) }
}

export const mutations = {
  resetState: (store) => {
    Object.keys(basicState).forEach((key) => {
      store[key] = basicState[key]
    })
  },
  resetCurrentUser: (store) => { store.currentUser = null },
  setName: (store, payload) => { store.name = payload },
  setEmail: (store, payload) => { store.email = payload },
  setPassword: (store, payload) => { store.password = payload },
  setConfirmPassword: (store, payload) => { store.confirmPassword = payload },
  setCurrentUser: (store, payload) => {
    store.currentUser = payload
    sessionStorage.setItem('currentUser', JSON.stringify(store.currentUser))
  }
}

export const actions = {
  async login ({ commit, state }) {
    const request = {
      email: state.email,
      password: state.password
    }
    const response = await this.$backend.authorization.login(request)
    if (response && response.status === 200) {
      commit('setCurrentUser', response.data)
      await this.$router.push({ name: 'dashboard' })
      console.log('data', response.data)
    } else if (response && response.status !== 200) {
      this.$toast.error(`Error: ${response.data.error}`)
      console.log('error', response.status, response.data.error)
    }
    commit('resetState')
  },

  logout ({ commit }) {
    sessionStorage.clear()
    commit('resetCurrentUser')
    this.$toast.success('You have been successfully logged out')
  },

  async registerUser ({ commit, state }) {
    const request = {
      username: state.name,
      email: state.email,
      password: state.password,
      confirmPassword: state.confirmPassword,
      roles: [role.ROLE_USER]
    }
    const response = await this.$backend.authorization.registerUser(request)

    if (response && response.status === 200) {
      this.$toast.success(response.data.message)
      await this.$router.push({ name: 'sign-in' })
    } else if (response && response.status !== 200) {
      this.$toast.error(`Error: ${response.data.errors.join('\n')}`)
      console.error('error', response.status, response.data.errors)
    }
    commit('resetState')
  }
}
