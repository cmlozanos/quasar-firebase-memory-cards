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
    <q-page-sticky position="bottom" :offset="[0, 18]">
      <q-btn round color="primary" icon="add" @click="showModal = true"></q-btn>
    </q-page-sticky>
    <q-dialog persistent v-model="showModal">
      <add-card @close="showModal=false"/>
    </q-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  components: {
    card: require('components/Card/Card.vue').default,
    addCard: require('components/Card/Modal/AddCard.vue').default
  },
  data () {
    return {
      showModal: false
    }
  },
  computed: {
    ...mapGetters('cards', ['cards'])
  }
}
</script>
