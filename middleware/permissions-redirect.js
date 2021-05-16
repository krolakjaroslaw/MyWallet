// TODO: move to const
const ROUTES_ALLOWED_TO_USER = [
  'buy-product',
  'dashboard',
  'operations',
  'product-details',
  'sell-product',
  'user-profile',
  'wallet-details',
  'wallets'
]

const saveUserInStore = (store) => {
  const sessionUser = sessionStorage.getItem('currentUser')
  if (sessionUser) {
    store.commit('authorization/setCurrentUser', JSON.parse(sessionUser))
    return true
  }
  return false
}

export default ({ route, $permissions, store, redirect }) => {
  if (['index', 'sign-in', 'sign-out', 'sign-up'].includes(route.name)) return

  if (!$permissions.getCurrentUser()) {
    if (!saveUserInStore(store)) {
      redirect({ name: 'sign-in' })
    }
  }

  const isAdmin = $permissions.getIsAdmin()
  if (!isAdmin) {
    if (!ROUTES_ALLOWED_TO_USER.includes(route.name)) {
      redirect({ name: 'dashboard' })
    }
  }
}
