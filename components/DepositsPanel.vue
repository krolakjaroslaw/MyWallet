<template>
  <v-expansion-panel
    v-if="deposits.length > 0"
    class="elevation-3"
  >
    <v-expansion-panel-header>
      <template #default>
        <v-row no-gutters>
          Konta bankowe
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
              <th class="text-center" style="width: 33%;">
                Nazwa
              </th>
              <th class="text-center" style="width: 33%;">
                Waluta
              </th>
              <th class="text-center" style="width: 33%;">
                Stan konta
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in deposits"
              :key="item.id"
            >
              <td class="text-center">
                <router-link :to="{ name: 'products-id', params: { id: item.id, type: item.productType } }">
                  {{ item.name }}
                </router-link>
              </td>
              <td class="text-center">
                {{ item.currency }}
              </td>
              <td class="text-center">
                {{ item.value }}
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
  name: 'DepositsPanel',
  computed: {
    deposits () { return this.getDeposits() }
  },
  methods: {
    ...mapGetters('wallets/entity', ['getDeposits'])
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
