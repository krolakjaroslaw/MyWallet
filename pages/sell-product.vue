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
      if (['Commodity', 'Currency', 'ETF_GPW', 'Stock_GPW'].includes(this.group)) {
        this.buyOrSellInvestmentProduct({ operationType: routeName, walletId: this.getWallet().id })
      } else if (this.group === 'Deposit') {
        this.deleteDepositAccountProduct(this.getProduct().id)
      } else if (this.group === 'Real_Estate') {
        this.sellRealEstateProduct(this.getProduct().id)
      }
      this.resetState()
      this.$router.push({ name: 'wallet-details' })
    }
  }
}
</script>

<style lang="scss" scoped>
.page-header {
  width: 100%;
  height: 17vh;
}

.container {
  padding-top: 0;
}

.parallax {
  width: 100%;
  height: 150px !important;
}

.title {
  font-weight: bold;
  margin: 0 auto;
}

.section {
  padding: 10px 0;
  position: relative;
}

.bold {
  font-weight: bold;
}

.red {
  background-color: transparent !important;
  color: #C62828;
}

.green {
  background-color: transparent !important;
  color: #43A047;
}

.black {
  background-color: transparent !important;
}
</style>
