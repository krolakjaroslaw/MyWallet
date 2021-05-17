// noinspection JSUnresolvedVariable,JSCheckFunctionSignatures

export const actions = {
  async buyOrSellInvestmentProduct ({ rootState }, { operationType, walletId }) {
    const purchaseState = rootState.wallets['operate-product']
    const request = {
      name: ['Commodity', 'Currency'].includes(purchaseState.group)
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
      this.$toast.success(`${request.name} successfully added to wallet`)
    } else if (response && response.status !== 200) {
      this.$toast.error(`Error: ${response.data.error}`)
      console.log('error', response.status, response.data.error)
    }
  },

  async buyRealEstateProduct ({ rootState }, walletId) {
    const purchaseState = rootState.wallets['operate-product']
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

  async createDepositAccountProduct ({ rootState }, walletId) {
    const purchaseState = rootState.wallets['operate-product']
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

  async createTimeDepositProduct ({ rootState }, walletId) {
    const purchaseState = rootState.wallets['operate-product']
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
    console.log('request', request)
    const response = await this.$backend.wallets.addTimeDepositToWallet(walletId, request)
    console.log('request', response)

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
