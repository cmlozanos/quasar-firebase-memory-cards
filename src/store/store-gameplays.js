import Vue from 'vue'
import { uid } from 'quasar'

const state = {
  gameplays: {
  }
}
const mutations = {
  addGameplay (state, payload) {
    console.log('addGamePlay')
    Vue.set(state.gameplays, payload.id, payload.gameplay)
  },
  updateGameplay (state, payload) {
    Object.assign(state.gameplays[payload.id], payload.updates)
  },
  deleteGameplay (state, id) {
    Vue.delete(state.gameplays, id)
  }
}
const actions = {
  addGameplay: {
    root: true,
    handler ({ commit }, gameplay) {
      const id = uid()
      const payload = {
        id: id,
        gameplay: gameplay
      }
      commit('addGameplay', payload)
    }
  },
  updateGameplay ({ commit }, payload) {
    commit('updateGameplay', payload)
  },
  deleteGameplay ({ commit }, id) {
    commit('deleteGameplay', id)
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
