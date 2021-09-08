<template>
  <v-card
    class="rounded-xl"
    elevation="0"
    style="min-width: 350px; max-width: 350px;"
  >
    <v-card-title class="d-flex flex-column mb-15">
      {{ symbolLong }}
      <v-divider style="background-color: #144b96; width: 100%;" />
    </v-card-title>
    <v-card-text>
      <ProductOneDayDataTable v-if="today" :product-type="productType" />
      <ProductOverOneDayDataTable v-else />
    </v-card-text>
  </v-card>
</template>

<script>
import ProductOneDayDataTable from '@/components/products/stock/ProductOneDayDataTable'
import ProductOverOneDayDataTable from '@/components/products/stock/ProductOverOneDayDataTable'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'ProductDataTable',
  components: { ProductOneDayDataTable, ProductOverOneDayDataTable },
  data () {
    return {
      productType: null
    }
  },
  computed: {
    symbolLong: {
      get () { return this.getSymbolLong() },
      set (val) { this.setSymbolLong(val) }
    },
    today: {
      get () { return this.getIsToday() },
      set (val) { this.setIsToday(val) }
    }
  },
  created () {
    const localParams = JSON.parse(localStorage.getItem('params'))
    this.productType = localParams.type
  },
  methods: {
    ...mapGetters('products/stock', ['getIsToday', 'getSymbolLong']),
    ...mapMutations('products/stock', ['setIsToday', 'setSymbolLong'])
  }
}
</script>
