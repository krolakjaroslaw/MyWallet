// noinspection JSUnresolvedVariable,JSCheckFunctionSignatures

const basicState = {
  commodities: [],
  currencies: [],
  deposits: [],
  etfs: [],
  realEstates: [],
  stock: [],
  timeDeposits: [],

  wallet: {}
}

export const state = () => ({
  ...basicState
})

export const getters = {
  getCommodities: (store) => { return store.commodities },
  getCurrencies: (store) => { return store.currencies },
  getDeposits: (store) => { return store.deposits },
  getEtfs: (store) => { return store.etfs },
  getRealEstates: (store) => { return store.realEstates },
  getStock: (store) => { return store.stock },
  getTimeDeposits: (store) => { return store.timeDeposits },
  getWallet: (store) => { return store.wallet }
}

export const mutations = {
  resetState: (store) => {
    Object.keys(basicState).forEach((key) => {
      store[key] = basicState[key]
    })
    store.commodities = []
    store.currencies = []
    store.deposits = []
    store.etfs = []
    store.realEstates = []
    store.stock = []
    store.timeDeposits = []

    store.wallet = {}
  },
  setCommodities: (store, payload) => { store.commodities = payload },
  setCurrencies: (store, payload) => { store.currencies = payload },
  setDeposits: (store, payload) => { store.deposits = payload },
  setEtfs: (store, payload) => { store.etfs = payload },
  setRealEstates: (store, payload) => { store.realEstates = payload },
  setStock: (store, payload) => { store.stock = payload },
  setTimeDeposits: (store, payload) => { store.timeDeposits = payload },
  setWallet: (store, payload) => { store.wallet = payload }
}

export const actions = {
  async buyOrSellInvestmentProduct ({ rootState }, operationType) {
    const purchaseState = rootState.wallets['operate-product']
    const walletId = purchaseState.wallet.id
    const request = {
      name: ['COMMODITY', 'CURRENCY'].includes(purchaseState.group)
        ? purchaseState.product.symbol
        : purchaseState.product.symbolShort,
      productType: purchaseState.group.toUpperCase(),
      transactionDate: purchaseState.date,
      numberOfUnits: operationType === 'sell-product' ? purchaseState.number * -1 : purchaseState.number,
      unitPriceAtTransactionTime: purchaseState.price,
      commissionValue: purchaseState.commission,
      comment: purchaseState.comment
    }
    const response = await this.$backend.wallets.addInvestmentToWallet(walletId, request)

    if (response && response.status === 200) {
      this.$toast.success(`${request.name} successfully ${operationType === 'buy-product' ? 'added to' : 'removed from'} wallet`)
    } else if (response && response.status !== 200) {
      this.$toast.error(`Error: ${response.data.error}`)
      console.log('error', response.status, response.data.error)
    }
  },

  async buyRealEstateProduct ({ rootState }) {
    const purchaseState = rootState.wallets['operate-product']
    const walletId = purchaseState.wallet.id
    const request = {
      name: purchaseState.name,
      currentValue: purchaseState.price
    }
    const response = await this.$backend.wallets.addRealEstateToWallet(walletId, request)

    if (response && response.status === 200) {
      this.$toast.success(`${request.name} successfully added to wallet`)
    } else if (response && response.status !== 200) {
      this.$toast.error(`Error: ${response.data.error}`)
      console.log('error', response.status, response.data.error)
    }
  },

  async createDepositAccountProduct ({ rootState }) {
    const purchaseState = rootState.wallets['operate-product']
    const walletId = purchaseState.wallet.id
    const request = {
      name: purchaseState.name,
      value: purchaseState.price,
      currency: purchaseState.currency
    }
    const response = await this.$backend.wallets.addDepositAccountToWallet(walletId, request)

    if (response && response.status === 200) {
      this.$toast.success(`${request.name} successfully added to wallet`)
    } else if (response && response.status !== 200) {
      this.$toast.error(`Error: ${response.data.error}`)
      console.log('error', response.status, response.data.error)
    }
  },

  async createTimeDepositProduct ({ rootState }) {
    const purchaseState = rootState.wallets['operate-product']
    const walletId = purchaseState.wallet.id
    const request = {
      name: purchaseState.name,
      depositBaseAmount: purchaseState.price,
      interestRatePerYear: purchaseState.interestRate,
      investmentTermTime: purchaseState.investmentTime,
      investmentTermTimeCount: purchaseState.number,
      capitalization: purchaseState.capitalization,
      comment: purchaseState.comment,
      startTime: purchaseState.date
    }
    const response = await this.$backend.wallets.addTimeDepositToWallet(walletId, request)

    if (response && response.status === 200) {
      this.$toast.success(`${request.name} successfully added to wallet`)
    } else if (response && response.status !== 200) {
      this.$toast.error(`Error: ${response.data.error}`)
      console.log('error', response.status, response.data.error)
    }
  },

  async deleteDepositAccountProduct ({ rootState }, depositAccountId) {
    const purchaseState = rootState.wallets['operate-product']
    const response = await this.$backend.wallets.removeDepositAccountFromWallet(depositAccountId)

    if (response && response.status === 200) {
      this.$toast.success(`${purchaseState.name} successfully added to wallet`)
    } else if (response && response.status !== 200) {
      this.$toast.error(`Error: ${response.data.error}`)
      console.log('error', response.status, response.data.error)
    }
  },

  async getDepositProducts ({ commit, dispatch, state }, walletId) {
    const response = await this.$backend.wallets.getWalletDepositProducts(walletId)

    if (response && response.status === 200) {
      commit('setDeposits', response.data)
    } else if (response && response.status !== 200) {
      this.$toast.error(`Error: ${response.data.error}`)
      console.log('error', response.status, response.data.error)
    }
  },

  async getInvestmentProducts ({ commit, dispatch, state }, walletId) {
    const groups = ['COMMODITY', 'CURRENCY', 'ETF_GPW', 'STOCK_GPW']

    const commodityResponse = await this.$backend.wallets.getWalletInvestmentProducts(walletId, groups[0])

    if (commodityResponse && commodityResponse.status === 200) {
      commit('setCommodities', commodityResponse.data)
    } else if (commodityResponse && commodityResponse.status !== 200) {
      this.$toast.error(`Error: ${commodityResponse.data.error}`)
      console.log('error', commodityResponse.status, commodityResponse.data.error)
    }

    const currencyResponse = await this.$backend.wallets.getWalletInvestmentProducts(walletId, groups[1])

    if (currencyResponse && currencyResponse.status === 200) {
      commit('setCurrencies', currencyResponse.data)
    } else if (currencyResponse && currencyResponse.status !== 200) {
      this.$toast.error(`Error: ${currencyResponse.data.error}`)
      console.log('error', currencyResponse.status, currencyResponse.data.error)
    }

    const etfResponse = await this.$backend.wallets.getWalletInvestmentProducts(walletId, groups[2])

    if (etfResponse && etfResponse.status === 200) {
      commit('setEtfs', etfResponse.data)
    } else if (etfResponse && etfResponse.status !== 200) {
      this.$toast.error(`Error: ${etfResponse.data.error}`)
      console.log('error', etfResponse.status, etfResponse.data.error)
    }

    const stockResponse = await this.$backend.wallets.getWalletInvestmentProducts(walletId, groups[3])

    if (stockResponse && stockResponse.status === 200) {
      commit('setStock', stockResponse.data)
    } else if (stockResponse && stockResponse.status !== 200) {
      this.$toast.error(`Error: ${stockResponse.data.error}`)
      console.log('error', stockResponse.status, stockResponse.data.error)
    }
  },

  async getRealEstateProducts ({ commit, dispatch, state }, walletId) {
    const response = await this.$backend.wallets.getWalletRealEstateProducts(walletId)

    if (response && response.status === 200) {
      commit('setRealEstates', response.data)
    } else if (response && response.status !== 200) {
      this.$toast.error(`Error: ${response.data.error}`)
      console.log('error', response.status, response.data.error)
    }
  },

  async getTimeDepositProducts ({ commit, dispatch, state }, walletId) {
    const response = await this.$backend.wallets.getWalletTimeDepositProducts(walletId)

    if (response && response.status === 200) {
      commit('setTimeDeposits', response.data)
    } else if (response && response.status !== 200) {
      this.$toast.error(`Error: ${response.data.error}`)
      console.log('error', response.status, response.data.error)
    }
  },

  async sellRealEstateProduct ({ rootState }, realEstateId) {
    const purchaseState = rootState.wallets['operate-product']
    const response = await this.$backend.wallets.removeRealEstateFromWallet(realEstateId)

    if (response && response.status === 200) {
      this.$toast.success(`${purchaseState.name} successfully removed from wallet`)
    } else if (response && response.status !== 200) {
      this.$toast.error(`Error: ${response.data.error}`)
      console.log('error', response.status, response.data.error)
    }
  },

  async stopTimeDeposit ({ rootState }, timeDepositId) {
    const purchaseState = rootState.wallets['operate-product']
    const response = await this.$backend.wallets.stopTimeDeposit(timeDepositId)

    if (response && response.status === 200) {
      this.$toast.success(`${purchaseState.name} successfully stopped`)
    } else if (response && response.status !== 200) {
      this.$toast.error(`Error: ${response.data.error}`)
      console.log('error', response.status, response.data.error)
    }
  }
}
