<!--suppress JSUnresolvedVariable -->
<template>
  <v-card
    class="ml-2"
    elevation="0"
    style="background-color: transparent"
  >
    <v-card-title class="d-flex flex-row justify-space-between fill-width py-2">
      <span>{{ name }}</span>
      <span>
        <b>{{ valuation }} zł</b>
        <v-btn
          v-if="productType === 'DEPOSIT'"
          color="primary"
          class="ml-3"
          rounded
          @click="showChangeValueDialog = true"
        >
          Zmień stan konta
        </v-btn>
      </span>
    </v-card-title>
    <v-card-text>
      <div id="productChart">
        <canvas id="chart" class="mt-8" :class="productType === 'DEPOSIT' ? 'chart-expanded' : 'chart'" />
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ChartComponent',
  props: {
    name: {
      type: String,
      default: ''
    },
    valuation: {
      type: Number,
      default: parseFloat(0).toFixed(2)
    }
  },
  computed: {
    ...mapState('products/entity', ['productType'])
  }
}
</script>

<style lang="scss" scoped>
$chart-width: 800px;
$table-width: 300px;
$chart-height: 400px;
$table-height: 150px;

.chart {
  width: $chart-width !important;
  height: $chart-height;
}

.chart-expanded {
  width: $chart-width + $table-width;
  height: $chart-height + $table-height;
}
</style>
