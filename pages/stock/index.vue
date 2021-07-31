<!--suppress CssUnknownTarget, CssOverwrittenProperties -->
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

    <!--    TODO: modularity-->
    <div class="section">
      <v-container>
        <v-tabs
          v-model="tab"
          background-color="default"
          center-active
        >
          <v-tab key="etf">
            ETF
          </v-tab>
          <v-tab key="stock">
            Giełda
          </v-tab>
          <v-tab key="index">
            Indeksy
          </v-tab>
          <v-tab key="commodity">
            Surowce
          </v-tab>
          <v-tab key="currency">
            Waluty
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item key="etf">
            <v-data-table
              dense
              calculate-widths
              :hide-default-footer="etfs.length <= 20"
              :loading="etfs.length === 0"
              loading-text="Loading items..."
              :headers="stockHeaders"
              :items="etfs"
              :search="search"
              item-key="symbol"
              class="elevation-0 my-2"
              :footer-props="{
                showCurrentPage: etfs.length > 20,
                showFirstLastPage: etfs.length > 20,
                itemsPerPageOptions: [20]
              }"
            >
              <template #top>
                <v-text-field
                  v-model="search"
                  label="Wyszukaj"
                  class="mx-4"
                />
              </template>
              <template #[`item.symbol`]="{ item }">
                <router-link :to="{ name: 'stock-name', params: { name: item.symbol, type: 'ETF_GPW' } }">
                  <b>{{ item.symbol }}</b>
                </router-link>
              </template>
            </v-data-table>
          </v-tab-item>
          <v-tab-item key="stock">
            <v-data-table
              dense
              calculate-widths
              :hide-default-footer="stock.length <= 20"
              :loading="stock.length === 0"
              loading-text="Loading items..."
              :headers="stockHeaders"
              :items="stock"
              :search="search"
              item-key="symbol"
              class="elevation-0 my-2"
              :footer-props="{
                showCurrentPage: stock.length > 20,
                showFirstLastPage: stock.length > 20,
                itemsPerPageOptions: [20]
              }"
            >
              <template #top>
                <v-text-field
                  v-model="search"
                  label="Wyszukaj"
                  class="mx-4"
                />
              </template>
              <template #[`item.symbol`]="{ item }">
                <router-link :to="{ name: 'stock-name', params: { name: item.symbol, symbol: item.symbolShort, type: 'STOCK_GPW' } }">
                  <b>{{ item.symbol }}</b>
                </router-link>
                <!--<v-icon v-if="item.change.includes('0.0000')">-->
                <!--  mdi-equal-->
                <!--</v-icon>-->
                <!--<v-icon v-else :color="getColor(item)">-->
                <!--  {{ item.change.includes('-') ? 'mdi-menu-down' : 'mdi-menu-up' }}-->
                <!--</v-icon>-->
              </template>
            </v-data-table>
          </v-tab-item>
          <v-tab-item key="index">
            <v-data-table
              dense
              calculate-widths
              :hide-default-footer="indexes.length <= 20"
              :loading="indexes.length === 0"
              loading-text="Loading items..."
              :headers="indexHeaders"
              :items="indexes"
              :search="search"
              item-key="symbol"
              class="elevation-0 my-2"
              :footer-props="{
                showCurrentPage: indexes.length > 20,
                showFirstLastPage: indexes.length > 20,
                itemsPerPageOptions: [20]
              }"
            >
              <template #top>
                <v-text-field
                  v-model="search"
                  label="Wyszukaj"
                  class="mx-4"
                />
              </template>
              <template #[`item.symbol`]="{ item }">
                <router-link :to="{ name: 'stock-name', params: { name: item.symbol, type: 'INDEX_GPW' } }">
                  <b>{{ item.symbol }}</b>
                </router-link>
              </template>
            </v-data-table>
          </v-tab-item>
          <v-tab-item key="commodity">
            <v-data-table
              dense
              calculate-widths
              :hide-default-footer="commodities.length <= 20"
              :loading="commodities.length === 0"
              loading-text="Loading items..."
              :headers="headers"
              :items="commodities"
              :search="search"
              item-key="symbol"
              class="elevation-0 my-2"
              :footer-props="{
                showCurrentPage: commodities.length > 20,
                showFirstLastPage: commodities.length > 20,
                itemsPerPageOptions: [20]
              }"
            >
              <template #top>
                <v-text-field
                  v-model="search"
                  label="Wyszukaj"
                  class="mx-4"
                />
              </template>
              <template #[`item.symbol`]="{ item }">
                <router-link :to="{ name: 'stock-name', params: { name: item.symbol, type: 'COMMODITY' } }">
                  <b>{{ item.symbol }}</b>
                </router-link>
              </template>
            </v-data-table>
          </v-tab-item>
          <v-tab-item key="currency">
            <v-data-table
              dense
              calculate-widths
              :hide-default-footer="currencies.length <= 20"
              :loading="currencies.length === 0"
              loading-text="Loading items..."
              :headers="headers"
              :items="currencies"
              :search="search"
              item-key="symbol"
              class="elevation-0 my-2"
              :footer-props="{
                showCurrentPage: currencies.length > 20,
                showFirstLastPage: currencies.length > 20,
                itemsPerPageOptions: [20]
              }"
            >
              <template #top>
                <v-text-field
                  v-model="search"
                  label="Wyszukaj"
                  class="mx-4"
                />
              </template>
              <template #[`item.symbol`]="{ item }">
                <b>{{ item.symbol.split('.')[0] }}</b>
              </template>
            </v-data-table>
          </v-tab-item>
        </v-tabs-items>
      </v-container>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Stock',
  layout: 'parallax',
  data () {
    return {
      search: '',
      tab: null,
      commodities: [],
      currencies: [],
      etfs: [],
      indexes: [],
      stock: []
    }
  },
  computed: {
    indexHeaders () {
      return [
        { text: 'Walor', value: 'symbol', align: 'start' },
        { text: 'Symbol', value: 'symbolShort', align: 'start' },
        { text: 'Kurs', value: 'quote', align: 'right', filterable: false },
        { text: 'Zmiana', value: 'change', align: 'right', filterable: false },
        { text: 'Max', value: 'quoteMax', align: 'right', filterable: false },
        { text: 'Min', value: 'quoteMin', align: 'right', filterable: false }
      ]
    },
    stockHeaders () {
      return [
        { text: 'Walor', value: 'symbol', align: 'start' },
        { text: 'Symbol', value: 'symbolShort', align: 'start' },
        { text: 'Kurs', value: 'quote', align: 'right', filterable: false },
        { text: 'Oferta kupna', value: 'bidSize', align: 'right', filterable: false },
        { text: 'Oferta sprzedaży', value: 'askSize', align: 'right', filterable: false },
        { text: 'Zmiana', value: 'change', align: 'right', filterable: false },
        { text: 'Wolumen', value: 'volume', align: 'right', filterable: false },
        { text: 'Max', value: 'quoteMax', align: 'right', filterable: false },
        { text: 'Min', value: 'quoteMin', align: 'right', filterable: false }
      ]
    },
    headers () {
      return [
        { text: 'Walor', value: 'symbol', align: 'start' },
        { text: 'Oferta kupna', value: 'bidPrice', align: 'right', filterable: false },
        { text: 'Oferta sprzedaży', value: 'askPrice', align: 'right', filterable: false },
        { text: 'Zmiana', value: 'bidDatChangePercentage', align: 'right', filterable: false },
        { text: 'Max', value: 'highBidPrice', align: 'right', filterable: false },
        { text: 'Min', value: 'lowBidPrice', align: 'right', filterable: false }
      ]
    }
  },
  async created () {
    this.commodities = (await this.$backend.stock.getCommodity()).data
    console.log('commodities', this.commodities)
    this.currencies = (await this.$backend.stock.getCurrency()).data
    console.log('currencies', this.currencies)
    this.indexes = (await this.$backend.stock.getAllGpw()).data
    console.log('indexes', this.indexes)
    this.etfs = (await this.$backend.stock.getAllEtf()).data
    console.log('etf', this.etfs)
    this.stock = (await this.$backend.stock.getAllStock()).data
    console.log('stock', this.stock)
  },
  methods: {
    getColor (item) {
      if (item.change.includes('-')) return 'red'
      if (item.change.includes('0.0000')) return 'black'
      else return 'green'
    }
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

.green {
  background-color: transparent !important;
  color: #43A047;
}
</style>
