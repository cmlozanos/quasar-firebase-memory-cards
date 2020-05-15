<template>
  <div class="row" >
    <div class="col-4 q-pa-xs" v-for="(item, index) in images" :key=index>
      <q-img
        :src="item.url"
        :ratio="4/3"
        class="rounded-borders"
        @click="addClickToStore(item)"
      >
        <div v-if="(clickedImage === item.id) || item.checked" class="absolute-full text-subtitle2 flex flex-center">
          <span v-if="!item.checked">{{item.id}}</span>
          <q-icon
            :color="item.checked? 'green' : 'warning'"
            :name="item.checked ? 'done_all' : 'done'"
          />
        </div>
      </q-img>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  methods: {
    ...mapActions('game', ['setClickedImage']),
    addClickToStore (item) {
      if (!item.checked) {
        if (item.id === this.clickedImage) {
          this.setClickedImage(0)
        } else {
          this.setClickedImage(item.id)
        }
      }
    }
  },
  computed: {
    ...mapGetters('game', ['clickedImage', 'images'])
  }
}
</script>
