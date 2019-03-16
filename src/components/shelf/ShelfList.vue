<template>
<div class="shelf-list">
  <div class="shelf-list-item-wrapper" v-for="item in shelfList" :key="item.id">
    <shelf-item :data="item" :style="{ height: itemHeight }"></shelf-item>
  </div>
</div>
</template>

<script>
import { storeShelfMixin } from '../../utils/mixin'
import ShelfItem from './ShelfItem'

export default {
  mixins: [storeShelfMixin],
  components: {
    ShelfItem
  },
  computed: {
    itemHeight () {
      return '100px'
    }
  }
}
</script>

<style lang='scss' scoped>
@import "../../assets/styles/global";
.shelf-list {
  position: absolute;
  top: px2rem(94);
  left: 0;
  z-index: 100;
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  .shelf-list-item-wrapper {
    flex: 0 0 33.33%;
    width: 33.33%;
  }
}
</style>
