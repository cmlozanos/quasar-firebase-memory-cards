import Vue from 'vue'
import { uid } from 'quasar'
import { firebase } from 'boot/firebase'

const state = {
  cards: {
    /*
    ID1: {
      url: 'https://placeimg.com/400/300/nature?t=' + Math.random(),
      text: 'texto_1',
      checked: false
    },
    ID2: {
      url: 'https://placeimg.com/400/300/nature?t=' + Math.random(),
      text: 'texto_2',
      checked: false
    },
    ID3: {
      url: 'https://placeimg.com/400/3000/nature?t=' + Math.random(),
      text: 'texto_3',
      checked: false
    },
    ID4: {
      url: 'https://placeimg.com/400/300/nature?t=' + Math.random(),
      text: 'texto_4',
      checked: false
    },
    ID5: {
      url: 'https://placeimg.com/400/300/nature?t=' + Math.random(),
      text: 'texto_5',
      checked: false
    },
    ID6: {
      url: 'https://placeimg.com/400/300/nature?t=' + Math.random(),
      text: 'texto_6',
      checked: false
    },
    ID7: {
      url: 'https://placeimg.com/400/300/nature?t=' + Math.random(),
      text: 'texto_7',
      checked: false
    },
    ID8: {
      url: 'https://placeimg.com/400/300/nature?t=' + Math.random(),
      text: 'texto_8',
      checked: false
    },
    ID9: {
      url: 'https://placeimg.com/400/300/nature?t=' + Math.random(),
      text: 'texto_9',
      checked: false
    }
    */
  }
}
const mutations = {
  addCard (state, payload) {
    Vue.set(state.cards, payload.id, payload.card)
  },
  updateCard (state, payload) {
    Object.assign(state.cards[payload.id], payload.updates)
  },
  deleteCard (state, id) {
    Vue.delete(state.cards, id)
  }
}
const actions = {
  addCard ({ commit, dispatch }, card) {
    const id = uid()
    const payload = {
      id: id,
      card: card
    }
    // commit('addCard', payload)
    dispatch('fbWriteData', payload)
  },
  updateCard ({ commit }, payload) {
    commit('updateCard', payload)
  },
  deleteCard ({ commit }, id) {
    commit('deleteCard', id)
  },
  fbWriteData ({ commit }, payload) {
    firebase.database().ref('cards/' + payload.id).set(payload.card)
  },
  fbReadData ({ commit }, payload) {
    // const uid = firebase.auth().currentUser.uid
    // const result = firebase.database().ref('cards/' + uid)
    const cards = firebase.database().ref('cards')
    cards.on('child_added', snapshot => {
      commit('addCard', { id: snapshot.key, card: snapshot.val() })
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
