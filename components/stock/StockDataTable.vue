4<!--suppress JSUnresolvedVariable -->
<template>
  <v-data-table
    dense
    calculate-widths
    :hide-default-footer="items.length <= 20"
    :loading="items.length === 0"
    loading-text="Wczytywanie danych..."
    :headers="headers"
    :items="items"
    :search="search"
    item-key="symbol"
    class="elevation-0 my-2"
    :footer-props="{
      showCurrentPage: items.length > 20,
      showFirstLastPage: items.length > 20,
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
      <router-link
        v-if="['COMMODITY', 'ETF_GPW', 'STOCK_GPW'].includes(productType)"
        :to="{ name: 'stock-name', params: { name: item.symbol, symbol: item.symbolShort, type: productType } }"
      >
        <b>{{ item.symbol }}</b>
      </router-link>
      <b v-else-if="productType === 'CURRENCY'">
        {{ item.symbol }}
      </b>
      <router-link
        v-else
        :to="{ name: 'stock-name', params: { name: item.symbol, type: 'INDEX_GPW' } }"
      >
        <b>{{ item.symbol }}</b>
      </router-link>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: 'StockDataTable',
  props: {
    headers: {
      type: Array,
      default: () => []
    },
    items: {
      type: Array,
      default: () => []
    },
    productType: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      search: ''
    }
  }
}
</script>
