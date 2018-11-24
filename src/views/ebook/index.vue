<template>
<div class="ebook">
  <ebook-reader></ebook-reader>
</div>
</template>

<script>
import EbookReader from '../../components/ebook/EbookReader.vue'

export default {
  components: { EbookReader },
  data () {
    return {
    }
  }
}
</script>

<style lang='scss' scoped>
  @import "../../assets/styles/global";
</style>
