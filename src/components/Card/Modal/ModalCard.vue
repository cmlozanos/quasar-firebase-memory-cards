<template>
  <q-card>
    <q-card-section class="row">
      <div class="text-h6">{{showText ? cardToSubmit.text : 'Pending to resolve'}}</div>
      <q-space/>
      <q-btn flat round dense size="x-small" icon="close" v-close-popup/>
    </q-card-section>

    <q-card-section class="row justify-center" v-if="cardToSubmit.url">
      <q-img
        :src="cardToSubmit.url"
        style="height: 140px"
      >
      </q-img>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <q-input
        outlined
        clearable
        autofocus
        readonly
        v-model="cardToSubmit.url"
        label="Image url"
        :rules="[val => !!val || 'Field is required']"
      />
    </q-card-section>
  </q-card>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  props: ['card', 'id', 'showText'],
  data () {
    return {
      cardToSubmit: {
        url: null,
        text: null,
        checked: false
      }
    }
  },
  mounted () {
    Object.assign(this.cardToSubmit, this.card)
  },
  methods: {
    ...mapActions('cards', ['updateCard']),
    onSubmit () {
      this.updateCard({ id: this.id, card: this.cardToSubmit })
      this.$emit('close')
    }
  }
}
</script>
<style lang="sass" scoped>
</style>
