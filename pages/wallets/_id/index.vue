<!--suppress CssUnknownTarget, CssOverwrittenProperties, JSUnresolvedVariable -->
<template>
  <div>
    <div class="page-header">
      <parallax
        class="parallax"
        style="
          background: -webkit-linear-gradient(rgba(20, 75, 150, 0.6), rgba(44, 44, 44, 0.6)), url('../profile.jpg') center center no-repeat; /* For Safari 5.1 to 6.0 */
          background: -o-linear-gradient(rgba(20, 75, 150, 0.6), rgba(44, 44, 44, 0.6)), url('../profile.jpg') center center no-repeat; /* For Opera 11.1 to 12.0 */
          background: -moz-linear-gradient(rgba(20, 75, 150, 0.6), rgba(44, 44, 44, 0.6)), url('../profile.jpg') center center no-repeat; /* For Firefox 3.6 to 15 */
          background: linear-gradient(rgba(20, 75, 150, 0.6), rgba(44, 44, 44, 0.6)), url('../profile.jpg') center center no-repeat; /* Standard syntax */
          -webkit-background-size: cover;
          -moz-background-size: cover;
          -o-background-size: cover;
          background-size: cover;
        "
      />
    </div>

    <div class="section">
      <v-container>
        <v-card
          class="col-12 mb-6 rounded-xl"
          style="background-color: #f6f6f6;"
          outlined
        >
          <SubAccountCard :wallet="wallet" />
        </v-card>

        <v-card
          class="col-12 mb-6 rounded-xl"
          :class="productsCount > 0 ? 'chart-expanded' : 'chart'"
          style="background-color: #f6f6f6;"
          outlined
        >
          <ChartCard :wallet="wallet" />
        </v-card>

        <v-expansion-panels
          v-model="panel"
          focusable
          multiple
          popout
          style="width: 100%;"
        >
          <EtfsPanel />
          <StockPanel />
          <DepositsPanel />
          <TimeDepositsPanel />
          <RealEstatesPanel />
          <CommoditiesPanel />
          <CurrenciesPanel />
        </v-expansion-panels>
      </v-container>
    </div>
    <AddToSubAccountDialog v-if="showAddDialog" />
    <RemoveFromSubAccountDialog v-if="showRemoveDialog" />
  </div>
</template>

<script>
import ChartCard from '@/components/wallets/entity/ChartCard'
import CommoditiesPanel from '@/components/wallets/entity/panels/CommoditiesPanel'
import CurrenciesPanel from '@/components/wallets/entity/panels/CurrenciesPanel'
import DepositsPanel from '@/components/wallets/entity/panels/DepositsPanel'
import EtfsPanel from '@/components/wallets/entity/panels/EtfsPanel'
import RealEstatesPanel from '@/components/wallets/entity/panels/RealEstatesPanel'
import StockPanel from '@/components/wallets/entity/panels/StockPanel'
import SubAccountCard from '@/components/wallets/entity/SubAccountCard'
import TimeDepositsPanel from '@/components/wallets/entity/panels/TimeDepositsPanel'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'WalletDetails',
  components: {
    ChartCard,
    CommoditiesPanel,
    CurrenciesPanel,
    DepositsPanel,
    EtfsPanel,
    RealEstatesPanel,
    StockPanel,
    SubAccountCard,
    TimeDepositsPanel
  },
  layout: 'parallax',
  data () {
    return {
      panel: []
    }
  },
  computed: {
    productsCount () { return this.getProductsCount() },
    showAddDialog () { return this.getShowAddDialog() },
    showRemoveDialog () { return this.getShowRemoveDialog() },
    wallet () { return this.getWallet() }
  },
  async created () {
    await this.getWalletInfo(this.$route.params.id)
  },
  methods: {
    ...mapActions('wallets', ['getWalletInfo']),
    ...mapGetters('wallets/entity', ['getProductsCount', 'getShowAddDialog', 'getShowRemoveDialog', 'getWallet']),
    ...mapMutations('wallets/entity', ['setShowAddDialog', 'setShowRemoveDialog'])
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

.chart {
  height: 75px;
}

.chart-expanded {
  height: 525px;
}
</style>
