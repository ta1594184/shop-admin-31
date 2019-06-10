<template>
  <div>
    <el-container>
      <el-aside width="auto">
        <!-- 导航菜单组件 -->
          <Menu :isShow="isShow"></Menu>
      </el-aside>
      <el-container>

        <el-header>
          <!-- 头部公共组件 -->
          <Header @click="handleChangeShow"/>
        </el-header>
        
        <el-main>
          <!-- 面包屑组件 -->
            <Mianbao/>
          <!-- 商品列表和栏目内容内容组件 -->
          <router-view></router-view>
        </el-main>

      </el-container>
    </el-container>
  </div>
</template>
<script>
import Header from "../components/Header.vue";
import Mianbao from "../components/Mianbao.vue";
import Menu from "../components/Menu.vue";

export default {
  data(){
    return{
      isShow:false,
    }
  },
  components: {
    Header,
    Mianbao,
    Menu,
  },
  methods:{
    //头部事件方法事件
    handleChangeShow(){
      this.isShow=!this.isShow
    }
  }
};
</script>

<style>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  width: 200px;
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}


.el-main {
  background-color: #e9eef3;
  color: #333;

}

div > .el-container {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
