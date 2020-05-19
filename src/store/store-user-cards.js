const state = {
  'carlosmlozanos@gmail.com': {
    cards: []
  }
}
const mutations = {
  addUserCards (state, payload) {
    state[payload.user].cards = state[payload.user].cards.concat(payload.cards)
  }
}
const actions = {
  addUserCards: {
    root: true,
    handler ({ commit }, payload) {
      commit('addUserCards', payload)
    }
  }
}
const getters = {
  userCards: (state) => (user) => state[user].cards
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
