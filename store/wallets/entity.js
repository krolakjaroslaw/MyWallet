// noinspection JSUnresolvedVariable,JSCheckFunctionSignatures

const basicState = {
  commodities: [],
  currencies: [],
  deposits: [],
  etfs: [],
  realEstates: [],
  stock: [],
  timeDeposits: [],

  productsCount: 0,

  wallet: {},
  showAddDialog: false,
  showRemoveDialog: false
}

export const state = () => ({
  ...basicState
})

export const getters = {
  getCommodities: (store) => { return store.commodities },
  getCurrencies: (store) => { return store.currencies },
  getDeposits: (store) => { return store.deposits },
  getEtfs: (store) => { return store.etfs },
  getProductsCount: (store) => { return store.productsCount },
  getRealEstates: (store) => { return store.realEstates },
  getShowAddDialog: (store) => { return store.showAddDialog },
  getShowRemoveDialog: (store) => { return store.showRemoveDialog },
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
  setProductsCount: (store, payload) => { store.productsCount = payload },
  setRealEstates: (store, payload) => { store.realEstates = payload },
  setShowAddDialog: (store, payload) => { store.showAddDialog = payload },
  setShowRemoveDialog: (store, payload) => { store.showRemoveDialog = payload },
  setStock: (store, payload) => { store.stock = payload },
  setTimeDeposits: (store, payload) => { store.timeDeposits = payload },
  setWallet: (store, payload) => { store.wallet = payload }
}

export const actions = {
  async buyOrSellInvestmentProduct ({ rootState }, operationType) {
    const purchaseState = rootState.wallets['operate-product']
    const walletId = purchaseState.wallet.id
    const request = {
      name: ['COMMODITY', 'CURRENCY', 'STOCK_GPW'].includes(purchaseState.group)
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

  async getAllProductsInWallet ({ commit, dispatch, state }, walletId) {
    const response = await this.$backend.wallets.getAllProductsInWallet(walletId)

    if (response && response.status === 200) {
      commit('setCommodities', response.data.commodity)
      commit('setCurrencies', response.data.currency)
      commit('setDeposits', response.data.deposit)
      commit('setEtfs', response.data.etfGpw)
      commit('setRealEstates', response.data.realEstate)
      commit('setStock', response.data.stockGpw)
      commit('setTimeDeposits', response.data.timeDeposit)
      commit('setProductsCount', response.data.productsCount)
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
  },

  async updateSubAccountBalance ({ rootState }) {
    const purchaseState = rootState.wallets['operate-product']
    const walletId = purchaseState.wallet.id
    const request = {
      balance: purchaseState.number * purchaseState.price
    }
    const response = await this.$backend.wallets.updateSubAccountBalance(walletId, request)

    if (response && response.status === 200) {
      this.$toast.success('Środki pomyślnie dodano do subkonta')
    } else if (response && response.status !== 200) {
      this.$toast.error(`Error: ${response.data.error}`)
      console.log('error', response.status, response.data.error)
    }
  },

  async addToSubAccount ({ dispatch, state }, value) {
    const walletId = state.wallet.id
    const request = {
      balance: value
    }
    const response = await this.$backend.wallets.updateSubAccountBalance(walletId, request)

    if (response && response.status === 200) {
      this.$toast.success('Środki pomyślnie wpłacono na subkonto')
      dispatch('wallets/getWalletInfo', walletId, { root: true })
    } else if (response && response.status !== 200) {
      this.$toast.error(`Error: ${response.data.error}`)
      console.log('error', response.status, response.data.error)
    }
  },

  async removeFromSubAccount ({ dispatch, state }, value) {
    const walletId = state.wallet.id
    const request = {
      balance: value * -1
    }
    const response = await this.$backend.wallets.updateSubAccountBalance(walletId, request)

    if (response && response.status === 200) {
      this.$toast.success('Środki pomyślnie wypłacono z subkonta')
      dispatch('wallets/getWalletInfo', walletId, { root: true })
    } else if (response && response.status !== 200) {
      this.$toast.error(`Error: ${response.data.error}`)
      console.log('error', response.status, response.data.error)
    }
  }
}
