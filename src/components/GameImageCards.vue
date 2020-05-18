<template>
  <div class="row" >
    <div :class="images.length % 3 == 0 ? 'col-4' : 'col-6'" class="q-pa-xs" v-for="(item, index) in images" :key=index>
      <q-img
        :src="item.data.url"
        :ratio="4/3"
        class="rounded-borders"
        @click="addClickToStore(item)"
      >
        <div v-if="(clickedImage === item.id) || item.data.checked" class="absolute-full text-subtitle2 flex flex-center">
          <span v-if="item.data.checked">{{item.data.text}}</span>
          <q-icon v-if="!item.data.checked"
            size="xl"
            :color="item.data.checked? 'green' : 'warning'"
            :name="item.data.checked ? 'done_all' : 'done'"
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
      if (!item.data.checked) {
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
