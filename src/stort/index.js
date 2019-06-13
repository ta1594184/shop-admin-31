import Vuex from "vuex"
import Vue from "vue"

//注册插件
Vue.use(Vuex)

const store=new Vuex.Store({
    state:{
        user:JSON.parse(localStorage.getItem("user")) ||{}
    },
    mutations:{ 
        setUser(state,data){
          state.user=data
            //JSON.stringify将数组或者对象转换成字符串
          localStorage.setItem("user",JSON.stringify(data))
        }
      }
})

export default store