<template>
<div class="store-shelf">
  <shelf-title></shelf-title>
  <scroll class="store-shelf-scroll-wrapper" :top="0">
    <shelf-search></shelf-search>
    <shelf-list></shelf-list>
  </scroll>
</div>
</template>

<script>
import ShelfTitle from '../../components/shelf/ShelfTitle.vue'
import { storeShelfMixin } from '../../utils/mixin'
import Scroll from '../../components/common/Scroll'
import ShelfSearch from '../../components/shelf/ShelfSearch'
import ShelfList from '../../components/shelf/ShelfList'
import { shelf } from '../../api/store'

export default {
  mixins: [storeShelfMixin],
  components: {
    ShelfTitle,
    Scroll,
    ShelfSearch,
    ShelfList
  },
  methods: {
    getShelfList () {
      shelf().then(res => {
        console.log(res)
        if (res.status === 200 && res.data && res.data.bookList) {
          this.setShelfList(res.data.bookList)
        }
      })
    }
  },
  mounted () {
    this.getShelfList()
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
}
</style>
