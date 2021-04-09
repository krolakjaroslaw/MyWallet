const permissions = store => ({
  getCurrentUser: () => store.getters['authorization/getCurrentUser'],
  getIsAdmin: () => store.getters['authorization/getIsAdmin']
})

export default ({ store }, inject) => {
  inject('permissions', { ...permissions(store) })
}
