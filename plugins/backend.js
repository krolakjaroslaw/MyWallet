import authorization from '~/lib/api/authorization'

export default ({ $axios, store }, inject) => {
  inject('backend', {
    authorization: {
      ...authorization($axios, store)
    }
  })
}
