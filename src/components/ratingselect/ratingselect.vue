<template>
  <div class="ratingselect">
    <div class="rating-type">
      <span class="block positive"
            :class="{active: thisselect===2}"
            @click="thisselect = 2"
      >
        全部
        <span class="count">3</span>
      </span>
      <span class="block positive"
            :class="{active: thisselect===1}"
            @click="thisselect = 1"
      >
        满意
        <span class="count">2</span>
      </span>
      <span class="block negative"
            :class="{active: thisselect===0}"
            @click="thisselect = 0"
      >
        不满意
        <span class="count">1</span>
      </span>
    </div>
    <div class="switch" @click="onlyContent=!onlyContent">
      <span class="icon-check_circle" :class="{'on':onlyContent}"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
  const ALL = 2
  export default {
    data () {
      return {
        thisselect: ALL,
        onlyContent: true
      }
    }
  }
</script>

<style lang="stylus">
  .ratingselect
    .rating-type
      padding: 18px 0
      margin: 0 18px
      font-size: 0
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      .block
        display: inline-block
        padding: 8px 12px
        margin-right: 8px
        line-height: 16px
        border-radius: 1px
        font-size: 12px
        color: rgb(77, 85, 93)
        &.active
          color: #fff
        .count
          margin-left: 2px
          font-size: 8px
        &.positive
          background: rgba(0, 160, 220, 0.2)
          &.active
            background: rgb(0, 160, 220)
        &.negative
          background: rgba(77, 85, 93, 0.2)
          &.active
            background: rgb(77, 85, 93)
    .switch
      padding: 12px 18px
      line-height: 24px
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      color: rgb(147, 153, 159)
      font-size: 0
      .icon-check_circle
        display: inline-block
        vertical-align: top
        margin-right: 4px
        font-size: 24px
        &.on
          color: #00c850
      .text
        display: inline-block
        vertical-align: top
        font-size: 12px

</style>
