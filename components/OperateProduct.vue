<!--suppress CssOverwrittenProperties, CssUnknownTarget, JSUnresolvedVariable -->
<template>
  <div>
    <!--TODO: refactor to another file-->
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
        <v-stepper
          v-model="stepper"
          class="rounded-xl"
        >
          <v-stepper-header>
            <div
              v-for="(step, index) in steps"
              :key="`step-${index + 1}`"
              class="d-flex flex-row justify-space-around"
            >
              <v-stepper-step
                :complete="stepper > index + 1"
                :step="index + 1"
              >
                {{ step.header }}
              </v-stepper-step>

              <v-divider
                v-if="index + 1 < steps.length"
                style="width: 295px;"
              />
            </div>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content
              v-for="(step, index) in steps"
              :key="`step-content-${index + 1}`"
              :step="index + 1"
            >
              <v-card elevation="0">
                <Step1 v-if="stepper === 1" />
                <Step2 v-if="stepper === 2" />
                <Step3 v-if="stepper === 3" />
              </v-card>
            </v-stepper-content>

            <div class="d-flex justify-end ma-3">
              <v-btn
                v-if="stepper !== 1"
                class="mx-2"
                :disabled="stepper === 1"
                rounded
                @click="stepper--"
              >
                Back
              </v-btn>

              <v-btn
                class="mx-2"
                color="primary"
                :disabled="!isValid"
                rounded
                @click="stepper === steps.length ? submit() : stepper++"
              >
                {{ stepper === steps.length ? 'Submit' : 'Continue' }}
              </v-btn>
            </div>
          </v-stepper-items>
        </v-stepper>
      </v-container>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import Step1 from '@/components/steps/Step1'
import Step2 from '@/components/steps/Step2'
import Step3 from '@/components/steps/Step3'
import { CONSTANTS } from 'assets/constant/components'

export default {
  name: 'OperateProduct',
  components: { Step1, Step2, Step3 },
  layout: 'parallax',
  data () {
    return {
      valid: false,
      steps: [
        { header: 'Choose wallet & product' },
        { header: 'Fill details' },
        { header: 'Summary & preview' }
      ]
    }
  },
  computed: {
    commission () { return this.getCommission() },
    currency () { return this.getCurrency() },
    date () { return this.getDate() },
    group () { return this.getGroup() },
    name () { return this.getName() },
    number () { return this.getNumber() },
    price () { return this.getPrice() },
    product () { return this.getProduct() },
    stepper: {
      get () { return this.getStepper() },
      set (val) { this.setStepper(val) }
    },
    showAccountDialog: {
      get () { return this.getShowAccountDialog() },
      set (val) { this.setShowAccountDialog(val) }
    },
    wallet () { return this.getWallet() },
    isValid () {
      if (this.stepper === this.steps.length) return true
      return this.valid
    }
  },
  watch: {
    stepper () {
      this.valid = false
      if (this.stepper === 1) {
        if (this.wallet && this.group && CONSTANTS.depositRealEstateTimeDepositTypes.includes(this.group)) this.valid = true
        if (this.wallet && this.group && this.product) this.valid = true
      } else if (this.stepper === 2) {
        if (this.name > 0 && this.price >= 0 && this.currency >= 0) this.valid = true
        if (this.date && this.number > 0 && this.price > 0 && this.commission >= 0) this.valid = true
        if (this.name && this.price > 0) this.valid = true
      }
    }
  },
  created () {
    this.loadWallets()
    this.$nuxt.$on('isValid', this.check)
  },
  beforeDestroy () {
    this.$nuxt.$off('isValid')
  },
  methods: {
    ...mapActions('wallets', ['loadWallets']),
    ...mapActions('wallets/entity', ['buyOrSellInvestmentProduct']),
    ...mapGetters('wallets/operate-product', [
      'getCommission',
      'getCurrency',
      'getDate',
      'getGroup',
      'getName',
      'getNumber',
      'getPrice',
      'getProduct',
      'getShowAccountDialog',
      'getStepper',
      'getWallet'
    ]),
    ...mapMutations('wallets/operate-product', ['resetState', 'setShowAccountDialog', 'setStepper']),

    check (event) {
      this.valid = event
    },

    submit () {
      console.log('override')
    }
  }
}
</script>

<style lang="scss">
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
</style>
