<template>
  <div>
    <div class="page-header">
      <parallax
        class="parallax"
        style="
          background: -webkit-linear-gradient(rgba(20, 75, 150, 0.6), rgba(44, 44, 44, 0.6)), url('../profile.jpg') center center no-repeat; /* For Safari 5.1 to 6.0 */
          background: -o-linear-gradient(rgba(20, 75, 150, 0.6), rgba(44, 44, 44, 0.6)), url('../profile.jpg') center center no-repeat; /* For Opera 11.1 to 12.0 */
          background: -moz-linear-gradient(rgba(20, 75, 150, 0.6), rgba(44, 44, 44, 0.6)), url('../profile.jpg') center center no-repeat; /* For Firefox 3.6 to 15 */
          background: linear-gradient(rgba(20, 75, 150, 0.6), rgba(44, 44, 44, 0.6)), url('../profile.jpg') center center no-repeat; /* Standard syntax */
          -webkit-background-size: cover;
          -moz-background-size: cover;
          -o-background-size: cover;
          background-size: cover;
        "
      />
    </div>
    <div class="section">
      <v-container>
        <v-data-table
          dense
          calculate-widths
          :hide-default-footer="events.length <= 20"
          :loading="events.length === 0"
          loading-text="Loading items..."
          :headers="headers"
          :items="events"
          :search="search"
          item-key="symbol"
          class="elevation-0 my-2"
          :footer-props="{
            showCurrentPage: events.length > 20,
            showFirstLastPage: events.length > 20,
            itemsPerPageOptions: [20]
          }"
        >
          <template #top>
            <v-text-field
              v-model="search"
              label="Wyszukaj"
              class="mx-4"
            />
          </template>
          <template #[`item.createdAt`]="{ item }">
            {{ formattedDate(item.createdAt) }}
          </template>
        </v-data-table>
      </v-container>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'UserDetails',
  layout: 'parallax',
  data () {
    return {
      search: ''
    }
  },
  computed: {
    events () { return this.getEvents() },
    headers () {
      return [
        { text: 'Date', value: 'createdAt', align: 'start', filterable: false },
        { text: 'Type', value: 'eventType', align: 'start' },
        { text: 'Nazwa', value: 'name', align: 'start' },
        { text: 'Typ produktu', value: 'productType', align: 'start' },
        { text: 'Liczba jednostek', value: 'numberOfUnits', align: 'right', filterable: false },
        { text: 'Wartość', value: 'value', align: 'right', filterable: false }
      ]
    }
  },
  created () {
    this.loadUser(this.$route.params.id)
  },
  methods: {
    ...mapActions('users/entity', ['loadUser']),
    ...mapGetters('users/entity', ['getEvents']),

    formattedDate (date) {
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
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

.green {
  background-color: transparent !important;
  color: #43A047;
}
</style>
