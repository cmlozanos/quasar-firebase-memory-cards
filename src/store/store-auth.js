import { LocalStorage, Loading } from 'quasar'
import { firebase } from 'boot/firebase'
import { showErrorMessage } from 'src/functions/function-show-error-message'

const state = {
  loggedIn: false,
  user: {
    name: null,
    mail: null,
    image: null,
    admin: false
  }
}

const mutations = {
  setLoggedIn (state, value) {
    state.loggedIn = value
  },
  setUser (state, value) {
    state.user = value
  },
  resetUser (state, value) {
    state.user = { name: null, mail: null, image: null, admin: false }
  }
}

const actions = {
  registerUser ({ commit, dispatch }, payload) {
    Loading.show()
    firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then((response) => {
        const email = response.user.email
        const data = {
          name: email.substr(0, email.indexOf('@')),
          mail: email,
          image: 'https://cdn.quasar.dev/img/boy-avatar.png'
        }
        console.log('userData: ' + JSON.stringify(data))
        dispatch('fbWriteData', data)
        Loading.hide()
      })
      .catch((error) => {
        Loading.hide()
        showErrorMessage(error.message)
      })
    Loading.hide()
  },
  updateUser ({ commit, dispatch }, data) {
    console.log('state: ' + JSON.stringify(state))
    const admin = state.user.admin === true
    const userData = {
      name: data.name,
      mail: state.user.mail,
      image: data.image,
      admin: admin
    }
    console.log('userData: ' + JSON.stringify(userData))
    dispatch('fbWriteData', userData)
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
        LocalStorage.set('loggedIn', true)
        dispatch('fbReadData')
        dispatch('cards/fbReadData', null, { root: true })
        dispatch('userCards/fbReadData', null, { root: true })
        dispatch('gameplays/fbReadData', null, { root: true })
        if (this.$router.currentRoute.path !== '/') {
          this.$router.replace('/')
        }
      } else {
        commit('setLoggedIn', false)
        commit('resetUser')
        LocalStorage.set('loggedIn', false)
        if (this.$router.currentRoute.path !== '/auth') {
          this.$router.replace('/auth')
        }
      }
    })
  },
  fbWriteData ({ commit }, value) {
    const uid = firebase.auth().currentUser.uid
    firebase.database().ref('users/' + uid).set(value)
  },
  fbReadData ({ commit }) {
    const uid = firebase.auth().currentUser.uid
    const ref = firebase.database().ref('users/' + uid)
    ref.on('value', snapshot => {
      if (snapshot.val() !== null) {
        commit('setUser', snapshot.val())
      } else {
        commit('resetUser')
      }
    })
  }
}

const getters = {
  loggedIn: (state) => state.loggedIn,
  admin: (state) => state.user.admin,
  user: (state) => state.user
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
