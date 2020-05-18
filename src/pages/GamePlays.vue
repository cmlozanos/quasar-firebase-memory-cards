<template>
  <div class="q-pa-md">
    <q-page>
      <q-banner class="bg-grey-3 full-width" v-if="Object.entries(gameplays).length === 0">
        <template v-slot:avatar>
          <q-icon name="check" color="green" />
        </template>
        No Gameplays found
        <template v-slot:action>
          <q-btn flat color="primary" label="Play a Game" to="/game"/>
        </template>
      </q-banner>
      <q-list separator>
        <gameplay
          v-for="(gameplay,index) in gameplays"
          :key="index"
          :gameplay="gameplay"
          :id="index">
        </gameplay>
      </q-list>
    </q-page>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  components: {
    gameplay: require('components/Gameplay/Gameplay.vue').default
  },
  computed: {
    ...mapGetters('gameplays', ['gameplays'])
  }
}
</script>
