<template>
  <q-page class="flex flex-center bg-image" :class="imageClass">
    <div class="absolute-bottom q-pb-xl q-pl-sm q-pr-sm">
      <q-btn-group spread v-if="finished && !end">
        <q-btn
          size="medium"
          color="blue-10"
          class="col-6"
          icon="play_arrow"
          @click="initGame">
          Next Play
        </q-btn>
        <q-btn
          size="medium"
          color="blue-10"
          class="col-6"
          icon="list"
          to="/gameplays">
          Game Plays
        </q-btn>
      </q-btn-group>
      <q-btn-group spread v-if="end">
        <q-btn
          size="medium"
          color="blue-10"
          class="col-6"
          icon="list"
          to="/cards">
          Cards
        </q-btn>
        <q-btn
          size="medium"
          color="blue-10"
          class="col-6"
          icon="list"
          to="/gameplays">
          Game Plays
        </q-btn>
      </q-btn-group>
      <q-btn-group spread v-if="!finished && !end">
        <q-btn
          size="medium"
          color="blue-10"
          class="col-6"
          icon="play_arrow"
          @click="initGame">
          START
        </q-btn>
      </q-btn-group>
    </div>
  </q-page>
</template>
<script>
import { shuffle } from 'src/functions/function-shuffle-array'
import { mapGetters, mapActions } from 'vuex'
import { calcUserCards } from 'src/functions/function-game-calculate-cards'
export default {
  computed: {
    ...mapGetters('game', ['timeStart', 'playing', 'finished', 'interval', 'size', 'end']),
    ...mapGetters('cards', ['cards']),
    ...mapGetters('userCards', ['userCards']),
    imageClass () {
      if (this.finished && !this.end) {
        return 'finished-not-end'
      } else if (!this.finished && !this.end) {
        return 'start'
      } else if (this.end) {
        return 'end'
      }
      return ''
    }
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
<style scope>
.bg-image {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.bg-image.finished-not-end{
  background-image: url('~assets/game-finished.png');
}
.bg-image.end{
  background-image: url('~assets/game-end.jpg');
}
.bg-image.start{
  background-image: url('~assets/game-start.jpg');
}
.eighty-vertical-hight{
  width: 100vh !important;
  height: 100vh !important;
}
</style>
