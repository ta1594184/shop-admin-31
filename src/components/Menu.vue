<template>
<!-- default-active设置高亮 -->
<el-menu
     default-active="1-1"  
    class="el-menu-vertical-demo"
    background-color="#001529"
    text-color="#fff"
    active-text-color="#ffd04b"
    :collapse="isShow"><!-- 绑定是否水平方式伸缩 -->
  <el-submenu index="1">
    <template slot="title">
      <i class="el-icon-menu"></i>
      <span slot="title">后台管理</span>
    </template>
     <el-menu-item index="1-1">
       <template slot="title">
         <router-link to="/admin/goods-list">商品管理</router-link>
       </template>
     </el-menu-item>
      <el-menu-item index="1-2"> 
        <template slot="title">
          <router-link to="/admin/category-list">栏目管理</router-link>
        </template>
      </el-menu-item>
  </el-submenu>
</el-menu>
</template>

<script>
export default {
props:["isShow"]  //接收传递过来的数据是true还是return
}

</script>

<style>
.el-menu-vertical-demo{
    height: 100%;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  /* 颜色继承 */
  .el-menu-vertical-demo a{
    color:inherit
  }
</style>
