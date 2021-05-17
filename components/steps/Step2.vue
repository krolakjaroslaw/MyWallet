<!--suppress JSUnresolvedVariable -->
<template>
  <div>
    <AddDepositAccountProduct v-if="group === 'Deposit'" />
    <AddRealEstateProduct v-else-if="group === 'Real_Estate'" />
    <AddTimeDepositProduct v-else-if="group === 'Time_Deposit'" />
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
