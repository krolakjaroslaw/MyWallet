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
            Portfele
          </v-card-title>
          <v-card-text class="py-1">
            <div class="d-flex flex-row flex-wrap justify-space-between">
              <WalletCard
                v-for="wallet in wallets"
                :key="wallet.id"
                :wallet="wallet"
              />
              <v-tooltip bottom :disabled="wallets.length < 5">
                <template #activator="{ on }">
                  <div class="d-flex justify-center align-center" style="height: 220px; width: 350px;" v-on="on">
                    <v-btn fab x-large color="primary" :disabled="wallets.length === 5" @click.stop="showAddDialog = true">
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </div>
                </template>
                <span>Maksymalna liczba portfeli została osiągnięta</span>
              </v-tooltip>
            </div>
          </v-card-text>
        </v-card>
      </v-container>
    </div>

    <AddWalletDialog v-if="showAddDialog" />
    <EditWalletDialog v-if="showEditDialog" />
    <DeleteWalletDialog v-if="showDeleteDialog" />
    <SubAccountDialog v-if="showAccountDialog" />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Wallets',
  layout: 'parallax',
  data () {
    return {
      selectedItem: null
    }
  },
  computed: {
    showAddDialog: {
      get () { return this.getAddWalletDialog() },
      set (val) { this.setAddWalletDialog(val) }
    },
    showDeleteDialog () { return this.getDeleteWalletDialog() },
    showEditDialog () { return this.getEditWalletDialog() },
    showAccountDialog () { return this.getShowAccountDialog() },
    wallets () { return this.getWallets() }
  },
  async created () {
    await this.loadWallets()
  },
  destroyed () {
    this.resetState()
  },
  methods: {
    ...mapActions('wallets', ['loadWallets']),
    ...mapGetters('wallets', ['getAddWalletDialog', 'getDeleteWalletDialog', 'getEditWalletDialog', 'getWallets']),
    ...mapGetters('wallets/operate-product', ['getShowAccountDialog']),
    ...mapMutations('wallets', ['resetState', 'setAddWalletDialog']),
    ...mapMutations('wallets/operate-product', ['setShowAccountDialog'])
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
