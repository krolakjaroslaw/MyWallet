<script>
import OperateProduct from '@/components/OperateProduct'
import { mapActions } from 'vuex'

export default {
  name: 'BuyProduct',
  extends: OperateProduct,
  methods: {
    ...mapActions('wallets/entity', ['buyRealEstateProduct', 'createDepositAccountProduct', 'createTimeDepositProduct']),

    submit () {
      const routeName = this.$route.name
      if (['COMMODITY', 'CURRENCY', 'ETF_GPW', 'STOCK_GPW'].includes(this.group)) {
        this.buyOrSellInvestmentProduct(routeName)
      } else if (this.group === 'DEPOSIT') {
        this.createDepositAccountProduct()
      } else if (this.group === 'REAL_ESTATE') {
        this.buyRealEstateProduct()
      } else if (this.group === 'TIME_DEPOSIT') {
        this.createTimeDepositProduct()
      }
      this.resetState()
      this.$router.push({ name: 'wallets' })
    }
  }
}
</script>
