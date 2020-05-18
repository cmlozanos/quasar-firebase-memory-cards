<template>
  <q-item>
    <q-item-section avatar>
      <q-avatar rounded>
        <img :src="card.url">
      </q-avatar>
    </q-item-section>
    <q-item-section>{{card.text}}</q-item-section>
    <q-item-section>
      <div class="row q-gutter-sm justify-end">
        <q-btn outline round :color="card.checked? 'green' : 'orange-5'" icon="check"></q-btn>
        <q-btn outline round color="blue-5" icon="edit" @click.stop="showModal = true"></q-btn>
        <q-btn outline round color="red-5" icon="delete" @click.stop="promptToDelete(id)"></q-btn>
      </div>
    </q-item-section>
    <q-dialog persistent v-model="showModal">
      <edit-card @close="showModal=false" :card="card" :id="id"/>
    </q-dialog>
  </q-item>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: ['card', 'id'],
  components: {
    editCard: require('components/Card/Modal/EditCard.vue').default
  },
  data () {
    return {
      showModal: false
    }
  },
  methods: {
    ...mapActions('cards', ['deleteCard']),
    promptToDelete (id) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Really Delete?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.deleteCard(id)
      })
    }
  }
}
</script>
