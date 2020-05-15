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

export default {
  filters: {
    formatDate: (value) => {
      const seconds = Math.trunc(value / 1000)
      const minutes = Math.trunc(seconds / 60)
      const hours = Math.trunc(minutes / 24)
      const realMinutes = (minutes - (hours * 60))
      const realSeconds = (seconds - (minutes - (hours * 60)) * 60)
      return hours + ' h ' + realMinutes + ' m ' + realSeconds + ' s'
    }
  },
  computed: {
    ...mapGetters('game', ['clicks', 'timeSpent'])
  }
}
</script>
