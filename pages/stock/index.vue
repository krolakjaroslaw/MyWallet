<!--suppress JSUnresolvedVariable -->
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
      <v-container>
        <v-tabs
          v-model="tab"
          background-color="default"
          center-active
        >
          <v-tab key="etf">ETF</v-tab>
          <v-tab key="stock">Giełda</v-tab>
          <v-tab key="index">Indeksy</v-tab>
          <v-tab key="commodity">Surowce</v-tab>
          <v-tab key="currency">Waluty</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item key="etf">
            <StockDataTable :headers="stockHeaders" :items="etfs" product-type="ETF_GPW" />
          </v-tab-item>
          <v-tab-item key="stock">
            <StockDataTable :headers="stockHeaders" :items="stock" product-type="STOCK_GPW" />
          </v-tab-item>
          <v-tab-item key="index">
            <StockDataTable :headers="indexHeaders" :items="indexes" product-type="INDEX_GPW" />
          </v-tab-item>
          <v-tab-item key="commodity">
            <StockDataTable :headers="headers" :items="commodities" product-type="COMMODITY" />
          </v-tab-item>
          <v-tab-item key="currency">
            <StockDataTable :headers="headers" :items="currencies" product-type="CURRENCY" />
          </v-tab-item>
        </v-tabs-items>
      </v-container>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import StockDataTable from '@/components/stock/StockDataTable'

export default {
  name: 'Stock',
  components: { StockDataTable },
  layout: 'parallax',
  data () {
    return {
      search: '',
      tab: null
    }
  },
  computed: {
    ...mapState('stock', [
      'commodities',
      'currencies',
      'etfs',
      'headers',
      'indexes',
      'indexHeaders',
      'stock',
      'stockHeaders'
    ])
  },
  created () {
    this.loadData()
  },
  methods: {
    ...mapActions('stock', ['loadData'])
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
