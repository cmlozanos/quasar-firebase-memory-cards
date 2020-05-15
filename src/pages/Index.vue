<template>
  <q-page padding>
    <game-info :timeStart="timeStart" :timeSpent="timeSpent"></game-info>
    <game-image-cards :items="images"></game-image-cards>
    <game-text-cards :items="texts"></game-text-cards>
  </q-page>
</template>

<script>
import { shuffle } from 'src/functions/function-shuffle-array'
export default {
  components: {
    gameInfo: require('src/components/GameInfo.vue').default,
    gameImageCards: require('src/components/GameImageCards.vue').default,
    gameTextCards: require('src/components/GameTextCards.vue').default
  },
  data () {
    return {
      timeStart: Date.now(),
      timeSpent: null,
      images: [],
      texts: [],
      items: [{
        id: 1,
        url: 'https://placeimg.com/500/300/nature?t=' + Math.random(),
        text: 'texto_1',
        checked: false
      }, {
        id: 2,
        url: 'https://placeimg.com/500/300/nature?t=' + Math.random(),
        text: 'texto_2',
        checked: false
      }, {
        id: 3,
        url: 'https://placeimg.com/500/300/nature?t=' + Math.random(),
        text: 'texto_3',
        checked: false
      }, {
        id: 4,
        url: 'https://placeimg.com/500/300/nature?t=' + Math.random(),
        text: 'texto_4',
        checked: false
      }, {
        id: 5,
        url: 'https://placeimg.com/500/300/nature?t=' + Math.random(),
        text: 'texto_5',
        checked: false
      }, {
        id: 6,
        url: 'https://placeimg.com/500/300/nature?t=' + Math.random(),
        text: 'texto_6',
        checked: false
      }, {
        id: 7,
        url: 'https://placeimg.com/500/300/nature?t=' + Math.random(),
        text: 'texto_7',
        checked: false
      }, {
        id: 8,
        url: 'https://placeimg.com/500/300/nature?t=' + Math.random(),
        text: 'texto_8',
        checked: false
      }, {
        id: 9,
        url: 'https://placeimg.com/500/300/nature?t=' + Math.random(),
        text: 'texto_9',
        checked: false
      }]
    }
  },
  mounted () {
    this.timeSpent = setInterval(() => {
      this.timeSpent = new Date(Date.now() - this.timeStart)
    }, 1000)

    this.items.forEach(item => this.images.push(item))
    console.log('images: ' + JSON.stringify(this.images))
    shuffle(this.images)
    console.log('images: ' + JSON.stringify(this.images))

    this.items.forEach(item => this.texts.push(item))
    console.log('texts: ' + JSON.stringify(this.texts))
    shuffle(this.texts)
    console.log('texts: ' + JSON.stringify(this.texts))
  }
}
</script>
