<!--suppress CssUnknownTarget, CssOverwrittenProperties -->
<!--eslint-disable vue/no-parsing-error-->
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
      <InvestmentProductDetails v-if="['COMMODITY', 'CURRENCY', 'ETF_GPW', 'STOCK_GPW'].includes(productType)" />
      <DepositProductDetails v-else-if="['DEPOSIT', 'TIME_DEPOSIT'].includes(productType)" :product-type="productType" />
      <RealEstateProductDetails v-else-if="productType === 'REAL_ESTATE'" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'ProductDetails',
  layout: 'parallax',
  computed: {
    productType: {
      get () { return this.getProductType() },
      set (val) { this.setProductType(val) }
    }
  },
  created () {
    this.productType = this.$route.params.type
  },
  destroyed () {
    this.resetState()
  },
  methods: {
    ...mapGetters('products/entity', ['getProductType']),
    ...mapMutations('products/entity', ['resetState', 'setProductType'])
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
