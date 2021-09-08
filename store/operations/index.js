// noinspection JSCheckFunctionSignatures,JSUnresolvedVariable

const basicState = {
  events: []
}

export const state = () => ({
  ...basicState,
  headers: [
    { text: 'Data', value: 'createdAt', align: 'start', filterable: false },
    { text: 'Operacja', value: 'eventType', align: 'start' },
    { text: 'Nazwa', value: 'name', align: 'start' },
    { text: 'Typ produktu', value: 'productType', align: 'start' },
    { text: 'Liczba jednostek', value: 'numberOfUnits', align: 'right', filterable: false },
    { text: 'Wartość', value: 'value', align: 'right', filterable: false }
  ]
})

export const getters = {
}

export const mutations = {
  resetState: (store) => {
    Object.keys(basicState).forEach((key) => {
      store[key] = basicState[key]
    })
    store.events = []
  },
  setEvents: (store, payload) => { store.events = payload }
}

export const actions = {
  async loadEvents ({ commit }) {
    const response = await this.$backend.authorization.getUserEvents()

    if (response && response.status === 200) {
      commit('setEvents', response.data)
    } else if (response && response.status !== 200) {
      this.$toast.error(`Error: ${response.data.error}`)
      console.log('error', response.status, response.data.error)
    }
  }
}
