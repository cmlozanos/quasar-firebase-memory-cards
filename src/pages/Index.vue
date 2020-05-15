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
    ...mapGetters('game', ['timeStart', 'items'])
  },
  methods: {
    ...mapActions('game', ['setTimeStart', 'setTimeSpent', 'setItemImages', 'setItemTexts'])
  },
  mounted () {
    // init game
    this.setTimeStart()
    setInterval(() => { this.setTimeSpent(Date.now() - this.timeStart) }, 1000)

    const images = []
    this.items.forEach(item => images.push(item))
    shuffle(images)
    this.setItemImages(images)

    const texts = []
    this.items.forEach(item => texts.push(item))
    shuffle(texts)
    this.setItemTexts(texts)
  }
}
</script>
