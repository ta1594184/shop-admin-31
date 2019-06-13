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
import GoodsEdit from "./pages/goods-edit.vue"
import store from "./stort/index"

Vue.use(Element)

Vue.use(VueRouter)

const routes=[
{path:"/",mate:"首页",redirect:"/admin/goods-list"},
{path:"/login",meta:"登陆",component:Login},
{path:"/admin",meta:"后台管理",component:Admin,children:[
  {path:"goods-list",meta:"商品管理",component:GoodsList},
  {path:"category-list",meta:"栏目管理",component:CategoryList},
  {path:"goods-add",meta:"新增商品",component:GoodsAdd},
  {path:"goods-edit/:id",meta:"编辑商品",component:GoodsEdit}
]},
]

const router=new VueRouter({routes})
//to跳转的页面
//from是页面的来源，上一个页面
//next势函数可以接受参数，也可以做url跳转
router.beforeEach((to,from,next) =>{
  axios({
    url:"http://localhost:8899/admin/account/islogin",
    method:"get",
    withCredentials: true
  }).then( res =>{
    const {code}=res.data
    // console.log(code)
    if(to.path=="/login"){
      if(code==="logined"){
        next("/admin/goods-list")
      }else{
        next()
      }
    }else{
      if(code==="logined"){
        next()
      }else{
        next("/login")
      }
    }
  })
})

Vue.config.productionTip = false

Vue.prototype.$axios=axios

new Vue({
  render: h => h(App),
router,

store

}).$mount('#app')
