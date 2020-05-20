import { LocalStorage, Loading } from 'quasar'
import { firebase } from 'boot/firebase'
import { showErrorMessage } from 'src/functions/function-show-error-message'

const state = {
  loggedIn: false,
  admin: false,
  user: {
    name: null,
    mail: null,
    image: null
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
    firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then((response) => {
        Loading.hide()
      })
      .catch((error) => {
        Loading.hide()
        showErrorMessage(error.message)
      })
    Loading.hide()
  },
  logoutUser ({ commit }) {
    Loading.show()
    firebase.auth().signOut()
    Loading.hide()
  },
  loginUser ({ commit }, payload) {
    Loading.show()
    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then((response) => {
        Loading.hide()
      })
      .catch((error) => {
        Loading.hide()
        showErrorMessage(error.message)
      })
  },
  handleAuthStateChange ({ commit, dispatch }) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        commit('setLoggedIn', true)
        commit('setAdmin', true)
        const data = {
          name: user.email.substr(0, user.email.indexOf('@')),
          mail: user.email,
          image: 'https://cdn.quasar.dev/img/boy-avatar.png'
        }
        commit('setUser', data)
        LocalStorage.set('loggedIn', true)
        dispatch('cards/fbReadData', null, { root: true })
        dispatch('userCards/fbReadData', null, { root: true })
        if (this.$router.currentRoute.path !== '/') {
          this.$router.replace('/')
        }
      } else {
        commit('setLoggedIn', false)
        commit('setAdmin', false)
        commit('setUser', { name: null, mail: null, image: null })
        LocalStorage.set('loggedIn', false)
        if (this.$router.currentRoute.path !== '/auth') {
          this.$router.replace('/auth')
        }
      }
    })
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
