import { uid } from 'quasar'
import { firebase } from 'boot/firebase'

const state = {
  cards: {}
}
const mutations = {
  setCards (state, value) {
    state.cards = value
  }
}
const actions = {
  setCards ({ commit }, value) {
    commit('setCards', value)
  },
  addCard ({ dispatch }, card) {
    const id = uid()
    const payload = {
      id: id,
      card: card
    }
    dispatch('fbWriteData', payload)
  },
  updateCard ({ dispatch }, payload) {
    dispatch('fbWriteData', { id: payload.id, card: payload.updates })
  },
  deleteCard ({ dispatch }, id) {
    dispatch('fbWriteData', { id: id, card: null })
  },
  fbWriteData ({ commit }, payload) {
    firebase.database().ref('cards/' + payload.id).set(payload.card)
  },
  fbReadData ({ commit }) {
    const cards = firebase.database().ref('cards')
    cards.on('value', snapshot => {
      commit('setCards', snapshot.val())
    })
  }
}
const getters = {
  cards: (state) => state.cards
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
