<template>
  <div id="app">
    <vhead></vhead>
    <div>
      <div>
        <router-link to="/goods">商品</router-link>
      </div>
      <div>
        <router-link to="ratings">评论</router-link>
      </div>
      <div>
        <router-link to="seller">商家</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import vhead from './components/vheader/vheader.vue'

  export default {
    name: 'App',
    components: {
      vhead
    }
  }
</script>

<style>
  .active {
    color: red;
  }

</style>
