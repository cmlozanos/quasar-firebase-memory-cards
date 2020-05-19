<template>
  <div class="q-pa-md">
    <q-page>
      <q-list separator>
        <card
          v-for="(card,index) in cards"
          :key="index"
          :card="card"
          :id="index">
        </card>
      </q-list>
    </q-page>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  components: {
    card: require('components/Card/Card.vue').default
  },
  computed: {
    ...mapGetters('cards', ['cards'])
  }
}
</script>
