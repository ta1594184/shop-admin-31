import Vue from 'vue'
import App from './Admin.vue'

import Element from "element-ui"

import VueRouter from "vue-router"

import axios from "axios"

import 'element-ui/lib/theme-chalk/index.css';

import Login from "./pages/Login.vue"
import Admin from "./pages/Admin.vue"

Vue.use(Element)

Vue.use(VueRouter)

const routes=[
{path:"/login",component:Login},
{path:"/",component:Admin}
]

const router=new VueRouter({routes})

Vue.config.productionTip = false

Vue.prototype.$axios=axios

new Vue({
  render: h => h(App),
router

}).$mount('#app')
