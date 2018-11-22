const book = {
  state: {
    test: 1
  },
  mutations: {
    'SET_TEST': (state, newTest) => {
      state.test = newTest
    }
  },
  actions: {
    setTest: ({ commit, state }, newTest) => {
      console.log(state.test, newTest)
      return commit('SET_TEST', newTest)
    }
  }
}

export default book
