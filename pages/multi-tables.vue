<template>
  <div>
    <v-tabs
      v-model="tab"
      background-color="default"
      style="width: 350px;"
      center-active
    >
      <v-tab key="currency">
        Waluty
      </v-tab>
      <v-tab key="resource">
        Surowce
      </v-tab>
      <v-tab key="gas">
        Ceny paliw
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item key="currency">
        <v-data-table
          dense
          calculate-widths
          hide-default-header
          hide-default-footer
          :loading="tables[0].length === 0"
          loading-text="Loading items..."
          :headers="headers"
          :items="tables[0]"
          item-key="name"
          class="elevation-1 my-2"
          style="width: 350px;"
          :footer-props="{
            showCurrentPage: false,
            showFirstLastPage: false,
            itemsPerPageOptions: [5]
          }"
        >
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
            <span class="bold" :class="getColor(item)">{{ item.rate }}</span>
          </template>
          <template #[`item.change`]="{ item }">
            <span :class="getColor(item)">{{ item.change }}</span>
          </template>
        </v-data-table>
      </v-tab-item>
      <v-tab-item key="resource">
        <v-data-table
          dense
          calculate-widths
          hide-default-header
          hide-default-footer
          :loading="tables[1].length === 0"
          loading-text="Loading items..."
          :headers="headers"
          :items="tables[1]"
          item-key="name"
          class="elevation-1 my-2"
          style="width: 350px;"
          :footer-props="{
            howCurrentPage: false,
            showFirstLastPage: false,
            itemsPerPageOptions: [5]
          }"
        >
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
            <span class="bold" :class="getColor(item)">{{ item.rate }}</span>
          </template>
          <template #[`item.change`]="{ item }">
            <span :class="getColor(item)">{{ item.change }}</span>
          </template>
        </v-data-table>
      </v-tab-item>
      <v-tab-item key="gas">
        <v-data-table
          dense
          calculate-widths
          hide-default-header
          hide-default-footer
          :loading="tables[2].length === 0"
          loading-text="Loading items..."
          :headers="headers"
          :items="tables[2]"
          item-key="name"
          class="elevation-1 my-2"
          style="width: 350px;"
          :footer-props="{
            showCurrentPage: false,
            showFirstLastPage: false,
            itemsPerPageOptions: [5]
          }"
        >
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
            <span class="bold" :class="getColor(item)">{{ item.rate }}</span>
          </template>
          <template #[`item.change`]="{ item }">
            <span :class="getColor(item)">{{ item.change }}</span>
          </template>
        </v-data-table>
      </v-tab-item>
    </v-tabs-items>
    <br />
    <br />
    <br />
    <v-carousel
      cycle
      light
      height="250"
      interval="3000"
      style="width: 350px;"
      hide-delimiter-background
      show-arrows-on-hover
    >
      <v-carousel-item
        v-for="(table, i) in tables"
        :key="i"
      >
        <v-sheet
          height="100%"
        >
          <v-row
            class="fill-height"
            align="center"
            justify="center"
          >
            <div class="display-3">
              <v-data-table
                dense
                calculate-widths
                hide-default-header
                hide-default-footer
                :loading="tables[i].length === 0"
                loading-text="Loading items..."
                :headers="headers"
                :items="tables[i]"
                item-key="name"
                class="elevation-1 my-2"
                style="width: 350px;"
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
                  <span class="bold" :class="getColor(item)">{{ item.rate }}</span>
                </template>
                <template #[`item.change`]="{ item }">
                  <span :class="getColor(item)">{{ item.change }}</span>
                </template>
              </v-data-table>
            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
    <br />
    <br />
    <br />
    <v-expansion-panels style="width: 350px;">
      <v-expansion-panel
        v-for="(wallet, index) in wallets"
        :key="index"
      >
        <v-expansion-panel-header>
          <template>
            <v-row no-gutters>
              {{ wallet.name }}
            </v-row>
          </template>
        </v-expansion-panel-header>

        <v-expansion-panel-content>
          <span class="font-weight-bold">Sum: ${{ wallet.sum }}</span><br>
          <span>Currencies: ${{ wallet.currencies }}</span><br>
          <span>Resources: ${{ wallet.resources }}</span><br>
          <span>Stock: ${{ wallet.stock }}</span><br>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tab: null,
      titles: [
        'WALUTY', 'SUROWCE', 'CENY PALIW'
      ],
      tables: [
        [
          {
            name: 'EUR',
            rate: 4.6226.toFixed(4),
            change: '0.0000 (0.00%)'
          },
          {
            name: 'USD',
            rate: 3.8865.toFixed(4),
            change: '0.0159 (0.41%)'
          },
          {
            name: 'CHF',
            rate: 4.182.toFixed(4),
            change: '-0.0017 (-0.04%)'
          },
          {
            name: 'GBP',
            rate: 5.4116.toFixed(4),
            change: '0.0076 (0.14%)'
          },
          {
            name: 'JPY',
            rate: 3.5707.toFixed(4),
            change: '0.0207 (0.58%)'
          }
        ],
        [
          {
            name: 'ROPA',
            rate: 64.55.toFixed(2),
            change: '1.63 (2.59%)'
          },
          {
            name: 'ZŁOTO',
            rate: 1743.9.toFixed(2),
            change: '10.10 (0.58%)'
          },
          {
            name: 'SREBRO',
            rate: 26.33.toFixed(2),
            change: '0.24 (0.92%)'
          },
          {
            name: 'PLATYNA',
            rate: 1196.1.toFixed(2),
            change: '-10.00 (-0.83%)'
          },
          {
            name: 'MIEDŹ',
            rate: 9064.25.toFixed(2),
            change: '68.25 (0.76%)'
          }
        ],
        [
          {
            name: 'Euro 95',
            rate: '5.20 zł',
            change: '-0.12 zł'
          },
          {
            name: 'Superplus 98',
            rate: '5.38 zł',
            change: '-0.11 zł'
          },
          {
            name: 'Olej napędowy',
            rate: '5.20 zł',
            change: '-0.12 zł'
          },
          {
            name: 'LPG',
            rate: '2.60 zł',
            change: '-0.07 zł'
          }
        ]
      ],
      wallets: [
        {
          name: 'Wallet 1',
          sum: 100_000.00,
          currencies: 45_000.00,
          resources: 20_000.00,
          stock: 35_000.00
        },
        {
          name: 'Wallet 2',
          sum: 100_000.00,
          currencies: 45_000.00,
          resources: 20_000.00,
          stock: 35_000.00
        },
        {
          name: 'Wallet 3',
          sum: 100_000.00,
          currencies: 45_000.00,
          resources: 20_000.00,
          stock: 35_000.00
        }
      ]
    }
  },
  computed: {
    headers () {
      return [
        { text: 'Walor', value: 'name', align: 'start' },
        { text: 'Kurs', value: 'rate', align: 'right' },
        { text: 'Zmiana', value: 'change', align: 'right' }
      ]
    }
  },
  methods: {
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
