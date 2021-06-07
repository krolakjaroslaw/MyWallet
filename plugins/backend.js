import authorization from '~/lib/api/authorization'
import products from '~/lib/api/products'
import productsEntity from '~/lib/api/products/entity.js'
import stock from '~/lib/api/stock'
import users from '~/lib/api/users'
import wallets from '~/lib/api/wallets'
import walletsEntity from '~/lib/api/wallets/entity.js'

export default ({ $axios, store }, inject) => {
  inject('backend', {
    authorization: {
      ...authorization($axios, store)
    },
    products: {
      ...products($axios, store),
      ...productsEntity($axios, store)
    },
    stock: {
      ...stock($axios, store)
    },
    users: {
      ...users($axios, store)
    },
    wallets: {
      ...wallets($axios, store),
      ...walletsEntity($axios, store)
    }
  })
}
