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
  getDateTo: (store) => { return store.dateTo },
  getIsMaxPeriod: (store) => { return store.maxPeriod },
  getIsToday: (store) => { return store.today },
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
  setDateTo: (store, payload) => { store.dateTo = payload },
  setIsMaxPeriod: (store, payload) => { store.maxPeriod = payload },
  setIsToday: (store, payload) => { store.today = payload },
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
  async getStockData ({ commit, state }, type) {
    const today = moment(new Date()).format('YYYY-MM-DD')
    const request = {
      today: state.today,
      dateFrom: convertStringToCurrentMillisPlusDay(state.dateFrom),
      dateTo: convertStringToCurrentMillisPlusDay(!state.dateTo ? today : state.dateTo),
      maxPeriod: state.maxPeriod
    }
    const chartResponse = await this.$backend.products.getGpwStockChartInfo(state.symbolLong, request)
    commit('setChartJson', chartResponse.data.main)

    if (state.today) {
      let response
      switch (type) {
        case 'COMMODITY': response = await this.$backend.products.getCommodityDetailedInfo(state.symbolLong)
          break
        case 'ETF_GPW': response = await this.$backend.products.getGpwEtfDetailedInfo(state.symbolLong)
          break
        case 'INDEX_GPW': response = await this.$backend.products.getGpwIndexDetailedInfo(state.symbolLong)
          break
        case 'STOCK_GPW': response = await this.$backend.products.getGpwStockDetailedInfo(state.symbol)
          break
      }
      commit('setProfileData', response.data)
    } else {
      commit('setProfileData', chartResponse.data.profileData)
    }
  }
}

// TODO: move to plugin
function convertStringToCurrentMillisPlusDay (date) {
  return moment(date).add(1, 'day').toDate().valueOf()
}