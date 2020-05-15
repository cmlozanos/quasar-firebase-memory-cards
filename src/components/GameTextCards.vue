<template>
  <div class="row q-pt-xl">
    <div class="col-4 q-pa-xs" v-for="(item, index) in texts" :key=index>
      <q-btn
        outline
        rounded
        size='xs'
        class="full-width"
        :color="item.checked ? 'green' : 'primary'"
        @click="addClickToStore(item, clickedImage)"
        :icon="item.checked ? 'done_all' : 'help_outline'"
        :label="item.text" />
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { Loading } from 'quasar'
export default {
  props: ['items'],
  methods: {
    ...mapActions('game', ['addClick', 'setClickedText', 'setClickedImage', 'setCheckedImage']),
    addClickToStore (item) {
      // check if this image was verified before
      if (item.checked) {
        return
      }

      // check if has an image checked
      if (this.clickedImage === 0) {
        this.$q.notify({
          timeout: 200,
          message: 'Select an image first',
          color: 'red'
        })
        return
      }

      Loading.show()
      this.setClickedText(item.id)
      this.addClick(1)
      setTimeout(this.completeValidation, 300)
    },
    completeValidation (item) {
      if (this.clickedText === this.clickedImage) {
        this.setCheckedImage()
        this.$q.notify({
          timeout: 300,
          message: 'Found',
          progress: true,
          color: 'green'
        })
      } else {
        this.$q.notify({
          timeout: 300,
          message: 'Not Found',
          progress: true,
          color: 'red'
        })
      }
      this.setClickedImage(0)
      Loading.hide()
    }
  },
  computed: {
    ...mapGetters('game', ['clickedImage', 'clickedText', 'texts'])
  }
}
</script>
