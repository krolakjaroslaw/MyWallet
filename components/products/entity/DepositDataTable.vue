<!--suppress JSUnresolvedVariable -->
<template>
  <v-card
    v-if="productType === 'TIME_DEPOSIT'"
    class="rounded-xl"
    elevation="0"
    style="min-width: 300px; max-width: 300px;"
  >
    <v-card-title class="d-flex flex-column mb-15">
      {{ name }}
      <v-divider style="background-color: #144b96; width: 100%;" />
    </v-card-title>
    <v-card-text>
      <v-simple-table
        dense
        fixed-header
      >
        <template #default>
          <tbody>
          <tr>
            <th class="px-2 text-left">Kwota bazowa:</th>
            <td class="px-2 text-right">{{ depositBaseAmount.toFixed(2) }}</td>
          </tr>
          <tr>
            <th class="px-2 text-left">Aktualny zysk:</th>
            <td class="px-2 text-right">{{ currentProfit.toFixed(2) }}</td>
          </tr>
          <tr>
            <th class="px-2 text-left">Przewidywany zysk:</th>
            <td class="px-2 text-right">{{ estimatedProfit.toFixed(2) }}</td>
          </tr>
          <tr>
            <th class="px-2 text-left">Oprocentowanie:</th>
            <td class="px-2 text-right">{{ interestRate.toFixed(2) }}</td>
          </tr>
          <tr>
            <th class="px-2 text-left">Rozpoczęcie:</th>
            <td class="px-2 text-right">{{ startTime }}</td>
          </tr>
          <tr>
            <th class="px-2 text-left">Okres:</th>
            <td class="px-2 text-right">{{ investmentTermTimeCount }} {{ investmentTermTime }}</td>
          </tr>
          <tr>
            <th class="px-2 text-left">Kapitalizacja:</th>
            <td class="px-2 text-right">{{ capitalization }}</td>
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
  name: 'DepositDataTable',
  computed: {
    ...mapState('products/entity', [
      'capitalization',
      'currentProfit',
      'depositBaseAmount',
      'estimatedProfit',
      'interestRate',
      'investmentTermTime',
      'investmentTermTimeCount',
      'name',
      'productType',
      'startTime'
    ])
  }
}
</script>
