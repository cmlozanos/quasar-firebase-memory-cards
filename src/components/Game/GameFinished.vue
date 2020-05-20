<template>
  <div
    class="q-col-gutter-md row items-start"
    v-if="!playing"
  >
    <div class="col-12">
      <q-img v-if="finished && !end" src="~assets/game-finished.png">
        <div class="absolute-bottom row">
          <q-btn outline icon="play_arrow" class="col-6" @click="initGame">Next Play</q-btn>
          <q-btn outline icon="list" class="col-6" to="/gameplays">Game Plays</q-btn>
        </div>
      </q-img>
      <q-img v-if="!finished && !end" src="~assets/game-press-start.jpg">
        <div class="absolute-bottom">
          <q-btn outline icon="play_arrow" class="full-width" @click="initGame">START</q-btn>
        </div>
      </q-img>
      <q-img v-if="end" src="~assets/game-end.jpg">
        <div class="absolute-bottom row">
          <q-btn outline icon="list" class="col-6" to="/cards">Cards</q-btn>
          <q-btn outline icon="list" class="col-6" to="/gameplays">Game Plays</q-btn>
        </div>
      </q-img>
    </div>
  </div>
</template>
<script>
import { shuffle } from 'src/functions/function-shuffle-array'
import { mapGetters, mapActions } from 'vuex'
import { calcUserCards } from 'src/functions/function-game-calculate-cards'
export default {
  computed: {
    ...mapGetters('game', ['timeStart', 'playing', 'finished', 'interval', 'size', 'end']),
    ...mapGetters('cards', ['cards']),
    ...mapGetters('userCards', ['userCards'])
  },
  methods: {
    ...mapActions('game', ['exitPlaying', 'setTimeSpent', 'setItemImages', 'setItemTexts', 'setCardsSelected', 'saveInterval', 'initStore', 'setEnd']),
    calculateTimeSpent () {
      const spent = Date.now() - this.timeStart
      this.setTimeSpent(spent)
    },
    userCardsPlayed () {
      return calcUserCards(this.cards, this.userCards, true)
    },
    userCardsPending () {
      return calcUserCards(this.cards, this.userCards, false)
    },
    initGame () {
      const pendingCards = Object.entries(this.userCardsPending())
      console.log('pendingCards.length: ' + pendingCards.length)
      console.log('size: ' + this.size)
      if (pendingCards.length === 0) {
        this.$q.notify({
          timeout: 500,
          message: 'No more games available',
          color: 'red'
        })
        this.setEnd(true)
        return
      } else if (pendingCards.length < this.size) {
        this.$q.notify({
          timeout: 500,
          message: 'There is no items enough',
          color: 'red'
        })
        this.setEnd(true)
        return
      }
      this.initStore()

      if (this.interval) {
        clearInterval(this.interval)
      }
      const interval = setInterval(this.calculateTimeSpent, 1000)
      this.saveInterval(interval)

      const cardsShuffled = []
      pendingCards.forEach(([key, value]) => cardsShuffled.push({ id: key, data: value }))
      shuffle(cardsShuffled)
      const cardsSelected = cardsShuffled.slice(0, this.size)
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
  }
}
</script>
