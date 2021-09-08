<!--suppress JSUnresolvedVariable -->
<template>
  <v-card
    v-if="productType !== 'TIME_DEPOSIT'"
    class="rounded-xl"
    elevation="0"
  >
    <v-card-title class="d-flex flex-column">
      Historia wartości
      <v-divider style="background-color: #144b96; width: 100%;" />
    </v-card-title>
    <v-card-text>
      <v-simple-table
        dense
        fixed-header
      >
        <template #default>
          <thead>
          <tr>
            <th class="text-left">
              Data
            </th>
            <th class="text-right">
              Wartość
            </th>
          </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in purchaseHistory"
              :key="item.historyId"
            >
              <th class="text-left">
                {{ productType === 'REAL_ESTATE' ? item.valuationDate : item.balanceChangeDate }}
              </th>
              <td class="text-right">
                {{ productType === 'REAL_ESTATE' ? item.valuation + ' zł' : item.balance + ' zł' }}
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'HistoryDataTable',
  computed: {
    ...mapState('products/entity', ['productType', 'purchaseHistory'])
  }
}
</script>

<style scoped>

</style>
