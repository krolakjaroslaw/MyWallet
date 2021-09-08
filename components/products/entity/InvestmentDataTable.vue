<template>
  <v-card
    class="rounded-xl"
    elevation="0"
    style="min-width: 300px; max-width: 300px;"
  >
    <v-card-title class="d-flex flex-column mb-15">
      {{ symbolLong }}
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
            <th class="px-2 text-left">Średnia wartość transakcji:</th>
            <td class="px-2 text-right">{{ averagePurchaseValue }} zł</td>
          </tr>
          <tr>
            <th class="px-2 text-left">Aktualna wartość transakcji:</th>
            <td class="px-2 text-right">{{ currentPurchaseValue }} zł</td>
          </tr>
          <tr>
            <th class="px-2 text-left">Aktualna cena jednostki:</th>
            <td class="px-2 text-right">{{ currentUnitPrice }} zł</td>
          </tr>
          <tr>
            <th class="px-2 text-left">Liczba jednostek:</th>
            <td class="px-2 text-right">{{ numberOfUnits }}</td>
          </tr>
          <tr>
            <th class="px-2 text-left">Zysk:</th>
            <td class="px-2 text-right">{{ profit }} zł</td>
          </tr>
          <tr>
            <th class="px-2 text-left">Stopa zwrotu:</th>
            <td class="px-2 text-right">{{ rateOfReturn }}</td>
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
  name: 'InvestmentDataTable',
  computed: {
    ...mapState('products/entity', [
      'averagePurchaseValue',
      'currentPurchaseValue',
      'currentUnitPrice',
      'numberOfUnits',
      'profit',
      'rateOfReturn',
      'symbolLong'
    ])
  }
}
</script>
