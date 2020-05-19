import { date } from 'quasar'

const state = {
  playing: false,
  finished: false,
  end: false,
  clicks: 0,
  clickedImage: 0,
  clickedText: 0,
  timeStart: null,
  timeSpent: null,
  itemImages: [],
  itemTexts: [],
  cardsSelected: [],
  interval: null,
  size: 4
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
  setCheckedImage (state, index) {
    state.cardsSelected[index].data.checked = true
  },
  setUnCheckedImage (state, index) {
    state.cardsSelected[index].data.checked = false
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
  },
  setPlaying (state, value) {
    state.playing = value
  },
  setFinished (state, value) {
    state.finished = value
  },
  setEnd (state, value) {
    state.end = value
  },
  setClicks (state, value) {
    state.clicks = value
  },
  saveInterval (state, value) {
    state.interval = value
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
    const index = state.cardsSelected.findIndex(card => card.id === state.clickedImage)
    commit('setCheckedImage', index)
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
  },
  setPlaying ({ commit }, value) {
    commit('setPlaying', value)
  },
  exitPlaying ({ commit }) {
    commit('setPlaying', false)
    const checkedCards = state.cardsSelected.filter(card => card.data.checked)
    checkedCards.forEach(card => {
      const index = state.cardsSelected.findIndex(cardSelected => cardSelected.id === card.id)
      commit('setUnCheckedImage', index)
    })
  },
  checkGameStatus ({ commit, dispatch, rootState }, value) {
    const pending = state.cardsSelected.filter(card => !card.data.checked).length
    if (pending === 0) {
      const dateTimeStart = new Date(state.timeStart)
      const dateTimeStartOffset = dateTimeStart.getTimezoneOffset()
      const dateTimeStartWithoutOffset = date.addToDate(dateTimeStart, { minutes: dateTimeStartOffset })

      const dateValue = new Date(state.timeSpent)
      const dateValueOffset = dateValue.getTimezoneOffset()
      const dateWithoutOffset = date.addToDate(dateValue, { minutes: dateValueOffset })
      const time = dateWithoutOffset.toLocaleTimeString()
      const data = {
        clicks: state.clicks,
        init: dateTimeStartWithoutOffset,
        spent: dateWithoutOffset,
        spent_formatted: time
      }
      const cards = []
      state.cardsSelected.forEach(card => cards.push(card.id))
      dispatch('addUserCards', { user: rootState.auth.user.mail, cards: cards }, { root: true })
      dispatch('addGameplay', data, { root: true })
      clearInterval(state.interval)
      commit('setFinished', true)
      commit('setPlaying', false)
    }
  },
  setFinished ({ commit }, value) {
    commit('setFinished', value)
  },
  setEnd ({ commit }, value) {
    commit('setEnd', value)
  },
  saveInterval ({ commit }, value) {
    commit('saveInterval', value)
  },
  initStore ({ commit }) {
    commit('setPlaying', true)
    commit('setFinished', false)
    commit('setEnd', false)
    commit('setClicks', 0)
    commit('setTimeStart')
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
  texts: (state) => state.itemTexts,
  playing: (state) => state.playing,
  finished: (state) => state.finished,
  interval: (state) => state.interval,
  size: (state) => state.size,
  end: (state) => state.end
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
