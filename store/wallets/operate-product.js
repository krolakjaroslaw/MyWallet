// noinspection JSUnresolvedVariable,JSCheckFunctionSignatures

const step2State = {
  // Step2
  capitalization: '',
  comment: '',
  commission: 0,
  currency: '',
  date: null,
  interestRate: 0.0,
  investmentTime: '',
  name: '',
  number: 0,
  price: 0.0
}

const basicState = {
  ...step2State,
  stepper: 1,

  // Step1
  group: '',
  product: null,
  wallet: null
}

export const state = () => ({
  ...basicState,
  groups: [],
  products: [],
  wallets: []
})

export const getters = {
  getStepper: (store) => { return store.stepper },

  getGroups: (store) => { return store.groups },
  getProducts: (store) => { return store.products },
  getWallets: (store) => { return store.wallets },

  // Step1
  getGroup: (store) => { return store.group },
  getProduct: (store) => { return store.product },
  getWallet: (store) => { return store.wallet },

  // Step2
  getCapitalization: (store) => { return store.capitalization },
  getComment: (store) => { return store.comment },
  getCommission: (store) => { return store.commission },
  getCurrency: (store) => { return store.currency },
  getDate: (store) => { return store.date },
  getInterestRate: (store) => { return store.interestRate },
  getInvestmentTime: (store) => { return store.investmentTime },
  getName: (store) => { return store.name },
  getNumber: (store) => { return store.number },
  getPrice: (store) => { return store.price }
}

export const mutations = {
  resetState: (store) => {
    Object.keys(basicState).forEach((key) => {
      store[key] = basicState[key]
    })
    store.date = null
    store.product = null
    store.wallet = null
  },
  resetStep2State: (store) => {
    Object.keys(step2State).forEach((key) => {
      store[key] = step2State[key]
    })
    store.date = null
  },
  setStepper: (store, payload) => { store.stepper = payload },

  setGroups: (store, payload) => { store.groups = payload },
  setProducts: (store, payload) => { store.products = payload },
  setWallets: (store, payload) => { store.wallets = payload },

  // Step1
  setGroup: (store, payload) => { store.group = payload },
  setProduct: (store, payload) => { store.product = payload },
  setWallet: (store, payload) => { store.wallet = payload },

  // Step2
  setCapitalization: (store, payload) => { store.capitalization = payload },
  setComment: (store, payload) => { store.comment = payload },
  setCommission: (store, payload) => { store.commission = payload },
  setCurrency: (store, payload) => { store.currency = payload },
  setDate: (store, payload) => { store.date = payload },
  setInterestRate: (store, payload) => { store.interestRate = payload },
  setInvestmentTime: (store, payload) => { store.investmentTime = payload },
  setName: (store, payload) => { store.name = payload },
  setNumber: (store, payload) => { store.number = payload },
  setPrice: (store, payload) => { store.price = payload }
}

export const actions = {
  async loadGroups ({ commit }) {
    const response = await this.$backend.wallets.getAllProductTypes()

    if (response && response.status === 200) {
      commit('setGroups', response.data.sort())
    } else if (response && response.status !== 200) {
      this.$toast.error(`Error: ${response.data.error}`)
      console.log('error', response.status, response.data.error)
    }
  },

  async loadGroupsInWallet ({ commit }, walletId) {
    const response = await this.$backend.wallets.getProductTypesInWallet(walletId)

    if (response && response.status === 200) {
      commit('setGroups', response.data.filter(item => !['DEPOSIT', 'TIME_DEPOSIT'].includes(item)).sort())
    } else if (response && response.status !== 200) {
      this.$toast.error(`Error: ${response.data.error}`)
      console.log('error', response.status, response.data.error)
    }
  },

  async loadProducts ({ commit, dispatch, state }, routeName) {
    let response
    const walletId = state.wallet.id
    const group = state.group
    if (routeName === 'buy-product') response = await dispatch('loadBuyingProducts')
    if (routeName === 'sell-product') response = await this.$backend.wallets.getWalletInvestmentProducts(walletId, group)

    if (response && response.status === 200) {
      commit('setProducts', response.data.sort())
    } else if (response && response.status !== 200) {
      this.$toast.error(`Error: ${response.data.error}`)
      console.log('error', response.status, response.data.error)
    }
  },

  async loadBuyingProducts ({ state }) {
    let response
    if (state.group === 'COMMODITY') response = await this.$backend.products.getCommoditySymbols()
    if (state.group === 'CURRENCY') response = await this.$backend.products.getCurrencySymbols()
    if (state.group === 'ETF_GPW') response = await this.$backend.products.getETFSymbols()
    if (state.group === 'STOCK_GPW') response = await this.$backend.products.getStockSymbols()
    return response
  }
}
