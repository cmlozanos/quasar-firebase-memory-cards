<template>
  <div>
    <div class="row" >
      <div class="col-4 q-pa-xs" v-for="(item, index) in items" :key=index>
        <q-img
          :src="item.url"
          :ratio="4/3"
          class="rounded-borders"
          @click="addClickToStore(item)"
        >
          <div v-if="(clickedImage === item.id) || item.checked" class="absolute-full text-subtitle2 flex flex-center">
            <span>{{item.id}}</span>
            <q-icon
              :color="item.checked? 'green' : 'warning'"
              :name="item.checked ? 'done_all' : 'done'"
            />
          </div>
        </q-img>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  props: ['items'],
  methods: {
    ...mapActions('game', ['setClickedImage']),
    addClickToStore (item) {
      if (!item.checked) {
        this.setClickedImage(item.id)
      }
    }
  },
  computed: {
    ...mapGetters('game', ['clickedImage'])
  }
}
</script>
