import authorization from '~/lib/api/authorization'
import wallets from '~/lib/api/wallets'

export default ({ $axios, store }, inject) => {
  inject('backend', {
    authorization: {
      ...authorization($axios, store)
    },
    wallets: {
      ...wallets($axios, store)
    }
  })
}
