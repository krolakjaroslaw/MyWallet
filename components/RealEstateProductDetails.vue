<!--suppress CssUnknownTarget, CssOverwrittenProperties -->
<!--eslint-disable vue/no-parsing-error-->
<template>
  <v-container>
    <v-card
      class="col-12 mb-6 rounded-xl d-flex flex-row"
      style="height: 525px; background-color: #f6f6f6;"
      outlined
    >
      <v-card
        class="rounded-xl"
        elevation="0"
        style="min-width: 300px; max-width: 300px;"
      >
        <v-card-title class="d-flex flex-column mb-15">
          {{ name }}
          <v-divider style="background-color: #144b96; width: 100%;" />
        </v-card-title>
        <v-card-text>
          <v-simple-table
            dense
            fixed-header
          >
            <template #default>
              <tbody>
                <tr>
                  <th class="px-2 text-left">
                    Wartość transakcji:
                  </th>
                  <td class="px-2 text-right">
                    {{ purchaseValuation }} zł
                  </td>
                </tr>
                <tr>
                  <th class="px-2 text-left">
                    Aktualna wartość:
                  </th>
                  <td class="px-2 text-right">
                    {{ currentValuation }} zł
                  </td>
                </tr>
                <tr>
                  <th class="px-2 text-left">
                    Zysk:
                  </th>
                  <td class="px-2 text-right">
                    {{ profit }} zł
                  </td>
                </tr>
                <tr>
                  <th class="px-2 text-left">
                    Stopa zwrotu:
                  </th>
                  <td class="px-2 text-right">
                    {{ rateOfReturn }}
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
        <v-card-actions class="d-flex justify-center">
          <v-btn
            color="primary"
            rounded
            @click="showChangeValueDialog = true"
          >
            Zmień wartość
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-card
        class="ml-2"
        elevation="0"
        style="background-color: transparent"
      >
        <v-card-title class="d-flex flex-row justify-space-between fill-width py-2">
          <span>{{ name }}</span>
          <span>
            <b>{{ currentValuation }} zł</b>
          </span>
        </v-card-title>
        <v-card-text>
          <div id="productChart">
            <!--TODO-->
            <canvas id="chart" class="mt-8" />
          </div>
        </v-card-text>
      </v-card>
    </v-card>
    <v-card
      class="rounded-xl"
      elevation="0"
    >
      <v-card-title class="d-flex flex-column">
        Historia wartości
        <v-divider style="background-color: #144b96; width: 100%;" />
      </v-card-title>
      <v-card-text>
        <v-simple-table
          dense
          fixed-header
        >
          <template #default>
            <thead>
              <tr>
                <th class="text-left">
                  Data
                </th>
                <th class="text-right">
                  Wartość
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in purchaseHistory"
                :key="item.historyId"
              >
                <th class="text-left">
                  {{ item.valuationDate }}
                </th>
                <td class="text-right">
                  {{ item.valuation }} zł
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>
    </v-card>
    <ChangeRealEstateValueDialog v-if="showChangeValueDialog" />
  </v-container>
</template>

<script>
import chartData from 'assets/allegro-chart-data'
import Chart from 'chart.js'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'RealEstateProductDetails',
  layout: 'parallax',
  data () {
    return {
      chartData
    }
  },
  computed: {
    chartJson () { return this.getChartJson() },
    currentValuation () { return this.getCurrentValuation() },
    name () { return this.getName() },
    profit () { return this.getProfit() },
    purchaseHistory () { return this.getPurchaseHistory() },
    purchaseValuation () { return this.getPurchaseValuation() },
    rateOfReturn () { return this.getRateOfReturn() },
    showChangeValueDialog: {
      get () { return this.getShowChangeValueDialog() },
      set (val) { this.setShowChangeValueDialog(val) }
    }
  },
  async mounted () {
    await this.getProductSummary(this.$route.params.id)
    await this.getHistoryData(this.$route.params.id)
    this.getRealEstateChartData()

    const labels = this.chartJson.map(el => new Date(el.date))
    const values = this.chartJson.map(el => el.value)
    this.createChart('chart', this.chartData(labels, values, values[0]))
  },
  methods: {
    ...mapActions('products/entity', ['getHistoryData', 'getProductSummary', 'getRealEstateChartData']),
    ...mapGetters('products/entity', [
      'getChartJson',
      'getCurrentValuation',
      'getName',
      'getProfit',
      'getPurchaseHistory',
      'getPurchaseValuation',
      'getRateOfReturn',
      'getShowChangeValueDialog'
    ]),
    ...mapMutations('products/entity', ['setShowChangeValueDialog']),

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
#chart {
  width: 800px !important;
  height: 400px !important;
}
</style>
