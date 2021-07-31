<template>
  <v-dialog
    v-model="showChangeValueDialog"
    width="500"
    persistent
  >
    <v-card class="rounded-xl">
      <v-card-title class="headline">
        Zmień wartość nieruchomości
      </v-card-title>
      <v-card-text>
        <!--TODO: form + validation-->
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
        >
          <template #activator="{ on, attrs }">
            <v-text-field
              v-model="dateFormatted"
              label="Date"
              hint="MM/DD/YYYY"
              prepend-icon="mdi-calendar"
              :rules="[
                $rules.required
              ]"
              persistent-hint
              v-bind="attrs"
              v-on="on"
              @blur="date = parseDate(dateFormatted)"
            />
          </template>
          <v-date-picker
            v-model="date"
            :max="new Date().toISOString().substr(0,10)"
            no-title
            @input="menu = false"
          />
        </v-menu>

        <v-text-field
          v-model="value"
          label="Nowa wartość"
          class="mt-4"
          type="number"
          :rules="[
            $rules.required
          ]"
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
          Anuluj
        </v-btn>
        <v-btn
          color="primary"
          rounded
          depressed
          @click="changeValue"
        >
          Zmień
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'ChangeRealEstateValueDialog',
  data () {
    return {
      date: null,
      value: 0.0,
      valid: true,
      menu: false
    }
  },
  computed: {
    dateFormatted: {
      get () { return this.formatDate(this.date) },
      set (val) { this.date = this.parseDate(val) }
    },
    showChangeValueDialog: {
      get () { return this.getShowChangeValueDialog() },
      set (val) { this.setShowChangeValueDialog(val) }
    }
  },
  methods: {
    ...mapActions('products/entity', ['changeRealEstateValue']),
    ...mapGetters('products/entity', ['getShowChangeValueDialog']),
    ...mapMutations('products/entity', ['setShowChangeValueDialog']),

    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },

    parseDate (date) {
      if (!date) return null

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },

    changeValue () {
      this.changeRealEstateValue({ date: this.date, value: this.value })
      this.showChangeValueDialog = false
    },

    closeDialog () {
      this.showChangeValueDialog = false
    }
  }
}
</script>

<style lang="scss" scoped>
.v-menu__content {
  min-width: 290px !important;
  max-width: 290px !important;
}
</style>
