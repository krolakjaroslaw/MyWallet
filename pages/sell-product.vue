<script>
import OperateProduct from '@/components/OperateProduct'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'SellProduct',
  extends: OperateProduct,
  layout: 'parallax',
  computed: {
    showAccountDialog: {
      get () { return this.getShowAccountDialog() },
      set (val) { this.setShowAccountDialog(val) }
    }
  },
  methods: {
    ...mapActions('wallets/entity', ['deleteDepositAccountProduct', 'sellRealEstateProduct']),
    ...mapGetters('wallets/operate-product', ['getProduct', 'getShowAccountDialog', 'getWallet']),
    ...mapMutations('wallets/operate-product', ['setShowAccountDialog']),

    submit () {
      const routeName = this.$route.name
      if (['COMMODITY', 'CURRENCY', 'ETF_GPW', 'STOCK_GPW'].includes(this.group)) {
        this.buyOrSellInvestmentProduct(routeName)
      } else if (this.group === 'DEPOSIT') {
        this.deleteDepositAccountProduct(this.getProduct().id)
      } else if (this.group === 'REAL_ESTATE') {
        this.sellRealEstateProduct(this.getProduct().id)
      }
      this.$router.push({ name: 'wallets' })
      this.showAccountDialog = true
    }
  }
}
</script>
