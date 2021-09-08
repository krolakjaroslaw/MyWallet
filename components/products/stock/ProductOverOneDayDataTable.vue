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
            {{ profileData.prevClose }} zł
            <span style="color: gray; font-size: small;"> ({{ profileData.prevCloseDate }})</span>
          </td>
        </tr>
        <tr>
          <th class="text-left px-2">
            Data początkowa:
          </th>
          <td class="px-2">
            {{ profileData.startDate }}
          </td>
        </tr>
        <tr>
          <th class="text-left px-2">
            Data końcowa:
          </th>
          <td class="px-2">
            {{ profileData.endDate }}
          </td>
        </tr>
        <tr>
          <th class="text-left px-2">
            Zmiana:
          </th>
          <td class="px-2">
            {{ profileData.changeValue }} zł ({{ profileData.changePercentValue }})
          </td>
        </tr>
        <tr>
          <th class="text-left px-2">
            Minimum:
          </th>
          <td class="px-2">
            {{ profileData.minValue }} zł
            <span style="color: gray; font-size: small;"> ({{ profileData.minValueDate }})</span>
          </td>
        </tr>
        <tr>
          <th class="text-left px-2">
            Maksimum:
          </th>
          <td class="px-2">
            {{ profileData.maxValue }} zł
            <span style="color: gray; font-size: small;"> ({{ profileData.maxValueDate }})</span>
          </td>
        </tr>
        <tr >
          <th class="text-left px-2">
            Średni:
          </th>
          <td class="px-2">
            {{ profileData.valueAverage }} zł
          </td>
        </tr>
        <tr>
          <th class="text-left px-2">
            Wolumen obrotu:
          </th>
          <td class="px-2">
            {{ profileData.volumeSumValue }} szt
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ProductOverOneDayDataTable',
  computed: {
    profileData () { return this.getProfileData() }
  },
  methods: {
    ...mapGetters('products/stock', ['getProfileData'])
  }
}
</script>
