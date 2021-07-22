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
        <v-data-table
          dense
          calculate-widths
          :hide-default-footer="users.length <= 20"
          :loading="users.length === 0"
          loading-text="Loading items..."
          :headers="headers"
          :items="users"
          :search="search"
          item-key="symbol"
          class="elevation-0 my-2"
          :footer-props="{
            showCurrentPage: users.length > 20,
            showFirstLastPage: users.length > 20,
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
          <template #[`item.email`]="{ item }">
            <router-link :to="{ name: 'users-id', params: { id: item.id } }">
              <b>{{ item.email }}</b>
            </router-link>
          </template>
          <template #[`item.roles`]="{ item }">
            {{ item.roles.join(', ') }}
          </template>
          <template #[`item.createdAt`]="{ item }">
            {{ formattedDate(item.createdAt) }}
          </template>
          <template #[`item.delete`]="{ item }">
            <v-btn
              icon
              small
              color="primary"
              @click="remove(item.id)"
            >
              <v-icon>
                mdi-delete
              </v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-container>
    </div>
    <v-dialog
      v-model="deleteUserDialog"
      width="500"
      persistent
    >
      <v-card class="rounded-xl">
        <v-card-title class="headline">
          Usuń użytkownika
        </v-card-title>
        <v-card-text>
          Czy na pewno chcesz usunąć użytkownika?
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            text
            rounded
            outlined
            @click="showDeleteDialog = false"
          >
            Anuluj
          </v-btn>
          <v-btn
            color="primary"
            rounded
            depressed
            @click="removeUser(selectedItem)"
          >
            Usuń
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import moment from 'moment'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Users',
  layout: 'parallax',
  data () {
    return {
      search: '',
      selectedItem: ''
    }
  },
  computed: {
    deleteUserDialog: {
      get () { return this.getDeleteUserDialog() },
      set (val) { this.setDeleteUserDialog(val) }
    },
    headers () {
      return [
        { text: 'Email', value: 'email', align: 'start' },
        { text: 'Nazwa', value: 'name', align: 'start' },
        { text: 'Role', value: 'roles', align: 'start' },
        { text: 'Id', value: 'id', align: 'start' },
        { text: 'Data rejestracji', value: 'createdAt', align: 'start' },
        { text: 'Usuń', value: 'delete', align: 'center', filterable: false }
      ]
    },
    users () { return this.getUsers() }
  },
  created () {
    this.loadUsers()
  },
  methods: {
    ...mapActions('users', ['deleteUser', 'loadUsers']),
    ...mapGetters('users', ['getDeleteUserDialog', 'getUsers']),
    ...mapMutations('users', ['setDeleteUserDialog']),

    formattedDate (date) {
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    },
    remove (id) {
      this.deleteUserDialog = true
      this.selectedItem = id
    },
    removeUser (id) {
      this.deleteUser(id)
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
