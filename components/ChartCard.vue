<template>
  <v-card
    elevation="0"
    style="background-color: transparent"
  >
    <v-card-title class="py-2">
      Skład portfela - {{ wallet.name }}
      <v-spacer />
      <v-btn
        color="primary"
        class="mr-3"
        rounded
        @click="$router.push({ name: 'buy-product', params: { id: wallet.id } })"
      >
        Kup
      </v-btn>
      <v-btn
        color="primary"
        rounded
        @click="$router.push({ name: 'sell-product', params: { id: wallet.id } })"
      >
        Sprzedaj
      </v-btn>
    </v-card-title>
    <v-card-text>
      <div id="pieChart">
        <canvas id="pie-chart" />
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import Chart from 'chart.js'
import pieChartData from 'assets/pie-chart-data'

export default {
  name: 'ChartCard',
  props: {
    wallet: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      pieChartData,
      chartLabels: [],
      chartValues: []
    }
  },
  computed: {
    commodities: {
      get () { return this.getCommodities() },
      set (val) { this.setCommodities(val) }
    },
    currencies: {
      get () { return this.getCurrencies() },
      set (val) { this.setCurrencies(val) }
    },
    deposits: {
      get () { return this.getDeposits() },
      set (val) { this.setDeposits(val) }
    },
    etfs: {
      get () { return this.getEtfs() },
      set (val) { this.setEtfs(val) }
    },
    realEstates: {
      get () { return this.getRealEstates() },
      set (val) { this.setRealEstates(val) }
    },
    showAddDialog: {
      get () { return this.getShowAddDialog() },
      set (val) { this.setShowAddDialog(val) }
    },
    showRemoveDialog: {
      get () { return this.getShowRemoveDialog() },
      set (val) { this.setShowRemoveDialog(val) }
    },
    stock: {
      get () { return this.getStock() },
      set (val) { this.setStock(val) }
    },
    timeDeposits: {
      get () { return this.getTimeDeposits() },
      set (val) { this.setTimeDeposits(val) }
    }
  },
  async mounted () {
    console.log('products', this.etfs, this.stock, this.deposits, this.timeDeposits, this.realEstates, this.commodities, this.currencies)
    await this.getAllProductsInWallet(this.$route.params.id)
    if (this.etfs.length > 0) {
      this.chartLabels.push('ETFy')
      const sum = this.etfs
        .map(item => item.currentPurchaseValue)
        .reduce((sum, item) => sum + item)
      this.chartValues.push(sum)
    }

    if (this.stock.length > 0) {
      this.chartLabels.push('Giełda')
      const sum = this.stock
        .map(item => item.currentPurchaseValue)
        .reduce((sum, item) => sum + item)
      this.chartValues.push(sum)
    }

    if (this.deposits.length > 0) {
      this.chartLabels.push('Konta bankowe')
      const sum = this.deposits
        .map(item => item.value)
        .reduce((sum, item) => sum + item)
      this.chartValues.push(sum)
    }

    if (this.timeDeposits.length > 0) {
      this.chartLabels.push('Lokaty')
      const sum = this.timeDeposits
        .map(item => item.depositBaseAmount)
        .reduce((sum, item) => sum + item)
      this.chartValues.push(sum)
    }

    if (this.realEstates.length > 0) {
      this.chartLabels.push('Nieruchomości')
      const sum = this.realEstates
        .map(item => item.currentValuation)
        .reduce((sum, item) => sum + item)
      this.chartValues.push(sum)
    }

    if (this.commodities.length > 0) {
      this.chartLabels.push('Surowce')
      const sum = this.commodities
        .map(item => item.currentPurchaseValue)
        .reduce((sum, item) => sum + item)
      this.chartValues.push(sum)
    }

    if (this.currencies.length > 0) {
      this.chartLabels.push('Waluty')
      const sum = this.currencies
        .map(item => item.currentPurchaseValue)
        .reduce((sum, item) => sum + item)
      this.chartValues.push(sum)
    }

    const colors = [
      'rgba(0, 0, 139, 1)',
      'rgba(30, 144, 255, 1)',
      'rgba(0, 0, 205, 1)',
      'rgba(100, 149, 237, 1)',
      'rgba(0, 191, 255, 1)',
      'rgba(65, 105, 225, 1)',
      'rgba(135, 206, 250, 1)'
    ]
    console.log('chart', this.chartLabels)
    console.log('chart', this.chartValues)
    this.createChart('pie-chart', this.pieChartData(this.chartLabels, this.chartValues, colors))
  },
  methods: {
    ...mapActions('wallets/entity', ['getAllProductsInWallet']),
    ...mapGetters('wallets/entity', ['getCommodities', 'getCurrencies', 'getDeposits', 'getEtfs', 'getRealEstates',
      'getStock', 'getTimeDeposits']),
    ...mapMutations('wallets/entity', ['setCommodities', 'setCurrencies', 'setDeposits', 'setEtfs', 'setRealEstates',
      'setStock', 'setTimeDeposits']),

    createChart (chartId, chartData) {
      const ctx = document.getElementById(chartId)
      const myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
      })
      console.log(myChart)
    }
  }
}
</script>

<style lang="scss" scoped>
#pie-chart {
  height: 450px !important;
  width: 900px !important;
}

.green {
  background-color: transparent !important;
  color: #43A047;
}
</style>
