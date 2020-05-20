<template>
  <div class="q-pa-md">
    <q-page>
      <q-banner class="bg-grey-3 full-width" v-if="Object.entries(userCardsPending).length === 0 && Object.entries(userCardsPlayed).length === 0">
        <template v-slot:avatar>
          <q-icon name="check" color="green" />
        </template>
        No Cards found
      </q-banner>
      <div v-if="Object.entries(userCardsPending).length !== 0">
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
      </div>
      <div v-if="Object.entries(userCardsPlayed).length > 0">
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
import { calcUserCards } from 'src/functions/function-game-calculate-cards'
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
      return calcUserCards(this.cards, this.userCards, true)
    },
    userCardsPending () {
      return calcUserCards(this.cards, this.userCards, false)
    }
  }
}
</script>
