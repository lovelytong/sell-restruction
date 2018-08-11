<template>
  <div class="cartcontrol">
    <div class="cart-decrease"
         v-show="food.count&&food.count>0"
         @click.prevent.stop="decreaseCart">
      <span class="inner icon-remove_circle_outline"></span>
    </div>
    <div class="cart-count" v-show="food.count&&food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.prevent.stop="addCart">
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
    export default {
      props: {
        food: {
          type: Object
        }
      },
      methods: {
        addCart (event) {
          if (!event._constructed) {
            return
          }
          if (!this.food.count) {
            Vue.set(this.food, 'count', 1)
          } else {
            this.food.count++
          }
        },
        decreaseCart (event) {
          if (!event._constructed) {
            return
          }
          this.food.count--
        }
      }

    }
</script>

<style lang="stylus">
  .cartcontrol
    font-size: 0
    .cart-decrease
      display: inline-block
      padding: 6px
      opacity: 1
      transform: translate3d(0, 0, 0)
      .inner
        display: inline-block
        line-height: 24px
        font-size: 24px
        color: rgb(0, 160, 220)
        transition: all 0.4s linear
        transform: rotate(0)
    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)
    .cart-add
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)
</style>
