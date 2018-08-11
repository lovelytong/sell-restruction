export default {
  selectFoods: function (state) {
    let foods = []
    state.goodsData.forEach((good) => {
      good.foods.forEach((food) => {
        if (food.count) {
          foods.push(food)
        }
      })
    })
    return foods
  }
}
