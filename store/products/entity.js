// noinspection JSUnresolvedVariable,JSCheckFunctionSignatures

import moment from 'moment'
// TODO: refactor
const basicState = {
  averagePurchaseValue: 0.0,
  capitalization: '',
  currency: '',
  currentProfit: 0.0,
  currentPurchaseValue: 0.0,
  currentUnitPrice: 0.0,
  currentValuation: 0.0,
  depositBaseAmount: 0.0,
  estimatedProfit: 0.0,
  interestRate: 0.0,
  investmentTermTime: '',
  investmentTermTimeCount: 0,
  name: '',
  numberOfUnits: 0,
  profit: 0.0,
  productId: '',
  productType: '',
  purchaseValuation: 0.0,
  rateOfReturn: 0.0,
  startTime: '',
  symbol: '',
  symbolLong: '',
  value: 0.0,
  chartJson: [],
  purchaseHistory: [],
  showChangeValueDialog: false
}

export const state = () => ({
  ...basicState
})

export const getters = {
  getAveragePurchaseValue: (store) => { return store.averagePurchaseValue },
  getCapitalization: (store) => { return store.capitalization },
  getChartJson: (store) => { return store.chartJson },
  getCurrency: (store) => { return store.currency },
  getCurrentProfit: (store) => { return store.currentProfit },
  getCurrentPurchaseValue: (store) => { return store.currentPurchaseValue },
  getCurrentUnitPrice: (store) => { return store.currentUnitPrice },
  getCurrentValuation: (store) => { return store.currentValuation },
  getEstimatedProfit: (store) => { return store.estimatedProfit },
  getInterestRate: (store) => { return store.interestRate },
  getInvestmentTime: (store) => { return store.investmentTermTime },
  getInvestmentTimeCount: (store) => { return store.investmentTermTimeCount },
  getName: (store) => { return store.name },
  getNumberOfUnits: (store) => { return store.numberOfUnits },
  getProfit: (store) => { return store.profit },
  getProductId: (store) => { return store.productId },
  getProductType: (store) => { return store.productType },
  getPurchaseHistory: (store) => { return store.purchaseHistory },
  getRateOfReturn: (store) => { return store.rateOfReturn },
  getSymbol: (store) => { return store.symbol },
  getSymbolLong: (store) => { return store.symbolLong },
  getValue: (store) => { return store.value },
  getShowChangeValueDialog: (store) => { return store.showChangeValueDialog }
}

export const mutations = {
  resetState: (store) => {
    Object.keys(basicState).forEach((key) => {
      store[key] = basicState[key]
    })
    store.purchaseHistory = []
    store.chartJson = {}
  },
  setChartJson: (store, payload) => { store.chartJson = payload },
  setProductDetails: (store, payload) => {
    Object.keys(payload).forEach((key) => {
      store[key] = payload[key]
    })
  },
  setProductId: (store, payload) => { store.productId = payload },
  setProductType: (store, payload) => { store.productType = payload },
  setPurchaseHistory: (store, payload) => { store.purchaseHistory = payload },
  setSymbolLong: (store, payload) => { store.symbolLong = payload },
  setShowChangeValueDialog: (store, payload) => { store.showChangeValueDialog = payload },
  setChart: (store, payload) => { store.chart = payload }
}

export const actions = {
  async getProductSummary ({ commit, state }, productId) {
    let response
    switch (state.productType) {
      case 'COMMODITY':
      case 'CURRENCY':
      case 'ETF_GPW':
      case 'STOCK_GPW':
        response = await this.$backend.products.getInvestmentProductSummary(productId)
        break
      case 'DEPOSIT':
        response = await this.$backend.products.getDepositProductSummary(productId)
        break
      case 'REAL_ESTATE':
        response = await this.$backend.products.getRealEstateProductSummary(productId)
        break
      case 'TIME_DEPOSIT':
        response = await this.$backend.products.getTimeDepositProductSummary(productId)
        break
      default:
        response = null
    }

    if (response && response.status === 200) {
      commit('setProductDetails', response.data)
    } else if (response && response.status !== 200) {
      this.$toast.error(`Error: ${response.data.error}`)
      console.log('error', response.status, response.data.error)
    }
  },

  async updateData ({ dispatch, state }, productId) {
    console.log('updateData', productId, state.productType)
    await dispatch('getProductSummary', productId)
    await dispatch('getHistoryData', productId)
    switch (state.productType) {
      case 'DEPOSIT': {
        dispatch('getDepositChartData')
        break
      }
      case 'REAL_ESTATE': {
        dispatch('getRealEstateChartData')
        break
      }
      case 'TIME_DEPOSIT': {
        dispatch('getTimeDepositChartData')
        break
      }
    }
  },

  async getHistoryData ({ commit, state }, productId) {
    let response
    switch (state.productType) {
      case 'COMMODITY':
      case 'CURRENCY':
      case 'ETF_GPW':
      case 'STOCK_GPW':
        response = await this.$backend.products.getInvestmentHistoryData(productId)
        break
      case 'DEPOSIT':
        response = await this.$backend.products.getDepositHistoryData(productId)
        break
      case 'REAL_ESTATE':
        response = await this.$backend.products.getRealEstateHistoryData(productId)
        break
      default:
        response = null
    }

    if (response && response.status === 200) {
      console.log('response', response)
      commit('setPurchaseHistory', response.data)
    } else if (response && response.status !== 200) {
      this.$toast.error(`Error: ${response.data.error}`)
      console.log('error', response.status, response.data.error)
    }
  },

  // TODO: move to stock.js
  async getStockData ({ commit, state }) {
    const today = moment(new Date()).format('YYYY-MM-DD')
    const request = {
      today: false,
      dateFrom: convertStringToCurrentMillisPlusDay(state.purchaseHistory[0].transactionDate),
      dateTo: convertStringToCurrentMillisPlusDay(today),
      maxPeriod: false
    }
    const chartResponse = await this.$backend.products.getGpwStockChartInfo(state.symbolLong, request)
    commit('setChartJson', chartResponse.data.main)
  },

  getTimeDepositChartData ({ commit, state }) {
    const data = []
    data.push({
      date: convertStringToCurrentMillis(state.startTime),
      value: state.depositBaseAmount
    })
    data.push({
      date: convertStringToCurrentMillis(moment(new Date()).format('YYYY-MM-DD')),
      value: state.depositBaseAmount + state.currentProfit
    })

    let unit = 'M'
    if (state.investmentTermTime === 'DAYS') unit = 'D'
    else if (state.investmentTermTime === 'YEARS') unit = 'Y'
    data.push({
      date: convertStringToCurrentMillis(
        moment(state.startTime).add(state.investmentTermTimeCount, unit).format('YYYY-MM-DD')
      ),
      value: state.depositBaseAmount + state.estimatedProfit
    })
    commit('setChartJson', data)
  },

  getDepositChartData ({ commit, state }) {
    const data = state.purchaseHistory.map(item => ({
      date: convertStringToCurrentMillis(item.balanceChangeDate),
      value: item.balance
    }))
    let sum = 0
    const newData = []
    data.forEach((item) => {
      sum += item.value
      if (!newData.map(el => el.date).includes(item.date)) newData.push({ date: item.date, value: sum })
    })
    newData.push({
      date: convertStringToCurrentMillis(moment(new Date()).format('YYYY-MM-DD')),
      value: sum
    })
    commit('setChartJson', newData)
  },

  getRealEstateChartData ({ commit, state }) {
    const data = state.purchaseHistory.map(item => ({
      date: convertStringToCurrentMillis(item.valuationDate),
      value: item.valuation
    }))
    data.push({
      date: convertStringToCurrentMillis(moment(new Date()).format('YYYY-MM-DD')),
      value: data[data.length - 1].value
    })
    commit('setChartJson', data)
  },

  async changeRealEstateValue ({ commit, dispatch, state }, { date, value }) {
    const request = { date, value }
    const response = await this.$backend.products.updateRealEstateHistoryData(state.productId, request)

    if (response && response.status === 200) {
      this.$toast.success('Zmieniono warto???? nieruchomo??ci')
      dispatch('updateData', state.productId)
    } else if (response && response.status !== 200) {
      this.$toast.error(`Error: ${response.data.error}`)
      console.log('error', response.status, response.data.error)
    }
  },

  async changeDepositBalance ({ commit, dispatch, state }, balance) {
    const request = { balance }
    const response = await this.$backend.products.updateDepositAccountBalance(state.productId, request)

    if (response && response.status === 200) {
      this.$toast.success('Zmieniono stan konta')
      dispatch('updateData', state.productId)
    } else if (response && response.status !== 200) {
      this.$toast.error(`Error: ${response.data.error}`)
      console.log('error', response.status, response.data.error)
    }
  }
}

// TODO: move to plugin
function convertStringToCurrentMillisPlusDay (date) {
  return moment(date).add(1, 'day').toDate().valueOf()
}

function convertStringToCurrentMillis (date) {
  return moment(date).toDate().valueOf()
}
