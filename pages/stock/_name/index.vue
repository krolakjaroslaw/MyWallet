<!--suppress CssUnknownTarget, CssOverwrittenProperties, JSUnresolvedVariable -->
<template>
  <div>
    <div class="page-header">
      <parallax
        class="parallax"
        style="
          background: -webkit-linear-gradient(rgba(20, 75, 150, 0.6), rgba(44, 44, 44, 0.6)), url('../profile.jpg') center center no-repeat; /* For Safari 5.1 to 6.0 */
          background: -o-linear-gradient(rgba(20, 75, 150, 0.6), rgba(44, 44, 44, 0.6)), url('../profile.jpg') center center no-repeat; /* For Opera 11.1 to 12.0 */
          background: -moz-linear-gradient(rgba(20, 75, 150, 0.6), rgba(44, 44, 44, 0.6)), url('../profile.jpg') center center no-repeat; /* For Firefox 3.6 to 15 */
          background: linear-gradient(rgba(20, 75, 150, 0.6), rgba(44, 44, 44, 0.6)), url('../profile.jpg') center center no-repeat; /* Standard syntax */
          -webkit-background-size: cover;
          -moz-background-size: cover;
          -o-background-size: cover;
          background-size: cover;
        "
      />
    </div>

    <div class="section">
      <v-container>
        <v-card
          class="col-12 mb-6 rounded-xl d-flex flex-row"
          style="height: 525px; background-color: #f6f6f6;"
          outlined
        >
          <ProductDataTable />
          <ChartComponent />
        </v-card>
      </v-container>
    </div>
  </div>
</template>

<script>
import ChartComponent from '@/components/products/stock/ChartComponent'
import ProductDataTable from '@/components/products/stock/ProductDataTable'
import { mapMutations } from 'vuex'

export default {
  name: 'ProductDetails',
  components: { ChartComponent, ProductDataTable },
  layout: 'parallax',
  created () {
    const params = {
      name: this.$route.params.name,
      symbol: this.$route.params.symbol,
      type: this.$route.params.type
    }
    if (!localStorage.getItem('params')) localStorage.setItem('params', JSON.stringify(params))
  },
  destroyed () {
    this.resetState()
    localStorage.removeItem('params')
  },
  methods: {
    ...mapMutations('products/stock', ['resetState'])
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
