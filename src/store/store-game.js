const state = {
  clicks: 0,
  clickedImage: 0,
  clickedText: 0
}

const mutations = {
  addClick (state, value) {
    state.clicks += value
  },
  setClickedImage (state, value) {
    state.clickedImage = value
  },
  setClickedText (state, value) {
    state.clickedText = value
  },
  setCheckedImage (state, item) {
    console.log('set checked: ' + item.id)
  }
}

const actions = {
  addClick ({ commit }, value) {
    commit('addClick', value)
  },
  setClickedImage ({ commit }, value) {
    commit('setClickedImage', value)
  },
  setClickedText ({ commit }, value) {
    commit('setClickedText', value)
  },
  setCheckedImage ({ commit }, item) {
    commit('setCheckedImage', item)
  }
}

const getters = {
  clicks: (state) => state.clicks,
  clickedImage: (state) => state.clickedImage,
  clickedText: (state) => state.clickedText
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
