import Vue from 'vue'
import { uid } from 'quasar'
import { firebase } from 'boot/firebase'

const state = {
  gameplays: {}
}
const mutations = {
  addGameplay (state, payload) {
    Vue.set(state.gameplays, payload.id, payload.gameplay)
  },
  setGamePlays (state, value) {
    state.gameplays = value
  },
  resetGamePlays (state) {
    state.gameplays = {}
  }
}
const actions = {
  addGameplay: {
    root: true,
    handler ({ commit, dispatch }, gameplay) {
      const id = uid()
      const payload = {
        id: id,
        gameplay: gameplay
      }
      commit('addGameplay', payload)
      dispatch('fbWriteData', state.gameplays)
    }
  },
  fbWriteData ({ commit }, value) {
    const uid = firebase.auth().currentUser.uid
    firebase.database().ref('user-gameplays/' + uid + '/gameplays').set(value)
  },
  fbReadData ({ commit }) {
    const uid = firebase.auth().currentUser.uid
    const gameplaysRef = firebase.database().ref('user-gameplays/' + uid + '/gameplays')
    gameplaysRef.on('value', snapshot => {
      if (snapshot.val() !== null) {
        commit('setGamePlays', snapshot.val())
      } else {
        commit('resetGamePlays')
      }
    })
  }
}
const getters = {
  gameplays: (state) => state.gameplays
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
