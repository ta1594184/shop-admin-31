<template>
   <el-tree
      :data="data"
      show-checkbox
      node-key="id"
      default-expand-all
      :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ data.title }}</span>

        <span>
          <input :value="data.sort_id" @blur="handleBlur($event,data)" type="text">
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
      const data = []
      return {
        data:data
      }
    },

    methods: {
      handleBlur(event,data){
         if(data.sort_id===event.target.value){
           return;
         }
         var res=window.confirm("确定修改吗！")
         if(res){
           this.$axios({
             url: "http://localhost:8899/admin/category/edit/"+data.category_id,
             method:"post",
             data:{
               ...data,
               sort_id:event.target.value
             },
             withCredentials:true
           }).then(res=>{
             this.getList()
             this.$message.success("修改成功")
           })
         }
      },
      getList(){
            // 请求分类数据
            this.$axios({
                url: "http://localhost:8899/admin/category/getlist/goods",
                method: 'GET'
            }).then(res => {
                const {status, message} = res.data;

                if(status === 0){
                    //  把列表的数据赋值给data，渲染到树形控件
                    this.data = message;
                }
            })
        }
  },
  mounted(){
    this.$axios({
      url:"http://localhost:8899/admin/category/getlist/goods",
      method:"get"
    }).then( res =>{
      const {status,message}=res.data
      if(status===0){
        this.data=message
      }
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
