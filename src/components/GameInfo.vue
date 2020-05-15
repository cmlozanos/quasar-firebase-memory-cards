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
      console.log('hours: ' + hours + ' minutes: ' + minutes + ' seconds: ' + seconds)
      /*
      if (hours === 0) {
        if (minutes === 0) {
          return seconds + ' s'
        }
        return minutes + ' m ' + (seconds - (minutes * 60)) + ' s'
      }
      */
      return hours + ' h ' + (minutes - (hours * 60)) + ' m ' + (seconds - (minutes - (hours * 60)) * 60) + ' s'
    }
  },
  computed: {
    ...mapGetters('game', ['clicks', 'timeSpent'])
  }
}
</script>
