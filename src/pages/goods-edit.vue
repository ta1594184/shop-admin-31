<template>
    <div>
<el-form ref="form" :model="form" label-width="80px">

  <el-form-item label="所属类型">
       <!--v-model="form.category_id"绑定选择商品类型同步到form中上传到数据库的 -->
    <el-select 
     v-model="form.category_id"  
    placeholder="请选择活动区域"
    >
     <!-- 循环出category数组中的每一项商品数据 -->
     <!-- label标签文本名 -->

      <el-option 
      v-for="(item,index) in category"  
      :key="index" 
      :label="item.title"   
      :value="item.category_id" >
      </el-option>
      
    </el-select>
  </el-form-item>

    <el-form-item label="是否发布">
    <el-switch v-model="form.status"></el-switch>
  </el-form-item>


  <el-form-item label="推荐类型">
   
      <el-checkbox label="置顶" v-model="form.is_top"></el-checkbox>
      <el-checkbox label="热门" v-model="form.is_hot"></el-checkbox>
  </el-form-item>

  <el-form-item label="内容标题">
    <el-input type="textarea" v-model="form.title"></el-input>
  </el-form-item>

  <el-form-item label="副标题">
    <el-input type="textarea" v-model="form.sub_title"></el-input>
  </el-form-item>

<el-form-item label="图片封面">
<el-upload
  class="avatar-uploader"
  action="http://localhost:8899/admin/article/uploadimg"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
</el-form-item>

<el-form-item label="商品货号">
    <el-input type="textarea" v-model="form.goods_on"></el-input>
  </el-form-item>

<el-form-item label="库存数量">
    <el-input type="textarea" v-model="form.stock_quantity"></el-input>
  </el-form-item>

<el-form-item label="市场价格">
    <el-input type="textarea" v-model="form.market_price"></el-input>
  </el-form-item>

<el-form-item label="销售价格">
    <el-input type="textarea" v-model="form.sell_price"></el-input>
  </el-form-item>
  <!-- :file-list上传的文件列表, 例如: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}] -->
  <!-- on-success上传成功后的回调函数 -->
  <!-- on-remove 图片移出 -->
   <!-- :on-preview图片中浏览图标 -->
<el-form-item label="图片相册">
<el-upload
  action="http://localhost:8899/admin/article/uploadimg"
  list-type="picture-card"
  :on-success="handleCartSuccess"
  :on-preview="handlePictureCardPreview"
  :on-remove="handleRemove"
  :file-list="form.fileList">  
  <i class="el-icon-plus"></i>
</el-upload>
<el-dialog :visible.sync="dialogVisible">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>
 </el-form-item>

<el-form-item label="内容摘要">
    <el-input type="textarea" v-model="form.zhaiyao"></el-input>
  </el-form-item>

  <el-form-item label="内容描述">
    <quillEditor v-model="form.content"></quillEditor>
  </el-form-item>

  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>
    </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
import { stat } from 'fs';
export default {
components: {
    quillEditor
  },

data() {
      return {
        form: {
            category_id:"",
            status: false,
            is_top: false,
            is_hot: false,
            title: "",
            sub_title: "",
            imgList: [], //封面图片
            goods_no: "",
            stock_quantity: "",
            market_price: "",
            sell_price:"",
            fileList: [], // 多张图片
            zhaiyao: "",
            content: "",

            is_slide: false // 不属于商品添加的
        },
        imageUrl:"",  //预览图片的地址
        category:[],
        dialogImageUrl:"",
        dialogVisible:false
      }
  },
  mounted(){
    //刷新页面请求的数据
      this.$axios({
          url:"http://localhost:8899/admin/category/getlist/goods",
          method:"GET"
      }).then(res=>{
          const {status,message}=res.data;
          this.category=message
      });

//根据id获取分类数据
    const {id} = this.$route.params;
        this.$axios({
            url: "http://localhost:8899/admin/goods/getgoodsmodel/" + id,
            method: "GET"
        }).then(res => {
            const {status, message} = res.data;

            // 对象合并
            this.form = {
                ...message,
                // category_id转化为数字
                category_id: +message.category_id,
                fileList:message.fileList.map( v =>{
                  //v时循环每一项图片数据
                  //shorturl: "/imgs/iFaDYRTeGCDossjKPKkJ4j6d.gif"
                    return{
                      ...v,
                      url:`http://localhost:8899${v.shorturl}`
                      
                    }
                  console.log(v)
                }) 
            }

            //  imageUrl封面的预览
            this.imageUrl = message.imgList[0].url;

            // 图片相册有问题,先保留
        })
  },
    methods: {
      //图片封面
     handleAvatarSuccess(res, file) {
         this.imageUrl = URL.createObjectURL(file.raw);

            // 把上传成功的结果赋值给form.imgList
            this.form.imgList = [res];
      },
      //设置上传图片限制大小
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isLt2M;
      },
      //图片删除传递到form中储存
    handleRemove(file, fileList) {
       const flies=fileList.map(v=>{
           return v.response
       });
       this.form.fileList=flies
      },
      //图片预览
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      //图片成功后的回调函数传递值
     handleCartSuccess(res,flie,fileList){
        //  console.log(fileList)
        //多张图片上传需要追加，不然会出现二次编辑时将之前的覆盖掉
       this.form.fileList.push(flie.response)
     },
     //编辑商品
     onSubmit(){
      this.$axios({
        url:"http://localhost:8899/admin/goods/edit/"+this.$route.params.id,
        method:"post",
        data:this.form,  //将数据传送到后台
        withCredentials: true //跨域
      }).then(res =>{
       const {status,message}=res.data;
       if(status===0){
         this.$router.back()   //返回上一页
       }else{
         this.$router.push("/login")  //失败跳转到登陆页面
       }
      })
    }
    }
    
}
</script>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

