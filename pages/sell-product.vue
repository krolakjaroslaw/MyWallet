<!--suppress CssOverwrittenProperties, CssUnknownTarget -->
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
                <Step1 v-if="stepper === 1" @isValid="check()" />
                <Step2 v-if="stepper === 2" @isValid="check()" />
                <Step3 v-if="stepper === 3" />
              </v-card>
            </v-stepper-content>

            <div class="d-flex justify-end ma-3">
              <v-btn
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
                @click="stepper === steps.length ? submit() : stepper++; valid = false"
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
import Step1 from './steps/Step1'
import Step2 from './steps/Step2'
import Step3 from './steps/Step3'

export default {
  name: 'Wallets',
  components: { Step1, Step2, Step3 },
  layout: 'parallax',
  data () {
    return {
      valid: false,
      stepper: 1,
      steps: [
        { header: 'Choose wallet & product' },
        { header: 'Fill details' },
        { header: 'Summary & preview' }
      ]
    }
  },
  computed: {
    date () { return this.getDate() },
    group () { return this.getGroup() },
    number () { return this.getNumber() },
    price () { return this.getPrice() },
    product () { return this.getProduct() },
    wallet () { return this.getWallet() },
    isValid () {
      if (this.stepper === this.steps.length) return true
      return this.valid
    }
  },
  watch: {
    stepper () {
      if (this.stepper === 1) {
        if (this.wallet && this.group && ['Deposit', 'Real_Estate', 'Time_Deposit'].includes(this.group)) this.valid = true
        if (this.wallet && this.group && this.product) this.valid = true
      } else if (this.stepper === 2) {
        if (this.date && this.number > 0 && this.price > 0) this.valid = true
      }
    }
  },
  created () {
    this.loadWallets()
  },
  destroyed () {
    this.resetState()
  },
  methods: {
    ...mapActions('wallets', ['loadWallets']),
    ...mapActions('wallets/operate-product', ['loadGroups', 'loadProducts']),
    ...mapActions('wallets/entity', ['sellProduct']),
    ...mapGetters('wallets/operate-product', ['getDate', 'getGroup', 'getNumber', 'getPrice', 'getProduct', 'getWallet']),
    ...mapMutations('wallets/operate-product', ['resetState']),

    check () {
      this.valid = true
    },

    submit () {
      // TODO: implement
      this.sellProduct('814ab358-81f7-4809-a83a-dccae6a34764')
      this.resetState()
      this.$router.push({ name: 'wallet-details' })
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
