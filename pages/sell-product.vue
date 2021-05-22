<script>
import OperateProduct from '@/components/OperateProduct'
import { mapGetters } from 'vuex'

export default {
  name: 'SellProduct',
  extends: OperateProduct,
  methods: {
    ...mapGetters('wallets/operate-product', ['getProduct', 'getWallet']),

    submit () {
      const routeName = this.$route.name
      if (['COMMODITY', 'CURRENCY', 'ETF_GPW', 'STOCK_GPW'].includes(this.group)) {
        this.buyOrSellInvestmentProduct({ operationType: routeName, walletId: this.getWallet().id })
      } else if (this.group === 'DEPOSIT') {
        this.deleteDepositAccountProduct(this.getProduct().id)
      } else if (this.group === 'REAL_ESTATE') {
        this.sellRealEstateProduct(this.getProduct().id)
      }
      this.resetState()
      this.$router.push({ name: 'wallet-details' })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
