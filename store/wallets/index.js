/* eslint-disable no-console */
// noinspection JSUnresolvedVariable,JSCheckFunctionSignatures

const basicState = {
  name: '',
  currency: {
    label: 'PLN - złoty polski',
    name: 'PLN'
  },
  selectedItem: null,
  // dialogs
  addWalletDialog: false,
  deleteWalletDialog: false,
  editWalletDialog: false
}

export const state = () => ({
  ...basicState,
  wallets: []
})

export const getters = {
  getAddWalletDialog: (store) => { return store.addWalletDialog },
  getDeleteWalletDialog: (store) => { return store.deleteWalletDialog },
  getEditWalletDialog: (store) => { return store.editWalletDialog },
  getCurrency: (store) => { return store.currency },
  getName: (store) => { return store.name },
  getSelectedItem: (store) => { return store.selectedItem },
  getWallets: (store) => { return store.wallets }
}

export const mutations = {
  addWallet: (store, payload) => {
    store.wallets.push(payload)
  },
  deleteWallet: (store, payload) => {
    const index = store.wallets.find(item => item.id === payload)
    store.wallets.splice(index, 1)
  },
  resetState: (store) => {
    Object.keys(basicState).forEach((key) => {
      store[key] = basicState[key]
    })
  },
  setAddWalletDialog: (store, payload) => { store.addWalletDialog = payload },
  setDeleteWalletDialog: (store, payload) => { store.deleteWalletDialog = payload },
  setEditWalletDialog: (store, payload) => { store.editWalletDialog = payload },
  setCurrency: (store, payload) => { store.currency = payload },
  setName: (store, payload) => { store.name = payload },
  setSelectedItem: (store, payload) => { store.selectedItem = payload },
  setWallets: (store, payload) => { store.wallets = payload },
  updateWalletName: (store, payload) => {
    const index = store.wallets.findIndex(item => item.id === payload.id)
    store.wallets[index].name = payload.name
  }
}

export const actions = {
  async createWallet ({ commit, dispatch, state }) {
    const request = {
      name: state.name,
      currency: state.currency.name
    }
    const response = await this.$backend.wallets.createWallet(request)

    if (response && response.status === 201) {
      this.$toast.success('Stworzenie portfela zakończone sukcesem')
      commit('addWallet', response.data)
      dispatch('loadWallets')
      commit('resetState')
    } else if (response && response.status !== 201) {
      this.$toast.error(`Error: ${response.data.error}`)
      console.log('error', response.status, response.data.error)
    }
  },

  async deleteWallet ({ commit, dispatch, state }, id) {
    const response = await this.$backend.wallets.deleteWallet(id)

    if (response && response.status === 200) {
      this.$toast.success('Usunięcie portfela zakończone sukcesem')
      commit('deleteWallet', response.data)
      dispatch('loadWallets')
    } else if (response && response.status !== 200) {
      this.$toast.error(`Error: ${response.data.error}`)
      console.log('error', response.status, response.data.error)
    }
    commit('resetState')
  },

  async getWalletInfo ({ commit, state }, id) {
    const response = await this.$backend.wallets.getWalletInfo(id)
    console.log('getWalletInfo', response.data)
    if (response && response.status === 200) {
      commit('wallets/entity/setWallet', response.data, { root: true })
    } else if (response && response.status !== 200) {
      this.$toast.error(`Error: ${response.data.error}`)
      console.log('error', response.status, response.data.error)
    }
  },

  async loadWallets ({ commit }) {
    const response = await this.$backend.wallets.getWallets()

    if (response && response.status === 200) {
      commit('setWallets', response.data)
      commit('wallets/operate-product/setWallets', response.data, { root: true })
    } else if (response && response.status !== 200) {
      this.$toast.error(`Error: ${response.data.error}`)
      console.log('error', response.status, response.data.error)
    }
  },

  async updateWalletName ({ commit, state }, id) {
    const request = {
      id,
      name: state.name,
      currency: state.currency
    }
    const response = await this.$backend.wallets.updateWalletName(request)

    if (response && response.status === 200) {
      this.$toast.success('Zmiana nazwy portfela zakończona sukcesem')
      commit('updateWalletName', response.data)
      commit('resetState')
    } else if (response && response.status !== 200) {
      this.$toast.error(`Error: ${response.data.error}`)
      console.log('error', response.status, response.data.error)
    }
  }
}
