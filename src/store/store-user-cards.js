import { firebase } from 'boot/firebase'

const state = {
  cards: []
}
const mutations = {
  addUserCards (state, payload) {
    state.cards = state.cards.concat(payload.cards)
  },
  addUserCard (state, payload) {
    state.cards.push(payload.card)
  },
  resetUserCards (state) {
    state.cards = []
  }
}
const actions = {
  resetUserCards ({ commit }) {
    commit('resetUserCards')
  },
  addUserCards: {
    root: true,
    handler ({ commit, dispatch }, payload) {
      let fullCards = null
      if (state.cards === null) {
        fullCards = payload.cards
      } else {
        fullCards = state.cards.concat(payload.cards)
      }
      payload.cards = fullCards
      dispatch('fbWriteData', payload)
    }
  },
  fbWriteData ({ commit }, payload) {
    const uid = firebase.auth().currentUser.uid
    firebase.database().ref('user-cards/' + uid + '/cards').set(payload.cards)
  },
  fbReadData ({ commit }, payload) {
    const uid = firebase.auth().currentUser.uid
    const cards = firebase.database().ref('user-cards/' + uid + '/cards')
    cards.on('value', snapshot => {
      if (snapshot.val() !== null) {
        commit('addUserCards', { cards: snapshot.val() })
      } else {
        commit('resetUserCards')
      }
    })
  }
}
const getters = {
  /* userCards: (state) => (user) => state[user].cards */
  userCards: (state) => state.cards
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
