const actions = {
  setFileName: ({ commit }, fileName) => commit('SET_FILENAME', fileName),
  setMenuVisible: ({ commit }, menuVisible) => commit('SET_MENUVISIBLE', menuVisible),
  setSettingVisible: ({ commit }, settingVisible) => commit('SET_SETTINGVISIBLE', settingVisible),
  setDefaultFontSize: ({ commit }, defaultFontSize) => commit('SET_DEFAULT_FONT_SIZE', defaultFontSize),
  setDefaultFontFamily: ({ commit }, defaultFontFamily) => commit('SET_DEFAULT_FONT_FAMILY', defaultFontFamily),
  setFontFamilyVisible: ({ commit }, fontFamilyVisible) => commit('SET_FONT_FAMILY_VISIBLE', fontFamilyVisible),
  setDefaultTheme: ({ commit }, defaultTheme) => commit('SET_DEFAULT_THEME', defaultTheme),
  setBookAvailable: ({ commit }, bookAvailable) => commit('SET_BOOK_AVAILABLE', bookAvailable),
  setProgress: ({ commit }, progress) => commit('SET_PROGRESS', progress),
  setSection: ({ commit }, section) => commit('SET_SECTION', section),
  setIsPaginating: ({ commit }, isPaginating) => commit('SET_IS_PAGINATING', isPaginating),
  setCurrentBook: ({ commit }, currentBook) => commit('SET_CURRENT_BOOK', currentBook),
  setNavigation: ({ commit }, navigation) => commit('SET_NAVIGATION', navigation),
  setCover: ({ commit }, cover) => commit('SET_COVER', cover),
  setMetadata: ({ commit }, metadata) => commit('SET_METADATA', metadata),
  setPaginate: ({ commit }, paginate) => commit('SET_PAGINATE', paginate),
  setPagelist: ({ commit }, pagelist) => commit('SET_PAGELIST', pagelist),
  setOffsetY: ({ commit }, offsetY) => commit('SET_OFFSETY', offsetY),
  setIsBookmark: ({ commit }, isBookmark) => commit('SET_IS_BOOKMARK', isBookmark),
  setHotSearchOffsetY: ({ commit }, hotSearchOffsetY) => commit('SET_HOT_SEARCH_OFFSETY', hotSearchOffsetY),
  setFlapCardVisible: ({ commit }, flapCardVisible) => commit('SET_FLAP_CARD_VISIBLE', flapCardVisible),
  setIsEditMode ({ commit }, isEditMode) {
    return commit('SET_IS_EDIT_MODE', isEditMode)
  },
  setShelfList ({ commit }, list) {
    return commit('SET_SHELF_LIST', list)
  },
  setShelfSelected ({ commit }, selected) {
    return commit('SET_SHELF_SELECTED', selected)
  },
  setShelfTitleVisible ({ commit }, visible) {
    return commit('SET_SHELF_TITLE_VISIBLE', visible)
  },
  setShelfCategory ({ commit }, category) {
    return commit('SET_SHELF_CATEGORY', category)
  },
  setCurrentType ({ commit }, type) {
    return commit('SET_CURRENT_TYPE', type)
  }
}

export default actions
