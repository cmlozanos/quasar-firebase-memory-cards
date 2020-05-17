import Vue from 'vue'
import { uid } from 'quasar'

const state = {
  cards: {
    ID1: {
      url: 'https://placeimg.com/500/300/nature?t=' + Math.random(),
      text: 'texto_1',
      checked: false
    },
    ID2: {
      url: 'https://placeimg.com/500/300/nature?t=' + Math.random(),
      text: 'texto_2',
      checked: false
    },
    ID3: {
      url: 'https://placeimg.com/500/300/nature?t=' + Math.random(),
      text: 'texto_3',
      checked: false
    },
    ID4: {
      url: 'https://placeimg.com/500/300/nature?t=' + Math.random(),
      text: 'texto_4',
      checked: false
    },
    ID5: {
      url: 'https://placeimg.com/500/300/nature?t=' + Math.random(),
      text: 'texto_5',
      checked: false
    },
    ID6: {
      url: 'https://placeimg.com/500/300/nature?t=' + Math.random(),
      text: 'texto_6',
      checked: false
    },
    ID7: {
      url: 'https://placeimg.com/500/300/nature?t=' + Math.random(),
      text: 'texto_7',
      checked: false
    },
    ID8: {
      url: 'https://placeimg.com/500/300/nature?t=' + Math.random(),
      text: 'texto_8',
      checked: false
    },
    ID9: {
      url: 'https://placeimg.com/500/300/nature?t=' + Math.random(),
      text: 'texto_9',
      checked: false
    }
  }
}
const mutations = {
  addCard (state, payload) {
    Vue.set(state.cards, payload.id, payload.card)
  }
}
const actions = {
  addCard ({ commit }, card) {
    const id = uid()
    const payload = {
      id: id,
      card: card
    }
    commit('addCard', payload)
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
