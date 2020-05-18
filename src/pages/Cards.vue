<template>
  <q-page>
    <div class="row q-gutter-sm justify-center q-pa-sm">
      <q-btn round color="primary" icon="add" @click="showModal = true"></q-btn>
    </div>
    <q-list separator>
      <card
        v-for="(card,index) in cards"
        :key="index"
        :card="card"
        :id="index">
      </card>
    </q-list>
    <q-dialog persistent v-model="showModal">
      <add-card @close="showModal=false"/>
    </q-dialog>
  </q-page>
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
