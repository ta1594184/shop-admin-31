<template>
   <el-tree
      :data="data"
      show-checkbox
      node-key="id"
      default-expand-all
      :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>

        <span>
          <input type="text">
        </span>
        <span>
          <el-button
            type="text"
            size="mini"
            @click="() => append(data)">
            编辑
          </el-button>
        </span>
      </span>
    </el-tree>
</template>

<script>
 export default {
    data() {
      const data = [{
        id: 1,
        label: '一级 1',
      }, {
        id: 2,
        label: '一级 2'
        }]
      return {
        data:data
      }
    },

    methods: {
      
  },
  mounted(){
    this.$axios({
      url:"http://localhost:8899/admin/category/getlist/goods"
    })
  }
 }
</script>

<style>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  .custom-tree-node > span > input{
    width: 50px;
    height: 17px;
  }
</style>
