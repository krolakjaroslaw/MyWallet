<template>
  <v-simple-table
    dense
    fixed-header
  >
    <template #default>
      <tbody>
        <tr>
          <th class="text-left px-2">
            Kurs odniesienia:
          </th>
          <td class="px-2">
            {{ parseFloat(profileData.quoteOpen).toFixed(4) }} zł
          </td>
        </tr>
        <tr>
          <th class="text-left px-2">
            Minimum:
          </th>
          <td class="px-2">
            {{ parseFloat(profileData.quoteMin).toFixed(4) }} zł
          </td>
        </tr>
        <tr>
          <th class="text-left px-2">
            Maksimum:
          </th>
          <td class="px-2">
            {{ parseFloat(profileData.quoteMax).toFixed(4) }} zł
          </td>
        </tr>
        <tr>
          <th class="text-left px-2">
            Zmiana:
          </th>
          <td class="px-2">
            {{ profileData.change }} zł
            <span style="color: gray; font-size: small;"> ({{ parseFloat(profileData.changeProc).toFixed(2) }} %)</span>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'IndexProductDataTable',
  computed: {
    profileData () { return this.getProfileData() }
  },
  methods: {
    ...mapGetters('products/stock', ['getProfileData'])
  }
}
</script>
