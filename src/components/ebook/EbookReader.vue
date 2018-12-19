<template>
<div class="ebook-reader">
  <div id="read"></div>
</div>
</template>

<script>
import { ebookMixin } from '../../utils/mixin'
import Epub from 'epubjs'
import {
  getFontFamily,
  saveFontFamily,
  getFontSize,
  saveFontSize,
  saveTheme,
  getTheme,
  getLocation
} from '../../utils/localStorage'
import { flatten } from '../../utils/book'
global.ePub = Epub

export default {
  mixins: [ebookMixin],
  data () {
    return {
    }
  },
  methods: {
    prevPage () {
      if (this.rendition) {
        this.rendition.prev().then(() => {
          this.refreshLocation()
        })
        this.hideTitleAndMenu()
      }
    },
    nextPage () {
      if (this.rendition) {
        this.rendition.next().then(() => {
          this.refreshLocation()
        })
        this.hideTitleAndMenu()
      }
    },
    toggleTitleAndMenu () {
      if (this.menuVisible) {
        this.setSettingVisible(-1)
      }
      this.setMenuVisible(!this.menuVisible)
      this.setFontFamilyVisible(false)
    },
    initFontSize () {
      let fontSize = getFontSize(this.fileName)
      if (!fontSize) {
        saveFontSize(this.fileName, this.defaultFontSize)
      } else {
        this.rendition.themes.font(fontSize)
        this.setDefaultFontSize(fontSize)
      }
    },
    initTheme () {
      let defaultTheme = getTheme(this.fileName)
      if (!defaultTheme) {
        defaultTheme = this.themeList[0].name
        saveTheme(this.fileName, defaultTheme)
      }
      this.setDefaultTheme(defaultTheme)
      this.themeList.forEach(theme => {
        this.rendition.themes.register(theme.name, theme.style)
      })
      this.rendition.themes.select(this.defaultTheme)
    },
    initFontFamily () {
      let font = getFontFamily(this.fileName)
      if (!font) {
        saveFontFamily(this.fileName, this.defaultFontFamily)
      } else {
        this.rendition.themes.font(font)
        this.setDefaultFontFamily(font)
      }
    },
    initRendition () {
      this.rendition = this.book.renderTo('read', {
        width: innerWidth,
        height: innerHeight,
        methods: 'default'
      })
      const location = getLocation(this.fileName)
      this.display(location, () => {
        this.initTheme()
        this.initFontSize()
        this.initFontFamily()
        this.initGlobalStyle()
      })
      this.rendition.hooks.content.register(contents => {
        Promise.all([
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/imooc-ebook-action/fonts/daysOne.css`),
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/imooc-ebook-action/fonts/cabin.css`),
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/imooc-ebook-action/fonts/montserrat.css`),
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/imooc-ebook-action/fonts/tangerine.css`)
        ]).then(() => {})
      })
    },
    initGesture () {
      this.rendition.on('touchstart', evt => {
        // evt.preventDefault()
        // evt.stopPropagation()
        this.touchStartX = evt.changedTouches[0].clientX
        this.touchStartTime = evt.timeStamp
      })
      this.rendition.on('touchend', evt => {
        const offsetX = evt.changedTouches[0].clientX - this.touchStartX
        const time = evt.timeStamp - this.touchStartTime
        if (time < 500 && offsetX > 40) {
          this.prevPage()
        } else if (time < 500 && offsetX < -40) {
          this.nextPage()
        } else {
          this.toggleTitleAndMenu()
        }
        evt.preventDefault()
        evt.stopPropagation()
      })
    },
    parseBook () {
      this.book.loaded.cover.then(cover => {
        console.log(cover)
        this.book.archive.createUrl(cover).then(url => {
          this.setCover(url)
        })
        this.book.loaded.metadata.then(metadata => {
          this.setMetadata(metadata)
        })
        this.book.loaded.navigation.then(nav => {
          const navItem = flatten(nav.toc)
          function find (item, level = 0) {
            return !item.parent
              ? level
              : find(navItem.filter(parentItem => parentItem.id === item.parent)[0], ++level)
          }
          navItem.forEach(item => {
            item.level = find(item)
          })
          this.setNavigation(navItem)
        })
      })
    },
    initEpub () {
      const url = `${process.env.VUE_APP_RES_URL}/imooc-ebook-action/epub/` + this.fileName + `.epub`
      this.book = new Epub(url)
      this.setCurrentBook(this.book)
      this.initRendition()
      this.initGesture()
      this.parseBook()
      this.book.ready.then(() => {
        return this.book.locations.generate(750 * (window.innerWidth / 375) * (getFontSize(this.fileName) / 16))
      }).then(locations => {
        this.setBookAvailable(true)
        this.refreshLocation()
      })
    }
  },
  mounted () {
    this.setFileName(this.$route.params.fileName.split('|').join('/')).then(() => {
      this.initEpub()
    })
  }
}
</script>

<style lang='scss' scoped>
  @import "../../assets/styles/global";
</style>
