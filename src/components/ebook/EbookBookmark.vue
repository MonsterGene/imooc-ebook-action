<template>
<div class="ebook-bookmark" ref="bookmark">
  <div class="ebook-bookmark-text-wrapper">
    <div class="ebook-bookmark-down-wrapper">
      <span class="icon-down"></span>
    </div>
    <div class="ebook-bookmark-text">{{ text }}</div>
  </div>
  <div class="ebook-bookmark-icon-wrapper">
    <bookmark :color="color" :width="15" :height="25"></bookmark>
  </div>
</div>
</template>

<script>
import Bookmark from '../common/Bookmark.vue'
import { realPx } from '../../utils/utils'
import { ebookMixin } from '../../utils/mixin'
// const BLUE = '#346CBC'
const WHITE = '#FFF'
export default {
  mixins: [ebookMixin],
  components: {
    Bookmark
  },
  data () {
    return {
      text: '',
      color: WHITE
    }
  },
  computed: {
    height () {
      return realPx(35)
    },
    threshold () {
      return realPx(55)
    }
  },
  watch: {
    offsetY (v) {
      if (v >= this.height && v <= this.threshold) {
        console.log('222222222222')
      }
      // this.$t('book.pulldownAddMark')
    }
  }
}
</script>

<style lang='scss' scoped>
@import "../../assets/styles/global";
.ebook-bookmark {
  position: absolute;
  top: px2rem(-35);
  left: 0;
  z-index: 100;
  width: 100%;
  height: px2rem(35);
  .ebook-bookmark-text-wrapper {
    position: absolute;
    right: px2rem(45);
    bottom: 0;
    display: flex;
    .ebook-bookmark-down-wrapper {
      font-size: px2rem(14);
      color: white;
      transition: all .2s linear;
      @include center;
    }
    .ebook-bookmark-text {
      font-size: px2rem(14);
      color: white;
    }
  }
  .ebook-bookmark-icon-wrapper {
    position: absolute;
    right: 0;
    bottom: 0;
    margin-right: px2rem(15);
  }
}
</style>
