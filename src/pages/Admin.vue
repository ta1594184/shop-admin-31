<template>
  <div>
    <el-container>
      <el-aside width="auto">
          <Menu :isShow="isShow"></Menu>
      </el-aside>
      <el-container>
        <el-header>
          <Header @click="handleChangeShow"/>
        </el-header>
        <el-main>
            <Mianbao/>
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
    Menu
  },
  methods:{
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
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
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
