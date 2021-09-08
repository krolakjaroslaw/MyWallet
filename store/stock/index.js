// noinspection DuplicatedCode,JSUnresolvedVariable,JSValidateTypes

const basicState = {
  commodities: [],
  currencies: [],
  etfs: [],
  indexes: [],
  stock: []
}

export const state = () => ({
  ...basicState,
  headers: [
    { text: 'Walor', value: 'symbol', align: 'start' },
    { text: 'Oferta kupna', value: 'bidPrice', align: 'right', filterable: false },
    { text: 'Oferta sprzedaży', value: 'askPrice', align: 'right', filterable: false },
    { text: 'Zmiana', value: 'change', align: 'right', filterable: false },
    { text: 'Max', value: 'highBidPrice', align: 'right', filterable: false },
    { text: 'Min', value: 'lowBidPrice', align: 'right', filterable: false }
  ],
  indexHeaders: [
    { text: 'Walor', value: 'symbol', align: 'start' },
    { text: 'Kurs', value: 'quote', align: 'right', filterable: false },
    { text: 'Zmiana', value: 'change', align: 'right', filterable: false },
    { text: 'Max', value: 'quoteMax', align: 'right', filterable: false },
    { text: 'Min', value: 'quoteMin', align: 'right', filterable: false }
  ],
  stockHeaders: [
    { text: 'Walor', value: 'symbol', align: 'start' },
    { text: 'Symbol', value: 'symbolShort', align: 'start' },
    { text: 'Kurs', value: 'quote', align: 'right', filterable: false },
    { text: 'Oferta kupna', value: 'bidSize', align: 'right', filterable: false },
    { text: 'Oferta sprzedaży', value: 'askSize', align: 'right', filterable: false },
    { text: 'Zmiana', value: 'change', align: 'right', filterable: false },
    { text: 'Wolumen', value: 'volume', align: 'right', filterable: false },
    { text: 'Max', value: 'quoteMax', align: 'right', filterable: false },
    { text: 'Min', value: 'quoteMin', align: 'right', filterable: false }
  ]
})

export const getters = {
}

export const mutations = {
  resetState: (store) => {
    Object.keys(basicState).forEach((key) => {
      store[key] = basicState[key]
    })
    store.commodities = []
    store.currencies = []
    store.etfs = []
    store.indexes = []
    store.stock = []
  },
  setCommodities: (store, payload) => { store.commodities = payload },
  setCurrencies: (store, payload) => { store.currencies = payload },
  setEtfs: (store, payload) => { store.etfs = payload },
  setIndexes: (store, payload) => { store.indexes = payload },
  setStock: (store, payload) => { store.stock = payload }
}

export const actions = {
  loadData ({ dispatch }) {
    dispatch('loadCommodityData')
    dispatch('loadCurrencyData')
    dispatch('loadEtfData')
    dispatch('loadIndexData')
    dispatch('loadStockData')
  },

  async loadCommodityData ({ commit }) {
    const response = await this.$backend.stock.getCommodity()

    if (response && response.status === 200) {
      commit('setCommodities', response.data)
    } else if (response && response.status !== 200) {
      this.$toast(`Error: ${response.data.error}`)
      console.error('error', response.status, response.data.error)
    }
  },
  async loadCurrencyData ({ commit }) {
    const response = await this.$backend.stock.getCurrency()

    if (response && response.status === 200) {
      commit('setCurrencies', response.data)
    } else if (response && response.status !== 200) {
      this.$toast(`Error: ${response.data.error}`)
      console.error('error', response.status, response.data.error)
    }
  },
  async loadEtfData ({ commit }) {
    const response = await this.$backend.stock.getEtfGpw()

    if (response && response.status === 200) {
      commit('setEtfs', response.data)
    } else if (response && response.status !== 200) {
      this.$toast(`Error: ${response.data.error}`)
      console.error('error', response.status, response.data.error)
    }
  },
  async loadIndexData ({ commit }) {
    const response = await this.$backend.stock.getIndexGpw()

    if (response && response.status === 200) {
      commit('setIndexes', response.data)
    } else if (response && response.status !== 200) {
      this.$toast(`Error: ${response.data.error}`)
      console.error('error', response.status, response.data.error)
    }
  },
  async loadStockData ({ commit }) {
    const response = await this.$backend.stock.getStockGpw()

    if (response && response.status === 200) {
      commit('setStock', response.data)
    } else if (response && response.status !== 200) {
      this.$toast(`Error: ${response.data.error}`)
      console.error('error', response.status, response.data.error)
    }
  }
}
