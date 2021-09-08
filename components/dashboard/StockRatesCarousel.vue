<!--suppress JSUnresolvedVariable -->
<template>
  <v-card
    class="mb-6 rounded-xl"
    style="height: 300px; background-color: #f6f6f6"
    outlined
  >
    <v-card-title class="py-2">
      Kursy
    </v-card-title>

    <v-card-text class="d-flex justify-center py-1">
      <v-carousel
        cycle
        light
        height="240"
        interval="3000"
        style="width: 500px;"
        hide-delimiter-background
        show-arrows-on-hover
      >
        <v-carousel-item
          v-for="(table, i) in tables"
          :key="i"
          justify="center"
        >
          <div class="display-1">
            <v-data-table
              dense
              calculate-widths
              hide-default-header
              hide-default-footer
              loading-text="Loading items..."
              :headers="headers"
              :items="tables[i]"
              item-key="name"
              class="elevation-3 rounded-lg"
              style="width: 500px;"
              :footer-props="{
                howCurrentPage: false,
                showFirstLastPage: false,
                itemsPerPageOptions: [5]
              }"
            >
              <template #header="{ props: { headers } }">
                <thead>
                <tr>
                  <th :colspan="headers.length">
                    {{ titles[i] }}
                  </th>
                </tr>
                </thead>
              </template>
              <template #[`item.name`]="{ item }">
                <v-icon v-if="item.change.includes('0.0000')">
                  mdi-equal
                </v-icon>
                <v-icon v-else :color="getColor(item)">
                  {{ item.change.includes('-') ? 'mdi-menu-down' : 'mdi-menu-up' }}
                </v-icon>
                <span class="bold">{{ item.name }}</span>
              </template>
              <template #[`item.rate`]="{ item }">
                <span class="bold" :class="getColor(item)">{{ item.value }}</span>
              </template>
              <template #[`item.change`]="{ item }">
                <span :class="getColor(item)">{{ item.change }}</span>
              </template>
            </v-data-table>
          </div>
        </v-carousel-item>
      </v-carousel>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  name: 'StockRatesCarousel',
  computed: {
    ...mapState('dashboard', ['headers', 'tables', 'titles'])
  },
  created () {
    this.loadRates()
  },
  destroyed () {
    this.resetState()
  },
  methods: {
    ...mapActions('dashboard', ['loadRates']),
    ...mapMutations('dashboard', ['resetState']),
    getColor (item) {
      if (item.change.includes('-')) return 'red'
      if (item.change.includes('0.0000')) return 'black'
      else return 'green'
    }
  }
}
</script>

<style lang="scss" scoped>
.bold {
  font-weight: bold;
}
.red {
  background-color: transparent !important;
  color: #C62828;
}
.green {
  background-color: transparent !important;
  color: #43A047;
}
.black {
  background-color: transparent !important;
}
</style>
