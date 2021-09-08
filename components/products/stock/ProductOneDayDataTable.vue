<template>
  <CommodityProductDataTable v-if="productType === 'COMMODITY'" />
  <IndexProductDataTable v-else-if="productType === 'INDEX_GPW'" />
  <v-simple-table
    v-else
    dense
    fixed-header
  >
    <template #default>
      <tbody>
        <tr>
          <th class="text-left px-2">
            Kurs odniesienia:
          </th>
          <td class="px-2">
            {{ parseFloat(profileData.quoteOpen).toFixed(4) }} zł
          </td>
        </tr>
        <tr>
          <th class="text-left px-2">
            Oferta kupna:
          </th>
          <td class="px-2">
            {{ parseFloat(profileData.bidSize).toFixed(4) }} zł
          </td>
        </tr>
        <tr>
          <th class="text-left px-2">
            Oferta sprzedaży:
          </th>
          <td class="px-2">
            {{ parseFloat(profileData.askSize).toFixed(4) }} zł
          </td>
        </tr>
        <tr>
          <th class="text-left px-2">
            Minimum:
          </th>
          <td class="px-2">
            {{ parseFloat(profileData.quoteMin).toFixed(4) }} zł
          </td>
        </tr>
        <tr>
          <th class="text-left px-2">
            Maksimum:
          </th>
          <td class="px-2">
            {{ parseFloat(profileData.quoteMax).toFixed(4) }} zł
          </td>
        </tr>
        <tr>
          <th class="text-left px-2">
            Wolumen obrotu:
          </th>
          <td class="px-2">
            {{ profileData.volume }} szt
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import CommodityProductDataTable from '@/components/products/stock/CommodityProductDataTable'
import IndexProductDataTable from '@/components/products/stock/IndexProductDataTable'
import { mapGetters } from 'vuex'

export default {
  name: 'ProductOneDayDataTable',
  components: { CommodityProductDataTable, IndexProductDataTable },
  props: {
    productType: {
      type: String,
      required: true
    }
  },
  computed: {
    profileData () { return this.getProfileData() }
  },
  methods: {
    ...mapGetters('products/stock', ['getProfileData'])
  }
}
</script>
