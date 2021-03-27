<template>
  <div>
    <v-stepper v-model="stepper">
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
            style="width: 165px;" />
        </div>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content
          v-for="(step, index) in steps"
          :step="index + 1"
          :key="`step-content-${index + 1}`"
        >
          <v-card
            elevation="0"
            class="mb-12"
          >
            <span>{{ step.header }}</span>
            <Step1 v-if="stepper === 1" />
            <Step2 v-if="stepper === 2" />
            <Step3 v-if="stepper === 3" />
            <Step4 v-if="stepper === 4" />
          </v-card>
        </v-stepper-content>

        <div class="d-flex justify-end ma-3">
          <v-btn
            class="mx-2"
            :disabled="stepper === 1"
            @click="stepper--"
          >
            Back
          </v-btn>

          <v-btn
            class="mx-2"
            color="primary"
            @click="stepper++"
          >
            {{ stepper === steps.length ? 'Submit' : 'Continue' }}
          </v-btn>
        </div>
      </v-stepper-items>
    </v-stepper>

    <br>
    <br>
    <br>

    <v-dialog
      v-model="showDialog"
      width="800"
    >
      <template #activator="{ on, attrs }">
        <v-btn
          color="primary"
          v-bind="attrs"
          v-on="on"
        >
          Show dialog
        </v-btn>
      </template>

      <v-stepper v-model="stepper2">
        <v-stepper-header>
          <div
            v-for="(step, index) in steps"
            :key="`step-${index + 1}`"
            class="d-flex flex-row flex-nowrap justify-space-around"
          >
            <v-stepper-step
              :complete="stepper2 > index + 1"
              :step="index + 1"
            >
              {{ step.header }}
            </v-stepper-step>

            <v-divider
              v-if="index + 1 < steps.length"
              style="width: 45px;" />
          </div>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content
            v-for="(step, index) in steps"
            :step="index + 1"
            :key="`step-content-${index + 1}`"
          >
            <v-card
              elevation="0"
              class="mb-12"
            >
              <span>{{ step.header }}</span>
              <Step1 v-if="stepper2 === 1" />
              <Step2 v-if="stepper2 === 2" />
              <Step3 v-if="stepper2 === 3" />
              <Step4 v-if="stepper2 === 4" />
            </v-card>
          </v-stepper-content>

          <div class="d-flex justify-end ma-3">
            <v-btn
              class="mx-2"
              :disabled="stepper2 === 1"
              @click="stepper2--"
            >
              Back
            </v-btn>

            <v-btn
              class="mx-2"
              color="primary"
              @click="stepper2++"
            >
              {{ stepper2 === steps.length ? 'Submit' : 'Continue' }}
            </v-btn>
          </div>
        </v-stepper-items>
      </v-stepper>
    </v-dialog>
<!--    <v-data-table-->
<!--      dense-->
<!--      calculate-widths-->
<!--      :loading="rates.length === 0"-->
<!--      loading-text="Loading items..."-->
<!--      :headers="headers_rates"-->
<!--      :items="rates"-->
<!--      item-key="name"-->
<!--      :items-per-page="5"-->
<!--      class="elevation-1"-->
<!--      :custom-filter="filterByName"-->
<!--      :footer-props="{-->
<!--        showCurrentPage: true,-->
<!--        showFirstLastPage: true,-->
<!--        itemsPerPageOptions: [10]-->
<!--      }"-->
<!--    >-->
<!--      <template #header="{ props: { headers } }">-->
<!--        <thead>-->
<!--        <tr>-->
<!--          <th :colspan="headers.length">-->
<!--            WIG20-->
<!--          </th>-->
<!--        </tr>-->
<!--        </thead>-->
<!--      </template>-->
<!--    </v-data-table>-->
  </div>
</template>

<script>
import Step1 from './steps/Step1'
import Step2 from './steps/Step2'
import Step3 from './steps/Step3'
import Step4 from './steps/Step4'
export default {
  name: 'Steppers',
  components: { Step1, Step2, Step3, Step4 },
  data () {
    return {
      showDialog: false,
      stepper: 1,
      stepper2: 1,
      steps: [
        { header: 'Name of step 1' },
        { header: 'Name of step 2' },
        { header: 'Name of step 3' },
        { header: 'Name of step 4' }
      ],
      rates: [
        {
          name: 'ALIOR',
          rate: 19.765.toFixed(4),
          change: '0.6750',
          change_percentage: '3,54%',
          transactions: '2 501',
          turnover: '17 633 592',
          opening: 19.065.toFixed(4),
          max: 19.96.toFixed(4),
          min: 19.0.toFixed(4),
          date: '19.02 17:03'
        },
        {
          name: 'ALLEGRO',
          rate: 67.5.toFixed(4),
          change: '-1.1300',
          change_percentage: '-1,65%',
          transactions: '6 377',
          turnover: '256 551 872',
          opening: 69.03.toFixed(4),
          max: 69.7.toFixed(4),
          min: 67.5.toFixed(4),
          date: '19.02 17:04'
        },
        {
          name: 'ASSECOPOL',
          rate: 66.0.toFixed(4),
          change: '-1.2000',
          change_percentage: '-1,79%',
          transactions: '1 934',
          turnover: '7 541 400',
          opening: 67.3.toFixed(4),
          max: 67.4.toFixed(4),
          min: 66.0.toFixed(4),
          date: '19.02 17:02'
        },
        {
          name: 'CCC',
          rate: 102.2.toFixed(4),
          change: '1.2000',
          change_percentage: '1,19%',
          transactions: '3 184',
          turnover: '26 387 944',
          opening: 101.5.toFixed(4),
          max: 103.0.toFixed(4),
          min: 98.24.toFixed(4),
          date: '19.02 17:04'
        },
        {
          name: 'CDPROJECT',
          rate: 265.4.toFixed(4),
          change: '-9.6000',
          change_percentage: '-3,48%',
          transactions: '9 759',
          turnover: '116 005 720',
          opening: 275.0.toFixed(4),
          max: 278.9.toFixed(4),
          min: 264.7.toFixed(4),
          date: '19.02 17:02'
        },
        {
          name: 'CYFRPLSAT',
          rate: 28.38.toFixed(4),
          change: '-0.0200',
          change_percentage: '-0,07%',
          transactions: '1 710',
          turnover: '14 264 921',
          opening: 28.42.toFixed(4),
          max: 28.8.toFixed(4),
          min: 28.3.toFixed(4),
          date: '19.02 17:02'
        },
        {
          name: 'DINOPL',
          rate: 251.0.toFixed(4),
          change: '3.8000',
          change_percentage: '1,54%',
          transactions: '3 232',
          turnover: '37 507 844',
          opening: 248.8.toFixed(4),
          max: 253.8.toFixed(4),
          min: 247.4.toFixed(4),
          date: '19.02 17:02'
        },
        {
          name: 'JSW',
          rate: 39.85.toFixed(4),
          change: '0.1400',
          change_percentage: '0,35%',
          transactions: '3 089',
          turnover: '23 583 066',
          opening: 39.6.toFixed(4),
          max: 40.33.toFixed(4),
          min: 39.04.toFixed(4),
          date: '19.02 17:03'
        },
        {
          name: 'KGHM',
          rate: 207.5.toFixed(4),
          change: '11.5000',
          change_percentage: '5,87%',
          transactions: '7 830',
          turnover: '167 665 696',
          opening: 200.0.toFixed(4),
          max: 207.5.toFixed(4),
          min: 200.0.toFixed(4),
          date: '19.02 17:04'
        },
        {
          name: 'LOTOS',
          rate: 41.65.toFixed(4),
          change: '0.3300',
          change_percentage: '0.80%',
          transactions: '3 390',
          turnover: '22 279 420',
          opening: 41.35.toFixed(4),
          max: 41.82.toFixed(4),
          min: 40.81.toFixed(4),
          date: '19.02 17:04'
        },
        {
          name: 'LPP',
          rate: 8105.0.toFixed(4),
          change: '-215.0000',
          change_percentage: '-2,58%',
          transactions: '1 180',
          turnover: '22 895 224',
          opening: 8160.0.toFixed(4),
          max: 8250.0.toFixed(4),
          min: 8040.0.toFixed(4),
          date: '19.02 17:02'
        },
        {
          name: 'ORANGEPL',
          rate: 6.065.toFixed(4),
          change: '-0.0900',
          change_percentage: '-1,46%',
          transactions: '3 750',
          turnover: '19 088 462',
          opening: 6.17.toFixed(4),
          max: 6.225.toFixed(4),
          min: 6.035.toFixed(4),
          date: '19.02 17:04'
        },
        {
          name: 'PEKAO',
          rate: 67.18.toFixed(4),
          change: '-0.3200',
          change_percentage: '-0,47%',
          transactions: '4 475',
          turnover: '60 261 568',
          opening: 67.58.toFixed(4),
          max: 68.26.toFixed(4),
          min: 66.48.toFixed(4),
          date: '19.02 17:04'
        },
        {
          name: 'PGE',
          rate: 6.63.toFixed(4),
          change: '-0.1040',
          change_percentage: '-1,54%',
          transactions: '2 240',
          turnover: '12 874 285',
          opening: 6.78.toFixed(4),
          max: 6.78.toFixed(4),
          min: 6.628.toFixed(4),
          date: '19.02 17:02'
        },
        {
          name: 'PGNIG',
          rate: 5.864.toFixed(4),
          change: '-0.0680',
          change_percentage: '-1,15%',
          transactions: '2 624',
          turnover: '18 325 528',
          opening: 5.95.toFixed(4),
          max: 6.0.toFixed(4),
          min: 5.864.toFixed(4),
          date: '19.02 17:02'
        },
        {
          name: 'PKNORLEN',
          rate: 60.68.toFixed(4),
          change: '1.6600',
          change_percentage: '2,81%',
          transactions: '7 381',
          turnover: '67 508 144',
          opening: 59.32.toFixed(4),
          max: 60.92.toFixed(4),
          min: 59.2.toFixed(4),
          date: '19.02 17:04'
        },
        {
          name: 'PKOBP',
          rate: 30.66.toFixed(4),
          change: '0.0600',
          change_percentage: '0,20%',
          transactions: '10 847',
          turnover: '144 319 008',
          opening: 30.6.toFixed(4),
          max: 30.88.toFixed(4),
          min: 29.59.toFixed(4),
          date: '19.02 17:04'
        },
        {
          name: 'PZU',
          rate: 30.57.toFixed(4),
          change: '-0.2700',
          change_percentage: '-0,88%',
          transactions: '5 923',
          turnover: '80 195 104',
          opening: 30.85.toFixed(4),
          max: 30.85.toFixed(4),
          min: 30.13.toFixed(4),
          date: '19.02 17:03'
        },
        {
          name: 'SANPL',
          rate: 216.8.toFixed(4),
          change: '-4.4000',
          change_percentage: '-1,99%',
          transactions: '2 612',
          turnover: '27 848 416',
          opening: 220.2.toFixed(4),
          max: 220.4.toFixed(4),
          min: 214.0.toFixed(4),
          date: '19.02 17:02'
        },
        {
          name: 'TAURONPE',
          rate: 2.7.toFixed(4),
          change: '-0.0220',
          change_percentage: '-0,81%',
          transactions: '1 352',
          turnover: '8 385 345',
          opening: 2.722.toFixed(4),
          max: 2.746.toFixed(4),
          min: 2.68.toFixed(4),
          date: '19.02 17:01'
        }
      ]
    }
  },
  computed: {
    headers_rates () {
      return [
        { text: 'Walor', value: 'name', align: 'start' },
        { text: 'Kurs', value: 'rate', align: 'right' },
        { text: 'Zmiana', value: 'change', align: 'right' },
        { text: 'Zm. proc.', value: 'change_percentage', align: 'right' },
        { text: 'L. trans.', value: 'transactions', align: 'right' },
        { text: 'Obrót', value: 'turnover', align: 'right' },
        { text: 'Otwarcie', value: 'opening', align: 'right' },
        { text: 'Max', value: 'max', align: 'right' },
        { text: 'Min', value: 'min', align: 'right' },
        { text: 'Czas', value: 'date', align: 'right' }
      ]
    }
  },
  methods: {
    filterByName (value, search) {
      return value !== null && search !== null && typeof value === 'string' &&
        value.toString().toLowerCase().includes(search.toLowerCase())
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
