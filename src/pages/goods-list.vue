<template>
<div>
    <div class="handles">
        <el-row type="flex" justify="space-between">
            <div>
                <el-button @click="handleIncreased">新增</el-button>
                <el-button type="danger" @click="handleDeleteMore">删除</el-button>
            </div>
     <div class="input-search">
        <el-input placeholder="请输入内容"  class="input-with-select" v-model="searchValue">
            <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
        </el-input>
    </div>
        </el-row>
    </div>
    <el-table
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%; margin-top:10px;"
    @selection-change="handleSelectionChange"
    >
    <el-table-column
      type="selection"
      width="55"
      >
    </el-table-column>
    <el-table-column
      label="标题"
      width="300">
      <template slot-scope="scope">
          <el-row type="flex" align="middle">
              <img :src="scope.row.imgurl" class="goods-img"/>
              <div>
                  {{scope.row.title}}
              </div>
          </el-row>
    </template>
    </el-table-column>
    <el-table-column
      prop="id"
      label="类型"
      width="120">
    </el-table-column>
    <el-table-column
      prop="sell_price"
      label="价格"
      show-overflow-tooltip>
    </el-table-column>
     <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- size-change：显示条数切换
  current-change：页数切换
  current-page：当前的页面
  page-sizes：条数的选项
  page-size：当前条数
  layout：默认布局
  total:数据全部条数 -->
      <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageIndex"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="5"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
        
        
  </div>
</template>

<script>
export default {
   data() {
      return {
        tableData: [
          // {
        // id: 103,        
        // title: "骆驼男装2017秋季新款运动休闲纯色夹克青年宽松长袖针织开衫卫",
        // is_top: 1,
        // is_hot: 1,
        // is_slide: 1,      
        // categoryname: "男装",
        // img_url: "/imgs/SJ4EgwosX0wTqvyAvhtFGT1w.jpg",
        // imgurl:"http://k.zol-img.com.cn/sjbbs/7692/a7691515_s.jpg",
        // goods_no: "NZ0000000002",
        // stock_quantity: 200,
        // market_price: 1000,
        // sell_price: 800 
        // }
        ],
        //默认当前页数
        pageIndex:1,
        //储存所选中的商品
        selectGoods:[],
        pageSize:5,
        //搜索关键字储存
        searchValue:"",
        total:0
      }
    },
    methods:{
      getList(){
             this.$axios({
               //searchvalue搜索条件，将会模糊匹配商品标题
               //pageSize当前页商品显示条数
               //pageIndex当前第几页
            url:`http://localhost:8899/admin/goods/getlist?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}&searchvalue=${this.searchValue}`,
            method:"get"
        }).then(res=>{
          // console.log(res.data)
           const data = res.data;
                // 商品列表的数据
                this.tableData = data.message;
                // 总条数
                this.total = data.totalcount;
        })
        },
        //封装接口
        getDel(index){
            this.$axios({
                url:`http://localhost:8899/admin/goods/del/${index}`,
                methods:"get"
            }).then(res=>{
                // console.log(res)
                const {message,status}=res.data
                if(status===0){
                    this.$message.success(message)
                    this.getList()
                }else{
                    this.$message.error(message)
                }
            })
        },
        //监听获取复选框所选的数据
        handleSelectionChange(val){
           this.selectGoods =val
        },
        //搜索按钮
        handleSearch(){
          this.getList()
        },
        //编辑商品
        handleEdit(goods){
            console.log(goods)
        },
        //删除商品
        handleDelete(goods){
            // console.log(goods)
            //获取id
            const id=goods.id;
            //调用接口
            this.getDel(id)
        },
        //删除多个商品
        handleDeleteMore(){
            // console.log(this.selectGoods)
            //先获取需要删除的商品id
            const arr=this.selectGoods.map(v=>{
                return v.id
            })
            console.log(arr)
            const ids=arr.join(",")
            this.getDel(ids)
            //调用删除商品接口
          
        },
        handleIncreased(){
          this.$router.push("/admin/goods-add")
        },
        //页面条数显示
        handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.pageSize=val
        this.getList()

      },
      // 页数切换
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.pageIndex=val
        this.getList()
      }
    },
    //页面刷新后就请求获取商品列表
    mounted(){
       this.getList()
    },
}
</script>

<style>
.handles{
    margin-top: 20px;
}
.input-search{
    width: 300px;
}
  .el-select .el-input {
    width: 130px;
    
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  .goods-img{
      width:60px;
      height:60px;
      /*表示元素压缩的倍数，如果是0，表示不会被挤压*/
      flex-shrink: 0;
      margin-right:5px;
  }
</style>
