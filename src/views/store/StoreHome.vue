<template>
<div class="store-home">
  <search-bar></search-bar>
  <flap-card :data="random"></flap-card>
  <scroll :top="scrollTop" @onScroll="onScroll" ref="scroll">
    <div class="banner-wrapper">
      <img class="banner-img" :src="banner" alt="" />
    </div>
  </scroll>
</div>
</template>

<script>
import SearchBar from '../../components/home/SearchBar.vue'
import Scroll from '../../components/common/Scroll.vue'
import FlapCard from '../../components/home/FlapCard.vue'
import { storeHomeMixin } from '../../utils/mixin'
import { home } from '../../api/store'

export default {
  mixins: [storeHomeMixin],
  components: { SearchBar, Scroll, FlapCard },
  data () {
    return {
      scrollTop: 94,
      random: null,
      banner: null
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
  },
  mounted () {
    home().then(res => {
      console.log(res)
      if (res && res.status === 200) {
        const data = res.data
        const randomIndex = Math.floor(Math.random() * data.random.length)
        this.random = data.random[randomIndex]
        this.banner = data.banner
      }
    })
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global";
.store-home {
  width: 100%;
  height: 100%;
  .banner-wrapper {
    width: 100%;
    padding: px2rem(10);
    box-sizing: border-box;
    .banner-img {
      width: 100%;
      height: px2rem(140);
    }
  }
}
</style>
