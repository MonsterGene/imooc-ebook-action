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
  setIsBookmark: ({ commit }, isBookmark) => commit('SET_IS_BOOKMARK', isBookmark)
}

export default actions
