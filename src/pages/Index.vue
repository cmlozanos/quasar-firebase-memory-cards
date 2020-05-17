<template>
  <q-page padding>
    <game-info ></game-info>
    <game-image-cards></game-image-cards>
    <game-text-cards></game-text-cards>
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
    ...mapGetters('game', ['timeStart']),
    ...mapGetters('cards', ['cards'])
  },
  methods: {
    ...mapActions('game', ['setTimeStart', 'setTimeSpent', 'setItemImages', 'setItemTexts']),
    calculateTimeSpent () {
      const spent = Date.now() - this.timeStart
      this.setTimeSpent(spent)
    },
    initGame () {
      // init game
      this.setTimeStart()
      setInterval(this.calculateTimeSpent, 1000)

      const cardsShuffled = []
      Object.entries(this.cards).forEach(([key, value]) => cardsShuffled.push({ id: key, data: value }))
      shuffle(cardsShuffled)
      const cardsSelected = cardsShuffled.slice(0, 4)

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
