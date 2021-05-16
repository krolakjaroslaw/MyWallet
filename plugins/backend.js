import authorization from '~/lib/api/authorization'
import products from '~/lib/api/products'
import wallets from '~/lib/api/wallets'
import walletsEntity from '~/lib/api/wallets/entity.js'

export default ({ $axios, store }, inject) => {
  inject('backend', {
    authorization: {
      ...authorization($axios, store)
    },
    products: {
      ...products($axios, store)
    },
    wallets: {
      ...wallets($axios, store),
      ...walletsEntity($axios, store)
    }
  })
}
