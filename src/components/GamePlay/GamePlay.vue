<template>
  <q-item>
    <q-item-section>
       Clicks: {{gameplay.clicks}}
    </q-item-section>
    <q-item-section>
      Init: {{gameplay.init | formatDate}}
    </q-item-section>
    <q-item-section>
      Spent: {{gameplay.spent_formatted}}
    </q-item-section>
  </q-item>
</template>

<script>
import { date } from 'quasar'
export default {
  props: ['gameplay', 'id'],
  filters: {
    formatDate: (value) => {
      console.log('value: ' + value)
      const dateValue = new Date(value)
      const dateValueOffset = dateValue.getTimezoneOffset()
      const dateWithoutOffset = date.addToDate(dateValue, { minutes: dateValueOffset })
      const result = dateWithoutOffset.toLocaleTimeString()
      console.log('result: ' + result)
      return result
    }
  }
}
</script>
