<template>
  <div class="row">
    <div class="col-12 q-pa-xs" v-for="(item, index) in texts" :key=index>
      <q-btn
        outline
        size='md'
        class="full-width"
        :disabled="item.data.checked"
        :color="item.data.checked ? 'green' : 'primary'"
        @click="addClickToStore(item, clickedImage)"
        :label="item.data.text" />
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { Loading } from 'quasar'
export default {
  methods: {
    ...mapActions('game', ['addClick', 'setClickedText', 'setClickedImage', 'setCheckedImage', 'checkGameStatus']),
    addClickToStore (item) {
      // check if this image was verified before
      if (item.data.checked) {
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
      setTimeout(this.completeClick, 300)
    },
    completeClick (item) {
      if (this.clickedText === this.clickedImage) {
        this.setCheckedImage()
        this.$q.notify({
          timeout: 300,
          message: 'Found',
          progress: true,
          color: 'green'
        })
        setTimeout(this.checkGameStatus, 300)
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
