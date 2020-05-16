<template>
  <q-banner>
    <q-chip outline color="primary" text-color="white" icon="mouse">
      {{clicks}}
    </q-chip>
    <q-chip outline color="primary" text-color="white" icon="update">
      Spent: {{timeSpent | formatDate}}
    </q-chip>
  </q-banner>
</template>
<script>
import { mapGetters } from 'vuex'
import { date } from 'quasar'
export default {
  filters: {
    formatDate: (value) => {
      const dateValue = new Date(value)
      const dateValueOffset = dateValue.getTimezoneOffset()
      const dateWithoutOffset = date.addToDate(dateValue, { minutes: dateValueOffset })
      return dateWithoutOffset.toLocaleTimeString()
    }
  },
  computed: {
    ...mapGetters('game', ['clicks', 'timeSpent'])
  }
}
</script>
