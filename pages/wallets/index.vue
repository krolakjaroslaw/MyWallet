<!--suppress CssOverwrittenProperties, CssUnknownTarget -->
<template>
  <div>
    <div class="page-header">
      <!--TODO: move to separate component-->
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

    <!--TODO: modularity-->
    <div class="section">
      <v-container>
        <v-card
          class="col-12 mb-6 rounded-xl"
          style="height: 600px; background-color: #f6f6f6"
          outlined
        >
          <v-card-title class="py-2">
            Wallets
          </v-card-title>
          <v-card-text class="py-1">
            <div class="d-flex flex-row flex-wrap justify-space-between">
              <v-card
                v-for="wallet in wallets"
                :key="wallet.id"
                class="rounded-xl my-5"
                style="height: 220px; width: 350px;"
              >
                <v-card-title
                  class="d-flex flex-row justify-space-between py-2 mb-2"
                  style="background-color: #144b96; color: white"
                >
                  <v-btn
                    label="Name"
                    type="text"
                    color="transparent"
                    elevation="0"
                    dark
                    dense
                    @click="showWallet(wallet)"
                  >
                    {{ wallet.name }}
                  </v-btn>
                  <div>
                    <v-btn
                      icon
                      @click.stop="editDialog(wallet)"
                    >
                      <v-icon color="white">
                        mdi-pencil
                      </v-icon>
                    </v-btn>
                    <v-btn
                      icon
                      @click.stop="deleteDialog(wallet)"
                    >
                      <v-icon color="white">
                        mdi-trash-can
                      </v-icon>
                    </v-btn>
                  </div>
                </v-card-title>
                <!--TODO: currency & data-->
                <v-card-text>
                  <v-row>
                    <v-col class="pb-0" cols="5">
                      <span class="font-weight-bold">Sum:</span>
                    </v-col>
                    <v-col class="pb-0 text-right" cols="4">
                      <span class="font-weight-bold">${{ wallet.sum }}</span>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="py-0" cols="5">
                      <span>Deposits:</span>
                    </v-col>
                    <v-col class="py-0 text-right" cols="4">
                      <span>${{ wallet.currencies }}</span>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="py-0" cols="5">
                      <span>Investments:</span>
                    </v-col>
                    <v-col class="py-0 text-right" cols="4">
                      <span>${{ wallet.currencies }}</span>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="py-0" cols="5">
                      <span>Real estates:</span>
                    </v-col>
                    <v-col class="py-0 text-right" cols="4">
                      <span>${{ wallet.currencies }}</span>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="py-0" cols="5">
                      <span>TIme deposits:</span>
                    </v-col>
                    <v-col class="py-0 text-right" cols="4">
                      <span>${{ wallet.currencies }}</span>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12 text-right">
                      <v-btn
                        icon
                        small
                        @click="$router.push({ name: 'buy-product', params: { id: wallet.id } })"
                      >
                        <v-icon color="primary">
                          mdi-database-plus
                        </v-icon>
                      </v-btn>
                      <v-btn
                        icon
                        small
                        @click="$router.push({ name: 'sell-product', params: { id: wallet.id } })"
                      >
                        <v-icon color="primary">
                          mdi-database-minus
                        </v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
              <v-tooltip
                bottom
                :disabled="wallets.length < 5"
              >
                <template #activator="{ on }">
                  <div
                    class="d-flex justify-center align-center"
                    style="height: 220px; width: 350px;"
                    v-on="on"
                  >
                    <v-btn
                      fab
                      x-large
                      color="primary"
                      :disabled="wallets.length === 5"
                      @click.stop="showAddDialog = true"
                    >
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </div>
                </template>
                <span>You have reached maximum number of wallets</span>
              </v-tooltip>
            </div>
          </v-card-text>
        </v-card>
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
            v-model="name"
            label="Name"
            class="mt-4"
            type="text"
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
            outlined
            @click="closeDialog"
          >
            Cancel
          </v-btn>

          <v-btn
            color="primary"
            rounded
            depressed
            @click="addNewWallet"
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
            v-model="name"
            label="Name"
            class="mt-4"
            type="text"
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
            outlined
            @click="closeDialog"
          >
            Cancel
          </v-btn>

          <v-btn
            color="primary"
            rounded
            depressed
            @click="editWalletName"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
            outlined
            @click="closeDialog"
          >
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            rounded
            depressed
            @click="removeWallet"
          >
            Remove
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Wallets',
  layout: 'parallax',
  data () {
    return {
      selectedItem: null,
      currencies: [
        { name: 'CHF', label: 'CHF - frank szwajcarski' },
        { name: 'EUR', label: 'EUR - euro' },
        { name: 'GBP', label: 'GBP - funt brytyjski' },
        { name: 'JPY', label: 'JPY - jen japoński' },
        { name: 'PLN', label: 'PLN - złoty polski' },
        { name: 'USD', label: 'USD - dolar amerykański' }
      ]
    }
  },
  computed: {
    name: {
      get () { return this.getName() },
      set (val) { this.setName(val) }
    },
    currency: {
      get () { return this.getCurrency() },
      set (val) { this.setCurrency(val) }
    },
    showAddDialog: {
      get () { return this.getAddWalletDialog() },
      set (val) { this.setAddWalletDialog(val) }
    },
    showDeleteDialog: {
      get () { return this.getDeleteWalletDialog() },
      set (val) { this.setDeleteWalletDialog(val) }
    },
    showEditDialog: {
      get () { return this.getEditWalletDialog() },
      set (val) { this.setEditWalletDialog(val) }
    },
    wallets () { return this.getWallets() }
  },
  created () {
    this.loadWallets()
  },
  destroyed () {
    this.resetState()
  },
  methods: {
    ...mapActions('wallets', ['createWallet', 'deleteWallet', 'getWalletInfo', 'loadWallets', 'updateWalletName']),
    ...mapGetters('wallets', ['getAddWalletDialog', 'getDeleteWalletDialog', 'getEditWalletDialog',
      'getCurrency', 'getName', 'getWallets']),
    ...mapMutations('wallets', ['resetState', 'setAddWalletDialog', 'setDeleteWalletDialog', 'setEditWalletDialog',
      'setCurrency', 'setName']),

    addNewWallet () {
      this.createWallet()
    },

    editWalletName () {
      this.updateWalletName(this.selectedItem.id)
    },

    removeWallet () {
      this.deleteWallet(this.selectedItem.id)
    },

    closeDialog () {
      this.resetState()
      this.showAddDialog = false
      this.showDeleteDialog = false
      this.showEditDialog = false
    },

    deleteDialog (wallet) {
      this.showDeleteDialog = true
      this.selectedItem = wallet
    },

    editDialog (wallet) {
      this.showEditDialog = true
      this.selectedItem = wallet
      this.name = this.selectedItem.name
      this.currency = this.selectedItem.currency
    },

    showWallet (wallet) {
      this.$router.push({ name: 'wallets-id', params: { id: wallet.id } })
    }
  }
}
</script>

<style lang="scss" scoped>
.page-header {
  width: 100%;
  height: 17vh;
}

.parallax {
  width: 100%;
  height: 150px !important;
}

.section {
  padding: 10px 0;
  position: relative;
}

.bold {
  font-weight: bold;
}

.green {
  background-color: transparent !important;
  color: #43A047;
}
</style>
