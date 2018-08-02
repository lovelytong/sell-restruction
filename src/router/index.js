import Vue from 'vue'
import Router from 'vue-router'

const goods = resolve => require(['../components/goods/goods'], resolve)
const ratings = resolve => require(['../components/ratings/ratings'], resolve)
const seller = resolve => require(['../components/seller/seller'], resolve)

Vue.use(Router)

const routes = [{
  path: '/',
  redirect: '/goods'
}, {
  path: '/goods',
  component: goods
}, {
  path: '/seller',
  component: seller
}, {
  path: '/ratings',
  component: ratings
}]

export default new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes
})
