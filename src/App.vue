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
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  /* eslint-disable standard/object-curly-even-spacing */

  import vhead from './components/vheader/vheader.vue'
  import {mapActions} from 'vuex'
  // import './common/stylus/index.styl'

  export default {
    name: 'App',
    date () {
      return {
        sellDate: {}
      }
    },
    computed: {

    },
    methods: {
      ...mapActions(['getData']),

      getSellData: async function () {
        this.sellDate = await this.getData({
          url: '/seller'
        })
        console.log(this.sellDate)
      }
    },
    components: {
      vhead
    },
    mounted () {
      this.getSellData()
    }
  }
</script>

<style>
  .active {
    color: red;
  }

</style>
