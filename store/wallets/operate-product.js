// noinspection JSUnresolvedVariable,JSCheckFunctionSignatures

const basicState = {
  // Step1
  wallet: '',
  group: '',
  product: '',

  // Step2
  date: new Date().toISOString().substr(0, 10),
  number: 0,
  price: 0.0,
  commission: 0,
  comment: ''
}

export const state = () => ({
  ...basicState,
  // TODO: get from somewhere?
  groups: [
    'Commodity',
    'Currency',
    'Deposit',
    'ETF_GPW',
    'Stock_GPW',
    'Real_Estate',
    'Time_Deposit'
  ],
  // TODO: get from somewhere?
  products: [],
  wallets: []
})

export const getters = {
  getGroups: (store) => { return store.groups },
  getProducts: (store) => { return store.products },
  getWallets: (store) => { return store.wallets },

  // Step1
  getGroup: (store) => { return store.group },
  getProduct: (store) => { return store.product },
  getWallet: (store) => { return store.wallet },

  // Step2
  getComment: (store) => { return store.comment },
  getCommission: (store) => { return store.commission },
  getDate: (store) => { return store.date },
  getNumber: (store) => { return store.number },
  getPrice: (store) => { return store.price }
}

export const mutations = {
  resetState: (store) => {
    Object.keys(basicState).forEach((key) => {
      store[key] = basicState[key]
    })
  },
  setGroups: (store, payload) => { store.groups = payload },
  setProducts: (store, payload) => { store.products = payload },
  setWallets: (store, payload) => { store.wallets = payload },

  // Step1
  setGroup: (store, payload) => { store.group = payload },
  setProduct: (store, payload) => { store.product = payload },
  setWallet: (store, payload) => { store.wallet = payload },

  // Step2
  setComment: (store, payload) => { store.comment = payload },
  setCommission: (store, payload) => { store.commission = payload },
  setDate: (store, payload) => { store.date = payload },
  setNumber: (store, payload) => { store.number = payload },
  setPrice: (store, payload) => { store.price = payload }
}

export const actions = {
  async loadGroups ({ commit }) {
    // TODO: implement
    await commit('setGroups')
  },

  async loadProducts ({ commit }) {
    // TODO: implement
    await commit('setProducts')
  }
}
