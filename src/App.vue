<template>
  <div id="app">
    <vhead></vhead>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  /* eslint-disable standard/object-curly-even-spacing */

  import vhead from './components/vheader/vheader.vue'

  export default {
    name: 'App',

    components: {
      vhead
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .tab
    display: flex
    width: 100%
    height: 40px
    line-height:40px
    border-bottom:1px rgba(7, 17, 27, 0.1) solid
    .tab-item
      flex: 1
      text-align: center
      & > a
        display: block
        font-size: 14px
        color: rgb(77, 85, 93)
        &.active
          color: rgb(240, 20, 20)

</style>
