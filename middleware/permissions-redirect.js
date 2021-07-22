import { ROUTES } from 'assets/constant/api'

const ROUTES_ALLOWED_TO_USER = [
  ROUTES.buyProduct,
  ROUTES.dashboard,
  ROUTES.operations,
  ROUTES.productId,
  ROUTES.sellProduct,
  ROUTES.stock,
  ROUTES.stockName,
  ROUTES.userProfile,
  ROUTES.walletId,
  ROUTES.wallets
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
      return
    }
  }

  const isAdmin = $permissions.getIsAdmin()
  if (!isAdmin) {
    if (!ROUTES_ALLOWED_TO_USER.includes(route.name)) {
      redirect({ name: 'dashboard' })
    }
  }
}
