<template>
  <div>
    <q-space/>
    <div class="row">
      <div class="col-4 q-pa-xs" v-for="(item, index) in items" :key=index>
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
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { Loading } from 'quasar'
export default {
  props: ['items'],
  methods: {
    ...mapActions('game', ['addClick', 'setClickedText', 'setClickedImage', 'setCheckedImage']),
    addClickToStore (item, clickedImage) {
      // check if this image was verified before
      if (item.checked) {
        return
      }

      // check if has an image checked
      if (clickedImage === 0) {
        this.$q.notify({
          timeout: 200,
          message: 'Select an image first',
          color: 'red'
        })
        return
      }
      console.log('item: ' + item)
      this.setClickedText(item.id)
      Loading.show()
      this.addClick(1)
      setTimeout(() => {
        Loading.hide()
        this.setClickedImage(0)

        if (item.id === clickedImage) {
          this.setCheckedImage(item)
          item.checked = true
          this.$q.notify({
            timeout: 200,
            message: 'Found',
            color: 'green'
          })
        } else {
          this.$q.notify({
            timeout: 200,
            message: 'Not Found',
            color: 'red'
          })
        }
      }, 300)
    }
  },
  computed: {
    ...mapGetters('game', ['clickedImage', 'clickedText'])
  }
}
</script>
