const state = {
  clicks: 0,
  clickedImage: 0,
  clickedText: 0,
  timeStart: null,
  timeSpent: null,
  itemImages: [],
  itemTexts: [],
  cardsSelected: []
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
  setCheckedImage (state) {
    const index = state.cardsSelected.findIndex(card => card.id === state.clickedImage)
    state.cardsSelected[index].data.checked = true
  },
  setTimeStart (state) {
    state.timeStart = Date.now()
  },
  setTimeSpent (state, value) {
    state.timeSpent = value
  },
  setItemImages (state, value) {
    state.itemImages = value
  },
  setItemTexts (state, value) {
    state.itemTexts = value
  },
  setCardsSelected (state, value) {
    state.cardsSelected = value
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
  setCheckedImage ({ commit }) {
    commit('setCheckedImage')
  },
  setTimeStart ({ commit }) {
    commit('setTimeStart')
  },
  setTimeSpent ({ commit }, value) {
    commit('setTimeSpent', value)
  },
  setItemImages ({ commit }, value) {
    commit('setItemImages', value)
  },
  setItemTexts ({ commit }, value) {
    commit('setItemTexts', value)
  },
  setCardsSelected ({ commit }, value) {
    commit('setCardsSelected', value)
  }
}

const getters = {
  clicks: (state) => state.clicks,
  clickedImage: (state) => state.clickedImage,
  clickedText: (state) => state.clickedText,
  timeStart: (state) => state.timeStart,
  timeSpent: (state) => state.timeSpent,
  cardsSelected: (state) => state.cardsSelected,
  images: (state) => state.itemImages,
  texts: (state) => state.itemTexts
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
