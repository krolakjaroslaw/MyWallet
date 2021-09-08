<!--suppress CssUnknownTarget, CssOverwrittenProperties, JSUnresolvedVariable -->
<!--eslint-disable vue/no-parsing-error-->
<template>
  <v-container>
    <v-card
      class="col-12 mb-6 rounded-xl d-flex flex-row"
      :class="productType === 'DEPOSIT' ? 'card-expanded' : 'card'"
      style="background-color: #f6f6f6;"
      outlined
    >
      <DepositDataTable />
      <ChartComponent :name="name" :valuation="productType === 'DEPOSIT' ? value : depositBaseAmount" />
    </v-card>
    <HistoryDataTable />
    <ChangeDepositBalanceDialog v-if="showChangeValueDialog" />
  </v-container>
</template>

<script>
import ChartComponent from '@/components/products/entity/ChartComponent'
import DepositDataTable from '@/components/products/entity/DepositDataTable'
import HistoryDataTable from '@/components/products/entity/HistoryDataTable'
import chartData from 'assets/allegro-chart-data'
import Chart from 'chart.js'
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'

export default {
  name: 'DepositProductDetails',
  components: { ChartComponent, DepositDataTable, HistoryDataTable },
  layout: 'parallax',
  data () {
    return {
      chartData,
      myChart: {}
    }
  },
  computed: {
    ...mapState('products/entity', ['depositBaseAmount', 'name', 'productType', 'showChangeValueDialog', 'value']),
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
    ...mapGetters('products/entity', ['getChartJson', 'getProductId']),
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

<style lang="scss" scoped>
.card {
  height: 525px;
}

.card-expanded {
  height: 675px;
}
</style>
