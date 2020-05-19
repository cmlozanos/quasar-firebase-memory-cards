<template>
  <div class="q-pa-md">
    <q-page>
      <q-banner class="bg-grey-3">
        <template v-slot:avatar>
          <q-icon name="lock" color="orange-5" />
        </template>
        Pending
      </q-banner>
      <q-list separator>
        <card
          v-for="(card,index) in userCardsPending"
          :key="index"
          :card="card"
          :id="index">
        </card>
      </q-list>
      <div v-if="userCardsByMail.length > 0">
        <q-banner class="bg-grey-3 q-pt-sm">
          <template v-slot:avatar>
            <q-icon name="lock_open" color="green-5" />
          </template>
          Played
        </q-banner>
        <q-list separator>
          <user-card
            v-for="(card,index) in userCardsPlayed"
            :key="index"
            :card="card"
            :id="index">
          </user-card>
        </q-list>
      </div>
    </q-page>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  components: {
    card: require('components/Card/Card.vue').default,
    userCard: require('components/UserCard/UserCard.vue').default
  },
  computed: {
    ...mapGetters('auth', ['user']),
    ...mapGetters('userCards', ['userCards']),
    ...mapGetters('cards', ['cards']),
    userCardsPlayed () {
      return this.calcUserCards(this.cards, this.userCardsByMail, true)
    },
    userCardsPending () {
      return this.calcUserCards(this.cards, this.userCardsByMail, false)
    },
    userCardsByMail () {
      return this.userCards(this.user.mail)
    }
  },
  methods: {
    calcUserCards: (cards, userCards, played) => {
      const userCardsCalculated = Object.entries(cards).filter(([key, card]) => {
        const userCardIndex = userCards.indexOf(key)
        if (played) {
          return userCardIndex >= 0
        }
        return userCardIndex < 0
      })
      return Object.fromEntries(userCardsCalculated)
    }
  }
}
</script>
