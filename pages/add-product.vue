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
                <Step1 v-if="stepper === 1" />
                <Step2 v-if="stepper === 2" />
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
                :disabled="stepper === steps.length"
                rounded
                @click="stepper++"
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
import Step1 from './steps/Step1'
import Step2 from './steps/Step2'
import Step3 from './steps/Step3'

export default {
  name: 'Wallets',
  components: { Step1, Step2, Step3 },
  layout: 'parallax',
  data () {
    return {
      stepper: 1,
      steps: [
        { header: 'Choose wallet & product' },
        { header: 'Fill details' },
        { header: 'Summary & preview' }
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
