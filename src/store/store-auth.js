import { LocalStorage, Loading } from 'quasar'

const state = {
  loggedIn: false,
  admin: false,
  user: {
    name: 'Carlos',
    mail: 'carlosmlozanos@gmail.com'
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
    Loading.show()
    Loading.hide()
  },
  logoutUser ({ commit }) {
    Loading.show()
    commit('setLoggedIn', false)
    commit('setAdmin', false)
    commit('setUser', { name: null, mail: null })

    /** THIS MUST BE INTO HANDLE */
    LocalStorage.set('loggedIn', false)
    this.$router.replace('/auth')
    /** THIS MUST BE INTO HANDLE */

    Loading.hide()
  },
  loginUser ({ commit }, payload) {
    Loading.show()
    commit('setLoggedIn', true)
    commit('setAdmin', true)
    commit('setUser', { name: 'Carlos', mail: 'carlosmlozanos@gmail.com' })

    /** THIS MUST BE INTO HANDLE */
    LocalStorage.set('loggedIn', true)
    if (this.$router.currentRoute.path !== '/') {
      this.$router.replace('/')
    }
    /** THIS MUST BE INTO HANDLE */

    Loading.hide()
  },
  handleAuthStateChange ({ commit, dispatch }) {
    /*
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('logged in')
        commit('setLoggedIn', true)
        LocalStorage.set('loggedIn', true)
        if (this.$router.currentRoute.path !== '/') {
          this.$router.replace('/')
        }
      } else {
        console.log('logged out')
        commit('setLoggedIn', false)
        LocalStorage.set('loggedIn', false)
        this.$router.replace('/auth')
      }
    })
    */
    dispatch('loginUser')
    if (this.$router.currentRoute.path !== '/') {
      this.$router.replace('/')
    }
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
