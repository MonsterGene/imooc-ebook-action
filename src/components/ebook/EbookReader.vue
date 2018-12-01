<template>
<div class="ebook-reader">
  <div id="read"></div>
</div>
</template>

<script>
import { ebookMixin } from '../../utils/mixin'
import Epub from 'epubjs'
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
        this.rendition.prev()
        this.hideTitleAndMenu()
      }
    },
    nextPage () {
      if (this.rendition) {
        this.rendition.next()
        this.hideTitleAndMenu()
      }
    },
    toggleTitleAndMenu () {
      this.setMenuVisible(!this.menuVisible)
    },
    hideTitleAndMenu () {
      this.setMenuVisible(false)
    },
    initEpub () {
      const url = 'http://10.132.50.108:8060/imooc-ebook-action/epub/' + this.fileName + '.epub'
      this.book = new Epub(url)
      console.log(this.book)
      this.rendition = this.book.renderTo('read', {
        width: innerWidth,
        height: innerHeight,
        methods: 'default'
      })
      this.rendition.display()
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
