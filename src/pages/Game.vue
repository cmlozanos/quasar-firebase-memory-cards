<template>
  <q-page padding>
    <div v-if="playing">
      <game-info ></game-info>
      <game-image-cards></game-image-cards>
      <game-text-cards></game-text-cards>
    </div>
    <div
      class="q-col-gutter-md row items-start"
      v-if="!playing"
    >
      <div class="col-12">
        <q-img v-if="finished" src="~assets/game-finished.png">
          <div class="absolute-bottom">
            <q-btn outline icon="play_arrow" class="full-width" @click="initGame">Play Again</q-btn>
          </div>
        </q-img>
        <q-img v-if="!finished" src="~assets/game-press-start.jpg">
          <div class="absolute-bottom">
            <q-btn outline icon="play_arrow" class="full-width" @click="initGame">START</q-btn>
          </div>
        </q-img>
      </div>
    </div>
  </q-page>
</template>

<script>
import { shuffle } from 'src/functions/function-shuffle-array'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    gameInfo: require('src/components/GameInfo.vue').default,
    gameImageCards: require('src/components/GameImageCards.vue').default,
    gameTextCards: require('src/components/GameTextCards.vue').default
  },
  computed: {
    ...mapGetters('game', ['timeStart', 'playing', 'finished', 'interval']),
    ...mapGetters('cards', ['cards'])
  },
  methods: {
    ...mapActions('game', ['setTimeSpent', 'setItemImages', 'setItemTexts', 'setCardsSelected', 'saveInterval', 'initStore']),
    calculateTimeSpent () {
      const spent = Date.now() - this.timeStart
      this.setTimeSpent(spent)
    },
    initGame () {
      this.initStore()

      if (this.interval) {
        clearInterval(this.interval)
      }
      const interval = setInterval(this.calculateTimeSpent, 1000)
      this.saveInterval(interval)

      const cardsShuffled = []
      Object.entries(this.cards).filter(([key, value]) => !value.checked).forEach(([key, value]) => cardsShuffled.push({ id: key, data: value }))
      shuffle(cardsShuffled)
      // split by 3,4,6,8,9
      const cardsSelected = cardsShuffled.slice(0, 4)
      this.setCardsSelected(cardsSelected)

      const images = []
      cardsSelected.forEach(element => images.push(element))
      shuffle(images)
      this.setItemImages(images)

      const texts = []
      cardsSelected.forEach(element => texts.push(element))
      shuffle(texts)
      this.setItemTexts(texts)
    }
  },
  mounted () {
    this.initGame()
  }
}
</script>
