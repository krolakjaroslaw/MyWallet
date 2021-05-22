// noinspection JSUnresolvedVariable,JSCheckFunctionSignatures

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
  productType: '',
  purchaseValuation: 0.0,
  rateOfReturn: 0.0,
  startTime: '',
  symbol: '',
  value: 0.0,
  purchaseHistory: []
}

export const state = () => ({
  ...basicState
})

export const getters = {
  getAveragePurchaseValue: (store) => { return store.averagePurchaseValue },
  getCapitalization: (store) => { return store.capitalization },
  getCurrency: (store) => { return store.currency },
  getCurrentProfit: (store) => { return store.currentProfit },
  getCurrentPurchaseValue: (store) => { return store.currentPurchaseValue },
  getCurrentUnitPrice: (store) => { return store.currentUnitPrice },
  getCurrentValuation: (store) => { return store.currentValuation },
  getDepositBaseAmount: (store) => { return store.depositBaseAmount },
  getEstimatedProfit: (store) => { return store.estimatedProfit },
  getInterestRate: (store) => { return store.interestRate },
  getInvestmentTime: (store) => { return store.investmentTermTime },
  getInvestmentTimeCount: (store) => { return store.investmentTermTimeCount },
  getName: (store) => { return store.name },
  getNumberOfUnits: (store) => { return store.numberOfUnits },
  getProfit: (store) => { return store.profit },
  getProductType: (store) => { return store.productType },
  getPurchaseHistory: (store) => { return store.purchaseHistory },
  getPurchaseValuation: (store) => { return store.purchaseValuation },
  getRateOfReturn: (store) => { return store.rateOfReturn },
  getStartTime: (store) => { return store.startTime },
  getSymbol: (store) => { return store.symbol },
  getValue: (store) => { return store.value }
}

export const mutations = {
  resetState: (store) => {
    Object.keys(basicState).forEach((key) => {
      store[key] = basicState[key]
    })
    store.purchaseHistory = []
  },
  setProductDetails: (store, payload) => {
    Object.keys(payload).forEach((key) => {
      store[key] = payload[key]
    })
  },
  setProductType: (store, payload) => { store.productType = payload },
  setPurchaseHistory: (store, payload) => { store.purchaseHistory = payload }
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
      commit('setPurchaseHistory', response.data)
    } else if (response && response.status !== 200) {
      this.$toast.error(`Error: ${response.data.error}`)
      console.log('error', response.status, response.data.error)
    }
  }
}
