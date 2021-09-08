<template>
  <v-expansion-panel
    v-if="realEstates.length > 0"
    class="elevation-3"
  >
    <v-expansion-panel-header>
      <template #default>
        <v-row no-gutters>
          Nieruchomości
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
                Waluta
              </th>
              <th class="text-center" style="width: 20%;">
                Wartość
              </th>
              <th class="text-center" style="width: 20%;">
                Zysk
              </th>
              <th class="text-center" style="width: 20%;">
                Stopa zwrotu
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in realEstates"
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
                {{ item.currentValuation }}
              </td>
              <td class="text-center">
                {{ item.profit }}
              </td>
              <td class="text-center">
                {{ item.rateOfReturn }}
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
  name: 'RealEstatesPanel',
  computed: {
    realEstates () { return this.getRealEstates() }
  },
  methods: {
    ...mapGetters('wallets/entity', ['getRealEstates'])
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
