<template>
<div class="ebook-reader">
  <div id="read"></div>
  <div
    class="ebook-reader-mask"
    @click="onMaskClick"
    @touchmove="move"
    @touchend="moveEnd"
    @mousedown.left="onMouseEnter"
    @mousemove.left="onMouseMove"
    @mouseup.left="onMouseEnd"
  ></div>
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
import { getLocalForage } from '../../utils/localForage'
global.ePub = Epub

export default {
  mixins: [ebookMixin],
  data () {
    return {
    }
  },
  methods: {
    /**
     * 1 - 鼠标进入
     * 2 - 鼠标进入后的移动
     * 3 - 鼠标从移动状态松手
     * 4 - 鼠标还原
     */
    onMouseEnter (e) {
      this.mouseState = 1
      this.mouseStartTime = e.timeStamp
      e.preventDefault()
      e.stopPropagation()
    },
    onMouseMove (e) {
      if (this.mouseState === 1) {
        this.mouseState = 2
      } else if (this.mouseState === 2) {
        let offsetY = 0
        if (this.firstOffsetY) {
          offsetY = e.clientY - this.firstOffsetY
          this.setOffsetY(offsetY)
        } else {
          this.firstOffsetY = e.clientY
        }
      }
      e.preventDefault()
      e.stopPropagation()
    },
    onMouseEnd (e) {
      if (this.mouseState === 2) {
        this.setOffsetY(0)
        this.firstOffsetY = null
        this.mouseState = 3
      } else {
        this.mouseState = 4
      }
      const time = e.timeStamp - this.mouseStartTime
      if (time < 100) {
        this.mouseState = 4
      }
      e.preventDefault()
      e.stopPropagation()
    },
    move (e) {
      let offsetY = 0
      if (this.firstOffsetY) {
        offsetY = e.changedTouches[0].clientY - this.firstOffsetY
        this.setOffsetY(offsetY)
      } else {
        this.firstOffsetY = e.changedTouches[0].clientY
      }
      e.preventDefault()
      e.stopPropagation()
    },
    moveEnd (e) {
      this.setOffsetY(0)
      this.firstOffsetY = null
    },
    onMaskClick (e) {
      if (this.mouseState && (this.mouseState === 2 || this.mouseState === 3)) return
      const offsetX = e.offsetX
      const width = window.innerWidth
      if (offsetX > 0 && offsetX < width * 0.3) {
        this.prevPage()
      } else if (offsetX > 0 && offsetX > width * 0.7) {
        this.nextPage()
      } else {
        this.toggleTitleAndMenu()
      }
    },
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
        width: window.innerWidth,
        height: window.innerHeight,
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
    initEpub (url) {
      this.book = new Epub(url)
      this.setCurrentBook(this.book)
      this.initRendition()
      // this.initGesture()
      this.parseBook()
      this.book.ready.then(() => {
        return this.book.locations.generate(750 * (window.innerWidth / 375) * (getFontSize(this.fileName) / 16))
      }).then(locations => {
        this.navigation.forEach(nav => {
          nav.pageList = []
        })
        locations.forEach(item => {
          const loc = item.match(/\[(.*)\]!/)[1]
          this.navigation.forEach(nav => {
            if (nav.href) {
              const href = nav.href.match(/^(.*)\.html$/)[1]
              if (href === loc) {
                nav.pageList.push(item)
              }
            }
          })
          let currentPage = 1
          this.navigation.forEach((nav, index) => {
            if (index === 0) {
              nav.page = 1
            } else {
              nav.page = currentPage
            }
            currentPage += nav.pageList.length + 1
          })
        })
        this.setPagelist(locations)
        this.setBookAvailable(true)
        this.refreshLocation()
      })
    }
  },
  mounted () {
    const books = this.$route.params.fileName.split('|')
    const fileName = books[1]
    getLocalForage(fileName, (err, blob) => {
      if (!err && blob) {
        console.log('找到已缓存的电子书')
        this.setFileName(books.join('/')).then(() => {
          this.initEpub(blob)
        })
      } else {
        console.log('在线获取电子书')
        this.setFileName(books.join('/')).then(() => {
          const url = `${process.env.VUE_APP_RES_URL}/imooc-ebook-action/epub/` + this.fileName + `.epub`
          this.initEpub(url)
        })
      }
    })
  }
}
</script>

<style lang='scss' scoped>
@import "../../assets/styles/global";
.ebook-reader {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .ebook-reader-mask {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99;
    width: 100%;
    height: 100%;
    background: transparent;
  }
}
</style>
