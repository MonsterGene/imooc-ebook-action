<template>
<div class="store-shelf">
  <shelf-title :title="shelfCategory.title" :ifShowBack="true"></shelf-title>
  <scroll
    ref="scroll"
    class="store-shelf-scroll-wrapper"
    :top="0"
    :bottom="scrollBottom"
    @onScroll="onScroll"
    v-if="ifShowList">
    <shelf-list :top="42" :data="shelfCategory.itemList"></shelf-list>
    <shelf-footer></shelf-footer>
  </scroll>
  <div v-else class="store-shelf-empty-view">
    {{ $t('shelf.groupNone') }}
  </div>
</div>
</template>

<script>
import ShelfTitle from '../../components/shelf/ShelfTitle.vue'
import { storeShelfMixin } from '../../utils/mixin'
import Scroll from '../../components/common/Scroll'
import ShelfList from '../../components/shelf/ShelfList'
import ShelfFooter from '../../components/shelf/ShelfFooter'

export default {
  mixins: [storeShelfMixin],
  components: {
    ShelfTitle,
    Scroll,
    ShelfList,
    ShelfFooter
  },
  data () {
    return {
      scrollBottom: 0
    }
  },
  computed: {
    ifShowList () {
      return this.shelfCategory.itemList && this.shelfCategory.itemList.length > 0
    }
  },
  watch: {
    isEditMode (isEditMode) {
      this.scrollBottom = isEditMode ? 48 : 0
      this.$nextTick(() => {
        this.$refs.scroll.refresh()
      })
    }
  },
  methods: {
    onScroll (offsetY) {
      this.setOffsetY(offsetY)
    }
  },
  mounted () {
    this.getCategoryList(this.$route.query.title)
    this.setCurrentType(2)
  }
}
</script>
<style lang="scss" scoped>
@import "../../assets/styles/global";
.store-shelf {
  position: relative;
  z-index: 100;
  width: 100%;
  height: 100%;
  background: white;
  .store-shelf-scroll-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 101;
  }
  .store-shelf-empty-view {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    font-size: px2rem(14);
    color: #333;
    @include center;
  }
}
</style>
