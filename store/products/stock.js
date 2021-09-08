// noinspection JSUnresolvedVariable,JSCheckFunctionSignatures

import moment from 'moment'

const basicState = {
  chartJson: {},
  profileData: {},
  dateFrom: '',
  dateTo: '',
  maxPeriod: false,
  symbol: '',
  symbolLong: '',
  today: true
}

export const state = () => ({
  ...basicState
})

export const getters = {
  getChartJson: (store) => { return store.chartJson },
  getDateFrom: (store) => { return store.dateFrom },
  getIsToday: (store) => { return store.today },
  getMaxPeriod: (store) => { return store.maxPeriod },
  getProfileData: (store) => { return store.profileData },
  getSymbol: (store) => { return store.symbol },
  getSymbolLong: (store) => { return store.symbolLong }
}

export const mutations = {
  resetState: (store) => {
    Object.keys(basicState).forEach((key) => {
      store[key] = basicState[key]
    })
    store.chartJson = {}
    store.profileData = {}
  },
  setChartJson: (store, payload) => { store.chartJson = payload },
  setDateFrom: (store, payload) => { store.dateFrom = payload },
  setIsToday: (store, payload) => { store.today = payload },
  setMaxPeriod: (store, payload) => { store.maxPeriod = payload },
  setProfileData: (store, payload) => {
    store.profileData = payload
    if (store.profileData.prevClose) {
      store.profileData.prevClose = store.profileData.prevClose
        .replaceAll('&nbsp;', '').replaceAll('&nbsp', '')
        .split('zł')[0]
    }
    if (store.profileData.maxValue) {
      store.profileData.maxValue = store.profileData.maxValue
        .replaceAll('&nbsp;', '').replaceAll('&nbsp', '')
        .split('zł')[0]
    }
    if (store.profileData.minValue) {
      store.profileData.minValue = store.profileData.minValue
        .replaceAll('&nbsp;', '').replaceAll('&nbsp', '')
        .split('zł')[0]
    }
    if (store.profileData.valueAverage) {
      store.profileData.valueAverage = store.profileData.valueAverage
        .replaceAll('&nbsp;', '').replaceAll('&nbsp', '')
        .split('zł')[0]
    }
    if (store.profileData.volumeSumValue) {
      store.profileData.volumeSumValue = store.profileData.volumeSumValue
        .replaceAll('&nbsp;', '').replaceAll('&nbsp', '')
        .split('szt')[0]
    }
  },
  setSymbol: (store, payload) => { store.symbol = payload },
  setSymbolLong: (store, payload) => { store.symbolLong = payload }
}

export const actions = {
  async loadChartData ({ commit, state }) {
    const today = moment(new Date()).format('YYYY-MM-DD')
    const request = {
      today: state.today,
      dateFrom: convertStringToCurrentMillisPlusDay(state.dateFrom),
      dateTo: convertStringToCurrentMillisPlusDay(!state.dateTo ? today : state.dateTo),
      maxPeriod: state.maxPeriod
    }

    const response = await this.$backend.products.getGpwStockChartInfo(state.symbolLong, request)
    commit('setChartJson', response.data.main)
    return response.data
  },
  async loadData ({ commit, dispatch, state }) {
    const localParams = JSON.parse(localStorage.getItem('params'))
    commit('setSymbolLong', localParams.name)
    commit('setSymbol', localParams.symbol)
    const chartResponse = await dispatch('loadChartData')

    if (state.today) dispatch('loadOneDayProductData', localParams)
    else commit('setProfileData', chartResponse.profileData)
  },
  async loadOneDayProductData ({ commit }, localParams) {
    let response
    switch (localParams.type) {
      case 'COMMODITY': response = await this.$backend.products.getCommodityDetailedInfo(localParams.name)
        break
      case 'ETF_GPW': response = await this.$backend.products.getGpwEtfDetailedInfo(localParams.name)
        break
      case 'INDEX_GPW': response = await this.$backend.products.getGpwIndexDetailedInfo(localParams.name)
        break
      case 'STOCK_GPW': response = await this.$backend.products.getGpwStockDetailedInfo(localParams.symbol)
        break
    }
    commit('setProfileData', response.data)
  }
}

// TODO: move to plugin
function convertStringToCurrentMillisPlusDay (date) {
  return moment(date).add(1, 'day').toDate().valueOf()
}
