<template>
  <q-page padding>
    <div v-if="playing">
      <game-info ></game-info>
      <game-image-cards></game-image-cards>
      <game-text-cards></game-text-cards>
    </div>
    <game-finished></game-finished>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    gameInfo: require('src/components/Game/GameInfo.vue').default,
    gameImageCards: require('src/components/Game/GameImageCards.vue').default,
    gameTextCards: require('src/components/Game/GameTextCards.vue').default,
    gameFinished: require('src/components/Game/GameFinished.vue').default
  },
  computed: {
    ...mapGetters('game', ['timeStart', 'playing', 'finished', 'interval', 'size', 'end']),
    ...mapGetters('cards', ['cards'])
  },
  methods: {
    ...mapActions('game', ['setTimeSpent', 'setItemImages', 'setItemTexts', 'setCardsSelected', 'saveInterval', 'initStore', 'setEnd']),
    calculateTimeSpent () {
      const spent = Date.now() - this.timeStart
      this.setTimeSpent(spent)
    }
  },
  mounted () {
  }
}
</script>
