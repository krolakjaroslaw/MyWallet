<!--suppress JSUnresolvedVariable -->
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
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Operations',
  layout: 'parallax',
  data () {
    return {
      search: ''
    }
  },
  computed: {
    ...mapState('operations', ['events', 'headers'])
  },
  created () {
    this.loadEvents()
  },
  methods: {
    ...mapActions('operations', ['loadEvents']),
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
</style>
