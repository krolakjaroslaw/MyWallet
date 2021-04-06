<template>
  <div>
    <div class="page-header">
      <parallax
        class="parallax"
        style="
          background: -webkit-linear-gradient(rgba(20, 75, 150, 0.6), rgba(44, 44, 44, 0.6)), url('profile.jpg') center center no-repeat; /* For Safari 5.1 to 6.0 */
          background: -o-linear-gradient(rgba(20, 75, 150, 0.6), rgba(44, 44, 44, 0.6)), url('profile.jpg') center center no-repeat; /* For Opera 11.1 to 12.0 */
          background: -moz-linear-gradient(rgba(20, 75, 150, 0.6), rgba(44, 44, 44, 0.6)), url('profile.jpg') center center no-repeat; /* For Firefox 3.6 to 15 */
          background: linear-gradient(rgba(20, 75, 150, 0.6), rgba(44, 44, 44, 0.6)), url('profile.jpg') center center no-repeat; /* Standard syntax */
          -webkit-background-size: cover;
          -moz-background-size: cover;
          -o-background-size: cover;
          background-size: cover;
        "
      />
    </div>

    <div class="section">
      <v-container>
        <v-row no-gutters>
          <v-col cols="12">
            <v-card
              class="col-12 mb-6 rounded-xl"
              style="height: 310px; background-color: #f6f6f6"
              outlined
            >
              <v-card-title class="py-2">
                Wallets
              </v-card-title>

              <v-card-text class="py-1">
                <div class="d-flex flex-row justify-space-between">
                  <v-card
                    v-for="wallet in wallets"
                    :key="wallet.id"
                    class="rounded-xl"
                    style="height: 220px; width: 250px;"
                  >
                    <v-card-title class="d-flex flex-row justify-space-between py-2 mb-2">
                      {{ wallet.name }}
                      <div>
                        <v-btn
                          icon
                          @click.stop="showEditDialog = true"
                        >
                          <v-icon>mdi-pencil</v-icon>
                        </v-btn>

                        <v-btn
                          icon
                          @click.stop="showDeleteDialog = true"
                        >
                          <v-icon>mdi-trash-can</v-icon>
                        </v-btn>
                      </div>
                    </v-card-title>
                    <v-card-text>
                      <span class="bold green">${{ wallet.sum }}</span>
                    </v-card-text>
                  </v-card>
                  <div
                    class="d-flex justify-center align-center"
                    style="height: 220px; width: 250px;"
                  >
                    <v-btn
                      fab
                      x-large
                      color="primary"
                      @click.stop="showAddDialog = true"
                    >
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col cols="12">
            <v-card
              class="col-12 mb-6 rounded-xl"
              style="height: 310px; background-color: #f6f6f6"
              outlined
              disabled
            >
              <v-card-title class="py-2">
                Master wallets
              </v-card-title>

              <v-card-text class="py-1">
                <div class="d-flex flex-row justify-space-between">
                  <v-card
                    v-for="wallet in wallets"
                    :key="wallet.id"
                    class="rounded-xl"
                    style="height: 220px; width: 250px;"
                  >
                    <v-card-title class="d-flex flex-row justify-space-between py-2 mb-2" style="background-color: #144b96; color: white">
                      {{ wallet.name }}
                      <div>
                        <v-btn icon>
                          <v-icon color="white">
                            mdi-pencil
                          </v-icon>
                        </v-btn>
                        <v-btn icon>
                          <v-icon color="white">
                            mdi-trash-can
                          </v-icon>
                        </v-btn>
                      </div>
                    </v-card-title>
                    <v-card-text>
                      <span class="bold green">${{ wallet.sum }}</span>
                    </v-card-text>
                  </v-card>
                  <div
                    class="d-flex justify-center align-center"
                    style="height: 220px; width: 250px;"
                  >
                    <v-btn
                      color="primary"
                      x-large
                      fab
                    >
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <v-dialog
      v-model="showAddDialog"
      width="500"
      persistent
    >
      <v-card class="rounded-xl">
        <v-card-title class="headline">
          Add new wallet
        </v-card-title>

        <v-card-text>
          <v-text-field
            label="Name"
            class="mt-4"
            type="text"
            value="Wallet"
            outlined
            rounded
            dense
          />

          <v-select
            v-model="currency"
            :items="currencies"
            item-text="label"
            item-value="name"
            class="select"
            dense
            rounded
            outlined
            return-object
          />
        </v-card-text>

        <v-card-actions>
          <v-spacer />

          <v-btn
            color="primary"
            text
            rounded
            @click="showAddDialog = false"
          >
            Cancel
          </v-btn>

          <v-btn
            color="primary"
            rounded
            depressed
            @click="showAddDialog = false"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="showEditDialog"
      width="500"
      persistent
    >
      <v-card class="rounded-xl">
        <v-card-title class="headline">
          Change wallet name
        </v-card-title>

        <v-card-text>
          <v-text-field
            label="Name"
            class="mt-4"
            type="text"
            value="Wallet"
            outlined
            rounded
            dense
          />
        </v-card-text>

        <v-card-actions>
          <v-spacer />

          <v-btn
            color="primary"
            text
            rounded
            @click="showEditDialog = false"
          >
            Cancel
          </v-btn>

          <v-btn
            color="primary"
            rounded
            depressed
            @click="showEditDialog = false"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>

      <v-dialog
        v-model="showDeleteDialog"
        width="500"
        persistent
      >
        <v-card class="rounded-xl">
          <v-card-title class="headline">
            Remove wallet
          </v-card-title>

          <v-card-text>
            Do you really want to remove wallet?
          </v-card-text>

          <v-card-actions>
            <v-spacer />

            <v-btn
              color="primary"
              text
              rounded
              @click="showDeleteDialog = false"
            >
              Cancel
            </v-btn>

            <v-btn
              color="primary"
              rounded
              depressed
              @click="showDeleteDialog = false"
            >
              Remove
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'Wallets',
  layout: 'parallax',
  data () {
    return {
      showAddDialog: false,
      showDeleteDialog: false,
      showEditDialog: false,
      currency: 'PLN',
      currencies: [
        { name: 'CHF', label: 'CHF - frank szwajcarski' },
        { name: 'EUR', label: 'EUR - euro' },
        { name: 'GBP', label: 'GBP - funt brytyjski' },
        { name: 'JPY', label: 'JPY - jen japoński' },
        { name: 'PLN', label: 'PLN - złoty polski' },
        { name: 'USD', label: 'USD - dolar amerykański' }
      ],
      wallets: [
        {
          name: 'Wallet 1',
          sum: 100000.00,
          currencies: 45000.00,
          resources: 20000.00,
          stock: 35000.00
        },
        {
          name: 'Wallet 2',
          sum: 100000.00,
          currencies: 45000.00,
          resources: 20000.00,
          stock: 35000.00
        },
        {
          name: 'Wallet 3',
          sum: 100000.00,
          currencies: 45000.00,
          resources: 20000.00,
          stock: 35000.00
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.page-header {
  width: 100%;
  height: 17vh;
}

.container {
  padding-top: 0;
}

.parallax {
  width: 100%;
  height: 150px !important;
}

.title {
  font-weight: bold;
  margin: 0 auto;
}

.section {
  padding: 10px 0;
  position: relative;
}

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
