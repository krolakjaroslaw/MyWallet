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
                    {{ depositBaseAmount.toFixed(2) }}
                  </td>
                </tr>
                <tr>
                  <th class="px-2 text-left">
                    Aktualny zysk:
                  </th>
                  <td class="px-2 text-right">
                    {{ currentProfit.toFixed(2) }}
                  </td>
                </tr>
                <tr>
                  <th class="px-2 text-left">
                    Przewidywany zysk:
                  </th>
                  <td class="px-2 text-right">
                    {{ estimatedProfit.toFixed(2) }}
                  </td>
                </tr>
                <tr>
                  <th class="px-2 text-left">
                    Oprocentowanie:
                  </th>
                  <td class="px-2 text-right">
                    {{ interestRate.toFixed(2) }}
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
          <div>
            <b>{{ productType === 'DEPOSIT' ? value : depositBaseAmount }} zł</b>
            <v-btn
              v-if="productType === 'DEPOSIT'"
              color="primary"
              class="ml-3"
              rounded
              @click="showChangeValueDialog = true"
            >
              Zmień stan konta
            </v-btn>
          </div>
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
    <ChangeDepositBalanceDialog v-if="showChangeValueDialog" />
  </v-container>
</template>

<script>
import chartData from 'assets/allegro-chart-data'
import Chart from 'chart.js'
import { mapActions, mapGetters, mapMutations } from 'vuex'

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
    chartJson () { return this.getChartJson() },
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
    value () { return this.getValue() },
    productId: {
      get () { return this.getProductId() },
      set (val) { this.setProductId(val) }
    },
    showChangeValueDialog: {
      get () { return this.getShowChangeValueDialog() },
      set (val) { this.setShowChangeValueDialog(val) }
    }
  },
  async mounted () {
    this.productId = this.$route.params.id
    await this.updateData(this.productId)
    // await this.getProductSummary(this.$route.params.id)
    // await this.getHistoryData(this.$route.params.id)
    // this.productType === 'DEPOSIT'
    //   ? this.getDepositChartData()
    //   : this.getTimeDepositChartData()

    const labels = this.chartJson.map(el => new Date(el.date))
    const values = this.chartJson.map(el => el.value)
    this.createChart('chart', this.chartData(labels, values, values[0]))
  },
  methods: {
    ...mapActions('products/entity', [
      'getDepositChartData',
      'getHistoryData',
      'getProductSummary',
      'getTimeDepositChartData',
      'updateData'
    ]),
    ...mapGetters('products/entity', [
      'getCapitalization',
      'getChartJson',
      'getCurrency',
      'getCurrentProfit',
      'getDepositBaseAmount',
      'getEstimatedProfit',
      'getInterestRate',
      'getInvestmentTime',
      'getInvestmentTimeCount',
      'getName',
      'getProductId',
      'getPurchaseHistory',
      'getShowChangeValueDialog',
      'getStartTime',
      'getValue'
    ]),
    ...mapMutations('products/entity', ['setProductId', 'setShowChangeValueDialog']),

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
$chart-width: 800px;
$table-width: 300px;
$chart-height: 400px;
$table-height: 150px;

.card {
  height: 525px;
}

.card-expanded {
  height: 675px;
}

.chart {
  width: $chart-width !important;
  height: $chart-height;
}

.chart-expanded {
  width: $chart-width + $table-width;
  height: $chart-height + $table-height;
}
</style>
