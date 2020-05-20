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
export default {
  props: ['gameplay', 'id'],
  filters: {
    formatDate: (value) => {
      return new Date(value).toLocaleTimeString()
    }
  }
}
</script>
