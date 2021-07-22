<template>
  <v-expansion-panel
    v-if="timeDeposits.length > 0"
    class="elevation-3"
  >
    <v-expansion-panel-header>
      <template #default>
        <v-row no-gutters>
          Lokaty
        </v-row>
      </template>
    </v-expansion-panel-header>

    <v-expansion-panel-content class="pt-4">
      <v-simple-table
        dense
        fixed-header
      >
        <template #default>
          <thead>
            <tr>
              <th class="text-center" style="width: 20%;">
                Nazwa
              </th>
              <th class="text-center" style="width: 20%;">
                Bazowa wartość
              </th>
              <th class="text-center" style="width: 20%;">
                Aktualny zysk
              </th>
              <th class="text-center" style="width: 20%;">
                Szacowany zysk
              </th>
              <th class="text-center" style="width: 20%;">
                Oprocentowanie
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in timeDeposits"
              :key="item.id"
            >
              <td class="text-center">
                <router-link :to="{ name: 'products-id', params: { id: item.id, type: item.productType } }">
                  {{ item.name }}
                </router-link>
              </td>
              <td class="text-center">
                {{ item.depositBaseAmount }}
              </td>
              <td class="text-center">
                {{ item.currentProfit }}
              </td>
              <td class="text-center">
                {{ item.estimatedProfit }}
              </td>
              <td class="text-center">
                {{ item.interestRate }}
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TimeDepositsPanel',
  computed: {
    timeDeposits () { return this.getTimeDeposits() }
  },
  methods: {
    ...mapGetters('wallets/entity', ['getTimeDeposits'])
  }
}
</script>

<style lang="scss" scoped>
.v-expansion-panel--active > .v-expansion-panel-header {
  min-height: 48px;
}

.v-expansion-panel-header {
  padding: 8px 12px;
}
</style>
