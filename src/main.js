import Vue from 'vue'
import App from './Admin.vue'

import Element from "element-ui"

import VueRouter from "vue-router"

import axios from "axios"

import 'element-ui/lib/theme-chalk/index.css';

import Login from "./pages/Login.vue"
import Admin from "./pages/Admin.vue"
import GoodsList from "./pages/goods-list.vue"
import CategoryList from "./pages/category-list.vue"
import GoodsAdd from "./pages/GoodsAdd.vue"

Vue.use(Element)

Vue.use(VueRouter)

const routes=[
{path:"/",mate:"首页",redirect:"/admin/goods-list"},
{path:"/login",meta:"登陆",component:Login},
{path:"/admin",meta:"后台管理",component:Admin,children:[
  {path:"goods-list",meta:"商品管理",component:GoodsList},
  {path:"category-list",meta:"栏目管理",component:CategoryList},
  {path:"goods-add",meta:"新增商品",component:GoodsAdd}
]},
]

const router=new VueRouter({routes})

Vue.config.productionTip = false

Vue.prototype.$axios=axios

new Vue({
  render: h => h(App),
router

}).$mount('#app')
