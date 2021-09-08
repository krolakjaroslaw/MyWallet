<template>
  <div class="my-2">
    <span class="mr-4 font-weight-bold">Okres:</span>
    <v-btn color="white" small @click="changeData('1D')">
      1D
    </v-btn>
    <v-btn color="white" small @click="changeData('1T')">
      1T
    </v-btn>
    <v-btn color="white" small @click="changeData('1M')">
      1M
    </v-btn>
    <v-btn color="white" small @click="changeData('3M')">
      3M
    </v-btn>
    <v-btn color="white" small @click="changeData('6M')">
      6M
    </v-btn>
    <v-btn color="white" small @click="changeData('1Y')">
      1Y
    </v-btn>
    <v-btn color="white" small @click="changeData('5Y')">
      5Y
    </v-btn>
    <v-btn color="white" small @click="changeData('MAX')">
      Max
    </v-btn>
  </div>
<!--  <div>-->
<!--    <span class="mr-4 font-weight-bold">Interwał:</span>-->
<!--    <v-btn-->
<!--      color="white"-->
<!--      small-->
<!--      :disabled="today"-->
<!--      @click="changeInterval('D')"-->
<!--    >-->
<!--      D-->
<!--    </v-btn>-->
<!--    <v-btn-->
<!--      color="white"-->
<!--      small-->
<!--      :disabled="today"-->
<!--      @click="changeInterval('T')"-->
<!--    >-->
<!--      T-->
<!--    </v-btn>-->
<!--    <v-btn-->
<!--      color="white"-->
<!--      small-->
<!--      :disabled="today"-->
<!--      @click="changeInterval('M')"-->
<!--    >-->
<!--      M-->
<!--    </v-btn>-->
<!--    <span class="mx-4 font-weight-bold">Intraday:</span>-->
<!--    <v-btn-->
<!--      color="white"-->
<!--      small-->
<!--      :disabled="!today"-->
<!--      @click="changeInterval('1min')"-->
<!--    >-->
<!--      1 min.-->
<!--    </v-btn>-->
<!--    <v-btn-->
<!--      color="white"-->
<!--      small-->
<!--      :disabled="!today"-->
<!--      @click="changeInterval('5min')"-->
<!--    >-->
<!--      5 min.-->
<!--    </v-btn>-->
<!--    <v-btn-->
<!--      color="white"-->
<!--      small-->
<!--      :disabled="!today"-->
<!--      @click="changeInterval('15min')"-->
<!--    >-->
<!--      15 min.-->
<!--    </v-btn>-->
<!--    <v-btn-->
<!--      color="white"-->
<!--      small-->
<!--      :disabled="!today"-->
<!--      @click="changeInterval('30min')"-->
<!--    >-->
<!--      30 min.-->
<!--    </v-btn>-->
<!--    <v-btn-->
<!--      color="white"-->
<!--      small-->
<!--      :disabled="!today"-->
<!--      @click="changeInterval('1h')"-->
<!--    >-->
<!--      1h-->
<!--    </v-btn>-->
<!--  </div>-->
</template>

<script>
import moment from 'moment'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'ChartPeriodButtons',
  computed: {
    dateFrom: {
      get () { return this.getDateFrom() },
      set (val) { this.setDateFrom(val) }
    },
    maxPeriod: {
      get () { return this.getMaxPeriod() },
      set (val) { this.setMaxPeriod(val) }
    },
    today: {
      get () { return this.getIsToday() },
      set (val) { this.setIsToday(val) }
    }
  },
  methods: {
    ...mapActions('products/stock', ['loadData']),
    ...mapGetters('products/stock', ['getDateFrom', 'getIsToday', 'getMaxPeriod']),
    ...mapMutations('products/stock', ['setDateFrom', 'setIsToday', 'setMaxPeriod']),
    async changeData (item) {
      let timeUnit = 'day'
      this.today = item === '1D'
      this.maxPeriod = item === 'MAX'

      switch (item) {
        case '1T': this.dateFrom = moment(new Date()).subtract(1, 'week').format('YYYY-MM-DD')
          break
        case '1M': this.dateFrom = moment(new Date()).subtract(1, 'month').format('YYYY-MM-DD')
          break
        case '3M': this.dateFrom = moment(new Date()).subtract(3, 'months').format('YYYY-MM-DD')
          break
        case '6M': this.dateFrom = moment(new Date()).subtract(6, 'months').format('YYYY-MM-DD')
          break
        case '1Y': this.dateFrom = moment(new Date()).subtract(1, 'year').format('YYYY-MM-DD')
          break
        case '5Y': this.dateFrom = moment(new Date()).subtract(5, 'years').format('YYYY-MM-DD')
          break
      }

      if (item === '1M' || item === '3M') timeUnit = 'week'
      if (item === '6M' || item === '1Y') timeUnit = 'month'
      if (item === '5Y' || item === 'MAX') timeUnit = 'year'

      await this.loadData()
      this.$emit('updateChart', timeUnit)
    },
    changeInterval (item) {
      let stepSize = 1
      let timeUnit = 'day'
      if (item === '1min') timeUnit = 'minute'
      if (item === '5min') {
        timeUnit = 'minute'
        stepSize = 5
      }
      if (item === '15min') {
        timeUnit = 'minute'
        stepSize = 15
      }
      if (item === '30min') {
        timeUnit = 'minute'
        stepSize = 30
      }
      if (item === '1h') timeUnit = 'hour'
      if (item === 'T') timeUnit = 'week'
      if (item === 'M') timeUnit = 'month'
      this.$emit('updateChart', timeUnit, stepSize)
    }
  }
}
</script>
