const state = {
  loggedIn: false,
  admin: false,
  user: {
    name: 'Carlos'
  }
}

const mutations = {
  setLoggedIn (state, value) {
    state.loggedIn = value
  },
  setAdmin (state, value) {
    state.admin = value
  },
  setUser (state, value) {
    state.user = value
  }
}

const actions = {
  registerUser ({ commit }, payload) {
  },
  logoutUser ({ commit }) {
    commit('setLoggedIn', false)
    commit('setAdmin', false)
    commit('setUser', { name: null })
  },
  loginUser ({ commit }, payload) {
    commit('setLoggedIn', true)
    commit('setAdmin', true)
    commit('setUser', { name: 'Carlos' })
  },
  setLoggedIn ({ commit }, value) {
    commit('setLoggedIn', value)
  }
}

const getters = {
  loggedIn: (state) => state.loggedIn,
  admin: (state) => state.admin,
  user: (state) => state.user
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
