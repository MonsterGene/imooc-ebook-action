<template>
  <div class="home">
    <div id="read"></div>
  </div>
</template>

<script>
import Epub from 'epubjs'
global.ePub = Epub
export default {
  name: 'home',
  mounted() {
    this.book = new Epub('../../public/2017_Book_InterdisciplinaryPerspectivesO.epub')
    console.log(this.book)
  },
}
</script>
