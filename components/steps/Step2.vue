<!--suppress JSUnresolvedVariable -->
<template>
  <div>
    <AddDepositAccountProduct v-if="group === 'DEPOSIT'" />
    <AddRealEstateProduct v-else-if="group === 'REAL_ESTATE'" />
    <AddTimeDepositProduct v-else-if="group === 'TIME_DEPOSIT'" />
    <AddInvestmentProduct v-else />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Step2',
  data () {
    return {
      valid: true,
      menu: false
    }
  },
  computed: {
    group () { return this.getGroup() }
  },
  methods: {
    ...mapGetters('wallets/operate-product', ['getGroup'])
  }
}
</script>

<style lang="scss" scoped>

</style>
