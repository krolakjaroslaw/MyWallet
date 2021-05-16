// noinspection JSUnresolvedVariable,JSCheckFunctionSignatures

export const actions = {
  async buyProduct ({ commit, dispatch, rootState }, walletId) {
    const purchaseState = rootState.wallets['operate-product']
    const request = {
      name: purchaseState.product,
      productType: purchaseState.group.toUpperCase(),
      transactionDate: purchaseState.date,
      numberOfUnits: purchaseState.number,
      unitPriceAtTransactionTime: purchaseState.price,
      commissionValue: purchaseState.commission,
      comment: purchaseState.comment
    }
    const response = await this.$backend.wallets.addInvestmentToWallet(walletId, request)
    console.log('response', response)

    if (response && response.status === 200) {
      console.log('response', response)
      this.$toast.success(`${request.name} successfully bought`)
    } else if (response && response.status !== 200) {
      this.$toast.error(`Error: ${response.data.error}`)
      console.log('error', response.status, response.data.error)
    }
  },

  // TODO: merge with buyProduct
  async sellProduct ({ commit, dispatch, rootState }, walletId) {
    const purchaseState = rootState.wallets['operate-product']
    const request = {
      name: purchaseState.product,
      productType: purchaseState.group.toUpperCase(),
      transactionDate: purchaseState.date,
      numberOfUnits: purchaseState.number * -1,
      unitPriceAtTransactionTime: purchaseState.price,
      commissionValue: purchaseState.commission,
      comment: purchaseState.comment
    }
    const response = await this.$backend.wallets.addInvestmentToWallet(walletId, request)
    console.log('response', response)

    if (response && response.status === 200) {
      console.log('response', response)
      this.$toast.success(`${request.name} successfully sold`)
    } else if (response && response.status !== 200) {
      this.$toast.error(`Error: ${response.data.error}`)
      console.log('error', response.status, response.data.error)
    }
  }
}
