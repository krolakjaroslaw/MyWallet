<!--suppress CssUnknownTarget, CssOverwrittenProperties, JSUnresolvedVariable -->
<!--eslint-disable vue/no-parsing-error-->
<template>
  <v-container>
    <v-card
      class="col-12 mb-6 rounded-xl d-flex flex-row"
      style="height: 525px; background-color: #f6f6f6;"
      outlined
    >
      <v-card
        v-if="productType === 'TIME_DEPOSIT'"
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
                    Kwota bazowa:
                  </th>
                  <td class="px-2 text-right">
                    {{ depositBaseAmount }}
                  </td>
                </tr>
                <tr>
                  <th class="px-2 text-left">
                    Aktualny zysk:
                  </th>
                  <td class="px-2 text-right">
                    {{ currentProfit }}
                  </td>
                </tr>
                <tr>
                  <th class="px-2 text-left">
                    Przewidywany zysk:
                  </th>
                  <td class="px-2 text-right">
                    {{ estimatedProfit }}
                  </td>
                </tr>
                <tr>
                  <th class="px-2 text-left">
                    Oprocentowanie:
                  </th>
                  <td class="px-2 text-right">
                    {{ interestRate }}
                  </td>
                </tr>
                <tr>
                  <th class="px-2 text-left">
                    Rozpoczęcie:
                  </th>
                  <td class="px-2 text-right">
                    {{ startTime }}
                  </td>
                </tr>
                <tr>
                  <th class="px-2 text-left">
                    Okres:
                  </th>
                  <td class="px-2 text-right">
                    {{ investmentTermTimeCount }} {{ investmentTermTime }}
                  </td>
                </tr>
                <tr>
                  <th class="px-2 text-left">
                    Kapitalizacja:
                  </th>
                  <td class="px-2 text-right">
                    {{ capitalization }}
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
      </v-card>
      <v-card
        class="ml-2"
        elevation="0"
        style="background-color: transparent"
      >
        <v-card-title class="d-flex flex-row justify-space-between fill-width py-2">
          <span>{{ name }}</span>
          <span>
            <b>{{ productType === 'DEPOSIT' ? value : depositBaseAmount }} zł</b>
          </span>
        </v-card-title>
        <v-card-text>
          <div id="productChart">
            <!--TODO-->
            <canvas id="chart" class="mt-8" :class="productType === 'DEPOSIT' ? 'chart-expanded' : 'chart'" />
          </div>
        </v-card-text>
      </v-card>
    </v-card>
    <v-card
      v-if="productType === 'DEPOSIT'"
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
                  {{ item.balanceChangeDate }}
                </th>
                <td class="text-right">
                  {{ item.balance }} {{ currency }}
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import json from 'assets/allegro-data.json'
import chartData from 'assets/allegro-chart-data'
import Chart from 'chart.js'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'DepositProductDetails',
  layout: 'parallax',
  props: {
    productType: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      chartData
    }
  },
  computed: {
    capitalization () { return this.getCapitalization() },
    currency () { return this.getCurrency() },
    currentProfit () { return this.getCurrentProfit() },
    depositBaseAmount () { return this.getDepositBaseAmount() },
    estimatedProfit () { return this.getEstimatedProfit() },
    interestRate () { return this.getInterestRate() },
    investmentTermTime () { return this.getInvestmentTime() },
    investmentTermTimeCount () { return this.getInvestmentTimeCount() },
    name () { return this.getName() },
    purchaseHistory () { return this.getPurchaseHistory() },
    startTime () { return this.getStartTime() },
    value () { return this.getValue() }
  },
  created () {
    this.getProductSummary(this.$route.params.id)
    this.getHistoryData(this.$route.params.id)
  },
  mounted () {
    const labels = json.main.map(el => new Date(el[0]))
    const values = json.main.map(el => el[1])
    this.createChart('chart', this.chartData(labels, values))
  },
  methods: {
    ...mapActions('products/entity', ['getHistoryData', 'getProductSummary']),
    ...mapGetters('products/entity', [
      'getCapitalization',
      'getCurrency',
      'getCurrentProfit',
      'getDepositBaseAmount',
      'getEstimatedProfit',
      'getInterestRate',
      'getInvestmentTime',
      'getInvestmentTimeCount',
      'getName',
      'getPurchaseHistory',
      'getStartTime',
      'getValue'
    ]),

    createChart (chartId, chartData) {
      const ctx = document.getElementById(chartId)
      const myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
      })
      console.log(myChart)
    },
    changeData (item) {
      console.log('change', item)
    }
  }
}
</script>

<style lang="scss" scoped>
$chart-width: 800px;
$table-width: 300px;

.chart {
  width: $chart-width !important;
  height: 400px !important;
}

.chart-expanded {
  width: $chart-width + $table-width;
  height: 400px !important;
}
</style>
