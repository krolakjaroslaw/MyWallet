/* eslint-disable no-console */
// noinspection JSUnresolvedVariable,JSCheckFunctionSignatures

const basicState = {
  events: []
}

export const state = () => ({
  ...basicState
})

export const getters = {
  getEvents: (store) => { return store.events }
}

export const mutations = {
  resetState: (store) => {
    Object.keys(basicState).forEach((key) => {
      store[key] = basicState[key]
    })
  },
  setEvents: (store, payload) => {
    store.events = payload
  }
}

export const actions = {
  async loadUser ({ commit }, id) {
    const response = await this.$backend.users.getUser(id)

    if (response && response.status === 200) {
      commit('setEvents', response.data)
    } else if (response && response.status !== 200) {
      this.$toast.error(`Error: ${response.data.error}`)
      console.log('error', response.status, response.data.error)
    }
  }
}
