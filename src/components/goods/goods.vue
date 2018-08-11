<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,index) in goodsData"
            :key="index"
            class="menu-item"
            :class="{'current':index == currentIndex}"
            ref="menuList"
            @click="selectMenu(index,$event)"
        >
          <span class="text">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li ref="foodList"
            v-for="item in goodsData"
            class="food-list"
            :key="item.name"
        >
          <h1 class="title">
            {{item.name}}
          </h1>
          <ul>
            <li v-for="food in item.foods"
                class="food-item"
                :key="food.name"
                @click="selectFood(food, $event)"
            >
              <div class="icon">
                <img :src="food.icon" width="57" height="57">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">¥{{food.price}}</span><span class="old" v-show="food.oldPrice">{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart></shopcart>
    <food :food="selectedFood" ref="food"></food>
  </div>
</template>

<script>
  import {mapActions, mapState} from 'vuex'
  import BScroll from 'better-scroll'
  import cartcontrol from '../cartcontrol/cartcontrol'
  import shopcart from '../shopcart/shopcart'
  import food from '../food/food'
  export default {
    data () {
      return {
        listHeight: [],
        scrollY: 0,
        selectedFood: {}

      }
    },
    components: {
      cartcontrol,
      shopcart,
      food
    },
    computed: {
      ...mapState(['goodsData']),
      currentIndex () {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i + 1]
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            this._followScroll(i)
            return i
          }
        }
        return 0
      }
    },
    methods: {
      ...mapActions(['getData']),
      selectFood (food, event) {
        if (!event._constructed) {
           return
        }
        this.selectedFood = food
        this.$refs.food.show()
      },
      getGoodsData: async function () {
        let res = await this.getData({url: 'goods'})
        if (!res.errno) {
          this.$store.state.goodsData = res.data
        } else {
          console.log(res.errno)
        }
      },
      selectMenu (index, event) {
        if (!event._constructed) {
          return
        }
        let foodList = this.$refs.foodList
        let el = foodList[index]
        this.foodsScroll.scrollToElement(el, 300)
      },
      _initScroll () {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        })

        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          click: true,
          probeType: 3
        })

        this.foodsScroll.on('scroll', (pos) => {
          // 判断滑动方向，避免下拉时分类高亮错误（如第一分类商品数量为1时，下拉使得第二分类高亮）
          if (pos.y <= 0) {
            this.scrollY = Math.abs(Math.round(pos.y))
          }
        })
      },
      _followScroll (index) {
        let menuList = this.$refs.menuList
        let el = menuList[index]
        this.menuScroll.scrollToElement(el, 300, 0, -100)
      },
      _calculateHeight () {
        let foodList = this.$refs.foodList
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
      this.getGoodsData()
    },
    mounted () {
      this.$nextTick(() => {
        this._initScroll()
      })
    },
    watch: {
      goodsData () {
        this.$nextTick(() => {
          this._calculateHeight()
        })
      }
    }
  }
</script>

<style scoped lang="stylus">
  .goods
    display: flex
    position: absolute
    top: 174px
    bottom: 46px
    width: 100%
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          font-weight: 700
          .text
            border-bottom: none
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
          &.decrease
            background-image: url("decrease_3@2x.png")
          &.discount
            background-image: url("discount_3@2x.png")
          &.guarantee
            background-image: url("guarantee_3@2x.png")
          &.invoice
            background-image: url("invoice_3@2x.png")
          &.special
            background-image: url("special_3@2x.png")
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          font-size: 12px
          border-bottom: 1px rgba(7, 17, 27, 0.1) solid
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        position: relative
        margin: 18px
        padding-bottom: 18px
        border-bottom: 1px rgba(7, 17, 27, 0.1) solid
        &:last-child
          border-bottom: none
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
