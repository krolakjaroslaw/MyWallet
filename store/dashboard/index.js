// noinspection JSCheckFunctionSignatures,JSUnresolvedVariable,DuplicatedCode

import moment from 'moment'

const basicState = {
  labels: [],
  tables: [],
  values: []
}

export const state = () => ({
  ...basicState,
  headers: [
    { text: 'Walor', value: 'name', align: 'start' },
    { text: 'Kurs', value: 'rate', align: 'right' },
    { text: 'Zmiana', value: 'change', align: 'right' }
  ],
  titles: ['SUROWCE', 'WALUTY', 'ETFY', 'GIEŁDA']
})

export const getters = {
  getTables: (store) => { return store.tables }
}

export const mutations = {
  resetState: (store) => {
    Object.keys(basicState).forEach((key) => {
      store[key] = basicState[key]
    })
    store.labels = []
    store.tables = []
    store.values = []
  },
  setLabels: (store, payload) => { store.labels = payload },
  setTables: (store, payload) => { store.tables.push(payload) },
  setValues: (store, payload) => { store.values = payload }
}

export const actions = {
  async loadCharts ({ commit }) {
    const today = moment(new Date()).toDate().valueOf()
    const yearAgo = moment(new Date()).subtract(1, 'year').toDate().valueOf()

    const chart = await this.$backend.products.getGpwStockChartInfo(
      'WIG20',
      { today: false, dateFrom: yearAgo, dateTo: today, maxPeriod: false })
    const labels = chart.data.main.map(el => new Date(el[0]))
    const values = chart.data.main.map(el => el[1])
    commit('setLabels', labels)
    commit('setValues', values)
  },
  async loadCommodities ({ commit }) {
    const response = await this.$backend.stock.getCommodity()
    const mappedResponse = response.data
      .sort((a, b) => b.askPrice - a.askPrice)
      .slice(0, 5)
      .map(item => ({
        name: item.symbol,
        value: parseFloat(item.askPrice).toFixed(4),
        change: parseFloat(item.bidDatChangePercentage).toFixed(2) + '%'
      }))

    if (response && response.status === 200) {
      commit('setTables', mappedResponse)
    } else if (response && response.status !== 200) {
      this.$toast.error(`Error: ${response.data.error}`)
      console.log('error', response.status, response.data.error)
    }
  },
  async loadCurrencies ({ commit }) {
    const response = await this.$backend.stock.getCurrency()
    const mappedResponse = response.data
      .filter(item => item.symbol.includes('PLN') && !item.symbol.includes('BOSSA'))
      .map(item => ({
        name: item.symbol,
        value: parseFloat(item.askPrice).toFixed(4),
        change: parseFloat(item.bidDatChangePercentage).toFixed(2) + '%'
      }))

    if (response && response.status === 200) {
      commit('setTables', mappedResponse)
    } else if (response && response.status !== 200) {
      this.$toast.error(`Error: ${response.data.error}`)
      console.log('error', response.status, response.data.error)
    }
  },
  async loadEtfs ({ commit }) {
    const response = await this.$backend.stock.getEtfGpw()
    const mappedResponse = response.data
      .sort((a, b) => b.askSize - a.askSize)
      .slice(0, 5)
      .map(item => ({
        name: item.symbol,
        value: parseFloat(item.askSize).toFixed(4),
        change: parseFloat(item.change).toFixed(2) + '%'
      }))

    if (response && response.status === 200) {
      commit('setTables', mappedResponse)
    } else if (response && response.status !== 200) {
      this.$toast.error(`Error: ${response.data.error}`)
      console.log('error', response.status, response.data.error)
    }
  },
  loadRates ({ dispatch }) {
    dispatch('loadCommodities')
    dispatch('loadCurrencies')
    dispatch('loadEtfs')
    dispatch('loadStock')
  },
  async loadStock ({ commit }) {
    const response = await this.$backend.stock.getStockGpw()
    const mappedResponse = response.data
      .sort((a, b) => b.askSize - a.askSize)
      .slice(0, 5)
      .map(item => ({
        name: item.symbol,
        value: parseFloat(item.askSize).toFixed(2),
        change: parseFloat(item.change).toFixed(2) + '%'
      }))

    if (response && response.status === 200) {
      commit('setTables', mappedResponse)
    } else if (response && response.status !== 200) {
      this.$toast.error(`Error: ${response.data.error}`)
      console.log('error', response.status, response.data.error)
    }
  }
}
