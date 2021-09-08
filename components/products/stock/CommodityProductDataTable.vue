<template>
  <v-simple-table
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
            {{ parseFloat(profileData.openBidPrice).toFixed(4) }} zł
          </td>
        </tr>
        <tr>
          <th class="text-left px-2">
            Oferta kupna:
          </th>
          <td class="px-2">
            {{ parseFloat(profileData.bidPrice).toFixed(4) }} zł
          </td>
        </tr>
        <tr>
          <th class="text-left px-2">
            Oferta sprzedaży:
          </th>
          <td class="px-2">
            {{ parseFloat(profileData.askPrice).toFixed(4) }} zł
          </td>
        </tr>
        <tr>
          <th class="text-left px-2">
            Minimum:
          </th>
          <td class="px-2">
            {{ parseFloat(profileData.lowBidPrice).toFixed(4) }} zł
          </td>
        </tr>
        <tr>
          <th class="text-left px-2">
            Maksimum:
          </th>
          <td class="px-2">
            {{ parseFloat(profileData.highBidPrice).toFixed(4) }} zł
          </td>
        </tr>
        <tr>
          <th class="text-left px-2">
            Zmiana:
          </th>
          <td class="px-2">
            {{ profileData.bidDayChange }} zł
            <span style="color: gray; font-size: small;"> ({{ profileData.bidDatChangePercentage }})</span>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CommodityProductDataTable',
  computed: {
    profileData () { return this.getProfileData() }
  },
  methods: {
    ...mapGetters('products/stock', ['getProfileData'])
  }
}
</script>
