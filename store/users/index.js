/* eslint-disable no-console */
// noinspection JSUnresolvedVariable,JSCheckFunctionSignatures

const basicState = {
  // dialogs
  deleteUserDialog: false
}

export const state = () => ({
  ...basicState,
  users: []
})

export const getters = {
  getDeleteUserDialog: (store) => { return store.deleteUserDialog },
  getUsers: (store) => { return store.users }
}

export const mutations = {
  deleteUser: (store, payload) => {
    const index = store.users.find(item => item.id === payload)
    store.users.splice(index, 1)
  },
  resetState: (store) => {
    Object.keys(basicState).forEach((key) => {
      store[key] = basicState[key]
    })
  },
  setDeleteUserDialog: (store, payload) => {
    store.deleteUserDialog = payload
  },
  setUsers: (store, payload) => {
    store.users = payload
  }
}

export const actions = {
  async deleteUser ({ commit, dispatch, state }, id) {
    const response = await this.$backend.users.deleteUser(id)

    if (response && response.status === 200) {
      this.$toast.success('Użytkownik usunięty')
      commit('deleteUser', response.data)
      dispatch('loadUsers')
    } else if (response && response.status !== 200) {
      this.$toast.error(`Error: ${response.data.error}`)
      console.log('error', response.status, response.data.error)
    }
    commit('resetState')
  },

  async loadUsers ({ commit }) {
    const response = await this.$backend.users.getUsers()

    if (response && response.status === 200) {
      commit('setUsers', response.data)
    } else if (response && response.status !== 200) {
      this.$toast.error(`Error: ${response.data.error}`)
      console.log('error', response.status, response.data.error)
    }
  }
}
