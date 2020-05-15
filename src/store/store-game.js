const state = {
  clicks: 0,
  clickedImage: 0,
  clickedText: 0,
  timeStart: null,
  timeSpent: null,
  itemImages: [],
  itemTexts: [],
  items: [{
    id: 1,
    url: 'https://placeimg.com/500/300/nature?t=' + Math.random(),
    text: 'texto_1',
    checked: false
  }, {
    id: 2,
    url: 'https://placeimg.com/500/300/nature?t=' + Math.random(),
    text: 'texto_2',
    checked: false
  }, {
    id: 3,
    url: 'https://placeimg.com/500/300/nature?t=' + Math.random(),
    text: 'texto_3',
    checked: false
  }, {
    id: 4,
    url: 'https://placeimg.com/500/300/nature?t=' + Math.random(),
    text: 'texto_4',
    checked: false
  }, {
    id: 5,
    url: 'https://placeimg.com/500/300/nature?t=' + Math.random(),
    text: 'texto_5',
    checked: false
  }, {
    id: 6,
    url: 'https://placeimg.com/500/300/nature?t=' + Math.random(),
    text: 'texto_6',
    checked: false
  }, {
    id: 7,
    url: 'https://placeimg.com/500/300/nature?t=' + Math.random(),
    text: 'texto_7',
    checked: false
  }, {
    id: 8,
    url: 'https://placeimg.com/500/300/nature?t=' + Math.random(),
    text: 'texto_8',
    checked: false
  }, {
    id: 9,
    url: 'https://placeimg.com/500/300/nature?t=' + Math.random(),
    text: 'texto_9',
    checked: false
  }]
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
    const index = state.items.findIndex(stateItem => stateItem.id === state.clickedImage)
    state.items[index].checked = true
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
  }
}

const getters = {
  clicks: (state) => state.clicks,
  clickedImage: (state) => state.clickedImage,
  clickedText: (state) => state.clickedText,
  timeStart: (state) => state.timeStart,
  timeSpent: (state) => state.timeSpent,
  items: (state) => state.items,
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
