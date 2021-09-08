<template>
  <div>
    <div class="page-header">
      <parallax
        class="parallax"
        style="
          background: -webkit-linear-gradient(rgba(20, 75, 150, 0.6), rgba(44, 44, 44, 0.6)), url('profile.jpg') center center no-repeat; /* For Safari 5.1 to 6.0 */
          background: -o-linear-gradient(rgba(20, 75, 150, 0.6), rgba(44, 44, 44, 0.6)), url('profile.jpg') center center no-repeat; /* For Opera 11.1 to 12.0 */
          background: -moz-linear-gradient(rgba(20, 75, 150, 0.6), rgba(44, 44, 44, 0.6)), url('profile.jpg') center center no-repeat; /* For Firefox 3.6 to 15 */
          background: linear-gradient(rgba(20, 75, 150, 0.6), rgba(44, 44, 44, 0.6)), url('profile.jpg') center center no-repeat; /* Standard syntax */
          -webkit-background-size: cover;
          -moz-background-size: cover;
          -o-background-size: cover;
          background-size: cover;
        "
      />
    </div>
    <div class="section">
      <v-container class="d-flex flex-row">
        <div class="col-md-7">
          <WalletDataTable />

          <WalletDetailsDataTable />
        </div>

        <div class="col-md-5">
          <StockChartsCarousel />

          <StockRatesCarousel />
        </div>
      </v-container>
    </div>
  </div>
</template>

<script>
import StockChartsCarousel from '@/components/dashboard/StockChartsCarousel'
import StockRatesCarousel from '@/components/dashboard/StockRatesCarousel'
import WalletDataTable from '@/components/dashboard/WalletDataTable'
import WalletDetailsDataTable from '@/components/dashboard/WalletDetailsDataTable'
import { mapActions } from 'vuex'

export default {
  name: 'Dashboard',
  components: { StockChartsCarousel, StockRatesCarousel, WalletDataTable, WalletDetailsDataTable },
  layout: 'parallax',
  async created () {
    await this.loadWallets()
  },
  methods: {
    ...mapActions('wallets', ['loadWallets'])
  }
}
</script>

<style lang="scss" scoped>
.page-header {
  width: 100%;
  height: 17vh;
}
.parallax {
  width: 100%;
  height: 150px !important;
}
.section {
  padding: 10px 0;
  position: relative;
}
</style>
