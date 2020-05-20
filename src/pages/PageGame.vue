<template>
  <div>
    <div v-if="playing">
      <q-page padding>
        <game-info ></game-info>
        <game-image-cards></game-image-cards>
        <game-text-cards></game-text-cards>
      </q-page>
    </div>
    <page-game-finished v-else></page-game-finished>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  components: {
    gameInfo: require('src/components/Game/GameInfo.vue').default,
    gameImageCards: require('src/components/Game/GameImageCards.vue').default,
    gameTextCards: require('src/components/Game/GameTextCards.vue').default,
    pageGameFinished: require('src/pages/PageGameFinished.vue').default
  },
  computed: {
    ...mapGetters('game', ['playing'])
  }
}
</script>
