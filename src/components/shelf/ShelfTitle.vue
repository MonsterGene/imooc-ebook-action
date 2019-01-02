<template>
<div class="shelf-title">
  <div class="shelf-title-text-wrapper">
    <span class="shelf-title-text">{{ $t('shelf.title') }}</span>
    <span class="shelf-title-sub-text">{{ selectedText }}</span>
  </div>
  <div class="shelf-title-btn-wrapper shelf-title-left">
    <span class="shelf-title-btn-text">{{ $t('shelf.clearCache') }}</span>
  </div>
  <div class="shelf-title-btn-wrapper shelf-title-right">
    <span class="shelf-title-btn-text">{{ $t('shelf.edit') }}</span>
  </div>
</div>
</template>

<script>
export default {
  computed: {
    selectedText () {
      return this.$t('shelf.selectBook')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global";
.shelf-title {
  .shelf-title-text-wrapper {
    .shelf-title-text {

    }
    .shlef-title-sub-text {

    }
  }
  .shelf-title-btn-wrapper {
    .shelf-title-btn-text {

    }
    &.shelf-title-left {}
    &.shelf-title-right {}
  }
}
</style>
