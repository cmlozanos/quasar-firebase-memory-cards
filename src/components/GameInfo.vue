<template>
  <q-banner>
    <div class="row justify-end">
      <div class="col-6">
        <div class="row justify-start">
          <q-chip outline color="primary" text-color="white" icon="mouse">
            {{clicks}}
          </q-chip>
        </div>
      </div>
      <div class="col-6">
        <div class="row justify-end">
          <q-chip outline color="primary" text-color="white" icon="update">
            Spent: {{timeSpent | formatDate}}
          </q-chip>
        </div>
      </div>
    </div>
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
