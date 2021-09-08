<template>
  <v-card
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
            <th class="px-2 text-left">Wartość transakcji:</th>
            <td class="px-2 text-right">{{ purchaseValuation }} zł</td>
          </tr>
          <tr>
            <th class="px-2 text-left">Aktualna wartość:</th>
            <td class="px-2 text-right">{{ currentValuation }} zł</td>
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
    <v-card-actions class="d-flex justify-center">
      <v-btn
        color="primary"
        rounded
        @click="showChangeValueDialog = true"
      >
        Zmień wartość
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'

export default {
  name: 'RealEstateDataTable',
  computed: {
    ...mapState('products/entity', ['currentValuation', 'name', 'profit', 'purchaseValuation', 'rateOfReturn']),
    showChangeValueDialog: {
      get () { return this.getShowChangeValueDialog() },
      set (val) { this.setShowChangeValueDialog(val) }
    }
  },
  methods: {
    ...mapGetters('products/entity', ['getShowChangeValueDialog']),
    ...mapMutations('products/entity', ['setShowChangeValueDialog'])
  }
}
</script>
