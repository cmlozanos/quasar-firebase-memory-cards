<template>
  <q-banner>
    <div class="row justify-end">
      <q-chip outline color="red-5" icon="close" clickable @click="exitPlaying">
        Exit
      </q-chip>
      <q-space/>
      <q-chip outline square color="black-5" text-color="white" icon="mouse">
        {{clicks}}
      </q-chip>
      <q-chip outline square color="black-5" text-color="white" icon="update">
        Spent: {{timeSpent | formatDate}}
      </q-chip>
    </div>
  </q-banner>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
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
  },
  methods: {
    ...mapActions('game', ['exitPlaying'])
  }
}
</script>
