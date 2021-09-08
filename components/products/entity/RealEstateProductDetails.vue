<template>
  <v-container>
    <v-card
      class="col-12 mb-6 rounded-xl d-flex flex-row"
      style="height: 525px; background-color: #f6f6f6;"
      outlined
    >
      <RealEstateDataTable />
      <ChartComponent :name="name" :valuation="currentValuation" />
    </v-card>
    <HistoryDataTable />
    <!--TODO: merge with ChangeDepositBalanceDialog-->
    <ChangeRealEstateValueDialog v-if="showChangeValueDialog" :chart="myChart" />
  </v-container>
</template>

<script>
import ChartComponent from '@/components/products/entity/ChartComponent'
import HistoryDataTable from '@/components/products/entity/HistoryDataTable'
import RealEstateDataTable from '@/components/products/entity/RealEstateDataTable'
import chartData from 'assets/allegro-chart-data'
import Chart from 'chart.js'
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'

export default {
  name: 'RealEstateProductDetails',
  components: { ChartComponent, HistoryDataTable, RealEstateDataTable },
  layout: 'parallax',
  data () {
    return {
      chartData,
      myChart: {}
    }
  },
  computed: {
    ...mapState('products/entity', ['currentValuation', 'name', 'showChangeValueDialog']),
    chartJson () { return this.getChartJson() },
    productId: {
      get () { return this.getProductId() },
      set (val) { this.setProductId(val) }
    }
  },
  async created () {
    this.productId = this.$route.params.id
    await this.updateData(this.productId)

    const labels = this.chartJson.map(el => new Date(el.date))
    const values = this.chartJson.map(el => el.value)
    this.createChart('chart', this.chartData(labels, values, values[0]))
  },
  methods: {
    ...mapActions('products/entity', ['updateData']),
    ...mapGetters('products/entity', ['getChartJson', 'getCurrentValuation', 'getName', 'getProductId']),
    ...mapMutations('products/entity', ['setProductId']),

    createChart (chartId, chartData) {
      const ctx = document.getElementById(chartId)
      this.myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
      })
    }
  }
}
</script>
