import { firebase } from 'boot/firebase'

const state = {
  cards: []
}
const mutations = {
  addUserCard (state, payload) {
    state.cards.push(payload.card)
  },
  setUserCards (state, value) {
    state.cards = value
  },
  resetUserCards (state) {
    state.cards = []
  }
}
const actions = {
  resetUserCards ({ commit }) {
    commit('resetUserCards')
  },
  setUserCards ({ commit }, value) {
    commit('setUserCards', value)
  },
  addUserCards: {
    root: true,
    handler ({ commit, dispatch }, value) {
      let fullCards = null
      if (state.cards === null) {
        fullCards = value
      } else {
        fullCards = state.cards.concat(value)
      }
      value = fullCards
      dispatch('fbWriteData', value)
    }
  },
  fbWriteData ({ commit }, value) {
    const uid = firebase.auth().currentUser.uid
    firebase.database().ref('user-cards/' + uid + '/cards').set(value)
  },
  fbReadData ({ commit }) {
    const uid = firebase.auth().currentUser.uid
    const cards = firebase.database().ref('user-cards/' + uid + '/cards')
    cards.on('value', snapshot => {
      if (snapshot.val() !== null) {
        commit('setUserCards', snapshot.val())
      } else {
        commit('resetUserCards')
      }
    })
  }
}
const getters = {
  userCards: (state) => state.cards
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
