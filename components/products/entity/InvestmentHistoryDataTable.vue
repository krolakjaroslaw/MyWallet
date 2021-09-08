<!--suppress JSUnresolvedVariable -->
<template>
  <v-card
    class="rounded-xl"
    elevation="0"
  >
    <v-card-title class="d-flex flex-column">
      Historia transakcji
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
              <th class="text-left">Data</th>
              <th class="text-center">Operacja</th>
              <th class="text-right">Liczba jednostek</th>
              <th class="text-right">Cena jednostki</th>
              <th class="text-right">Prowizja</th>
              <th class="text-right">Całkowita wartość</th>
              <th class="text-right">Komentarz</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in purchaseHistory"
              :key="item.id"
            >
              <th class="text-left">{{ item.transactionDate }}</th>
              <td class="text-center">{{ parseInt(item.numberOfUnits) >= 0 ? 'kupno' : 'sprzedaż' }}</td>
              <td class="text-right">{{ Math.abs(item.numberOfUnits) }}</td>
              <td class="text-right">{{ item.unitPriceAtTransactionTime }} zł</td>
              <td class="text-right">{{ item.commissionValue }} zł</td>
              <td class="text-right">{{ item.totalPurchaseValueWithCommission }} zł</td>
              <td class="text-right">{{ item.comment }}</td>
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
  name: 'InvestmentHistoryDataTable',
  computed: {
    ...mapState('products/entity', ['purchaseHistory'])
  }
}
</script>
