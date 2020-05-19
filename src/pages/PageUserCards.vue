<template>
  <div class="q-pa-md">
    <q-page>
      <q-banner class="bg-grey-3 full-width" v-if="Object.entries(userCardsPlayed).length === 0">
        <template v-slot:avatar>
          <q-icon name="check" color="green" />
        </template>
        No Cards Played found
        <template v-slot:action>
          <q-btn flat color="primary" label="Play a Game" to="/game"/>
        </template>
      </q-banner>
      <q-list separator>
        <user-card
          v-for="(card,index) in userCardsPlayed"
          :key="index"
          :card="card"
          :id="index">
        </user-card>
      </q-list>
    </q-page>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  components: {
    userCard: require('components/UserCard/UserCard.vue').default
  },
  computed: {
    ...mapGetters('auth', ['user']),
    ...mapGetters('userCards', ['userCards']),
    ...mapGetters('cards', ['cards']),
    userCardsPlayed () {
      const userCards = this.userCards(this.user.mail)
      const userCardsCalculated = Object.entries(this.cards).filter(([key, card]) => {
        const userCardIndex = userCards.indexOf(key)
        return userCardIndex >= 0
      })
      return Object.fromEntries(userCardsCalculated)
    }
  }
}
</script>
