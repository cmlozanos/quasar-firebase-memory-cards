<template>
  <q-item clickable v-ripple @click="showModal = true">
    <q-item-section avatar>
      <q-avatar rounded>
        <img :src="card.url">
      </q-avatar>
    </q-item-section>
    <q-item-section>{{card.text}}</q-item-section>
    <q-item-section>
      <div class="row q-gutter-sm justify-end">
        <q-btn outline round disable color="green" icon="lock_open"></q-btn>
      </div>
    </q-item-section>
    <q-dialog persistent v-model="showModal">
      <modal-card @close="showModal=false" :card="card" :id="id" :showText="true"/>
    </q-dialog>
  </q-item>
</template>

<script>
export default {
  props: ['card', 'id'],
  components: {
    modalCard: require('components/Card/Modal/ModalCard.vue').default
  },
  data () {
    return {
      showModal: false
    }
  }
}
</script>
