<template>
<div class="store-home">
  <search-bar></search-bar>
  <flap-card></flap-card>
  <scroll :top="scrollTop" @onScroll="onScroll" ref="scroll">
    <p>金梅</p>
    <p>金梅</p>
    <p>金梅</p>
    <p>金梅</p>
    <p>金梅</p>
    <p>金梅</p>
    <p>金梅</p>
    <p>金梅</p>
    <p>金梅</p>
    <p>金梅</p>
    <p>金梅</p>
    <p>金梅</p>
    <p>金梅</p>
    <p>金梅</p>
    <p>金梅</p>
    <p>金梅</p>
    <p>金梅</p>
    <p>金梅</p>
    <p>金梅</p>
  </scroll>
</div>
</template>

<script>
import SearchBar from '../../components/home/SearchBar.vue'
import Scroll from '../../components/common/Scroll.vue'
import FlapCard from '../../components/home/FlapCard.vue'
import { storeHomeMixin } from '../../utils/mixin'

export default {
  mixins: [storeHomeMixin],
  components: { SearchBar, Scroll, FlapCard },
  data () {
    return {
      scrollTop: 94
    }
  },
  methods: {
    onScroll (offsetY) {
      // console.log(offsetY)
      this.setOffsetY(offsetY)
      if (offsetY > 0) {
        this.scrollTop = 52
      } else {
        this.scrollTop = 92
      }
      this.$refs.scroll.refresh()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global";
.store-home {
  width: 100%;
  height: 100%;
}
</style>
