<template>
  <div>
    <q-banner>
      <q-chip outline color="primary" text-color="white" icon="mouse">
        {{clicks}}
      </q-chip>
      <q-chip outline color="primary" text-color="white" icon="update">
        Spent: {{timeSpent | formatDate}}
      </q-chip>
    </q-banner>
  </div>
</template>
<script>
import { date } from 'quasar'
import { mapGetters } from 'vuex'

export default {
  props: ['timeStart', 'timeSpent'],
  filters: {
    formatDate: (value) => {
      return date.formatDate(value, 'hh:mm:ss')
    }
  },
  computed: {
    ...mapGetters('game', ['clicks'])
  }
}
</script>
