<template>
  <div class="my-music">
    <div class="top">
      <div class="img">
        <img :src="avatar" alt="用户头像" style="width: 100%;height: 100%;border-radius: 100%"/>
      </div>
<!--      <ul class="album-info">-->
<!--        <li>昵称：{{ username }}</li>-->
<!--        <li>性别：{{ sex }}</li>-->
<!--        <li>生日：{{ birth }}</li>-->
<!--        <li>故乡：{{ location }}</li>-->
<!--      </ul>-->
    </div>
<!--    <div class="album-content">-->
<!--&lt;!&ndash;      <div class="album-title">个性签名：{{ introduction }}</div>&ndash;&gt;-->
<!--      <div class="songs-body">-->
<!--        <ul class="content">-->
<!--          <li-->
<!--            v-for="(item, index) in List"-->
<!--            :key="index"-->
<!--            :class="{ activeColor: activeName === item.name }"-->
<!--            @click="changeName(item.name)"-->
<!--          >-->
<!--            {{ item.name }}-->
<!--          </li>-->
<!--        </ul>-->
<!--      </div>-->
<!--      <div style="margin-top: 20px">-->
<!--        <album-content-->
<!--          :song-lists="collectList"-->
<!--          v-show="activeName === '我喜欢'"-->
<!--        ></album-content>-->
<!--        <album-content-->
<!--          :song-lists="recentSongList"-->
<!--          v-show="activeName === '我创建的歌单'"-->
<!--        ></album-content>-->
<!--        <div class="songList">-->
<!--          <content-list-->
<!--            :content-lists="songList"-->
<!--            v-show="activeName === '关注'"-->
<!--          ></content-list>-->
<!--        </div>-->
<!--        <div class="songList">-->
<!--          <content-list-->
<!--              :content-lists="songList"-->
<!--              v-show="activeName === '粉丝'"-->
<!--          ></content-list>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--    <create-song-list-dialog  :style-list="styleList" ref="dialog">-->

<!--    </create-song-list-dialog>-->

    <el-dialog
        title="添加歌单"
        :visible.sync="centerDialogVisible"
        width="400px"
        center
    >
      <el-form
          :model="crateMySongListForm"
          ref="registerForm"
          :rules="rules"
          label-width="80px"
      >
        <el-form-item prop="title" label="标题" size="mini">
          <el-input v-model="crateMySongListForm.title" placeholder="标题"></el-input>
        </el-form-item>
        <el-form-item prop="pic" label="歌单图片" size="mini">
          <el-upload
              class="avatar-uploader"
              action="http://localhost:8889/upload"
              name="pic"
              :multiple="true"
              :auto-upload="true"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
          >
            <img
                v-if="crateMySongListForm.pic"
                :src="crateMySongListForm.pic"
                class="avatar"
                alt="头像"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item prop="introduction" label="简介" size="mini">
          <el-input
              type="textarea"
              v-model="crateMySongListForm.introduction"
              placeholder="简介"
          ></el-input>
        </el-form-item>
        <el-form-item label="是否公开">
          <el-switch
              v-model="isPrivateSongList"
              active-color="#13ce66"
              inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
        <el-form-item prop="style" label="风格" size="mini">
          <!--          <el-input v-model="registerForm.style" placeholder="风格"></el-input>-->
          <el-select v-model="crateMySongListForm.styleId" filterable placeholder="请选择">
            <el-option
                v-for="item in styleList"
                :key="item.id"
                :label="item.style"
                :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button
            size="mini"
            type="primary"
            @click="centerDialogVisible = false"
        >取消</el-button
        >
        <el-button size="mini" type="primary" @click="addSave">确定</el-button>
      </span>
    </el-dialog>





    <el-tabs v-model="activeName" class="mycontent">
      <el-tab-pane label="我喜欢" name="我喜欢">
        <my-favoriate :collect-list="collectList" :collect-song-list="songList"></my-favoriate>
<!--        <album-content-->
<!--            :song-lists="collectList"-->
<!--            v-show="activeName === '我喜欢'"-->
<!--        ></album-content>-->
      </el-tab-pane>
      <el-tab-pane label="我创建的歌单" name="我创建的歌单">
        <el-button type="success" size="small" @click="centerDialogVisible=true">创建歌单</el-button>
        <content-list :content-lists="myCreateSongList"></content-list>
      </el-tab-pane>
      <el-tab-pane label="最近播放" name="最近播放">
        <el-button type="success" size="small" @click="centerDialogVisible=true">创建歌单</el-button>
        <content-list :content-lists="myCreateSongList"></content-list>
      </el-tab-pane>
<!--      <el-tab-pane label="关注" name="关注">-->
<!--        <album-content-->
<!--            :song-lists="recentSongList"-->
<!--            v-show="activeName === '关注'"-->
<!--        ></album-content>-->
<!--      </el-tab-pane>-->
<!--      <el-tab-pane label="粉丝" name="粉丝">-->
<!--        <album-content-->
<!--            :song-lists="recentSongList"-->
<!--            v-show="activeName === '粉丝'"-->
<!--        ></album-content>-->
<!--      </el-tab-pane>-->
    </el-tabs>


  </div>
</template>

<script>
import { mixins } from "@/mixins";
import { mapGetters } from "vuex";
import { getConsumerById } from "@/api/Consumer";
import AlbumContent from "../components/AlbumContent";
import { getRecentSongByUserId } from "@/api/RecentSong";
import ContentList from "../components/ContentList";
import { getAllCollectSongListByUserId } from "@/api/Collect";
import MyFavoriate from "../components/MyFavoriate.vue";
import createSongListDialog from "../components/CreateSongListDialog.vue";
import {addSongList} from "../api/SongList";
import {getSongListByCreaterId} from "../api/SongList";

export default {
  name: "MyMusic",
  components: { ContentList, AlbumContent,MyFavoriate,createSongListDialog},
  mixins: [mixins],
  data() {
    return {
      //歌单默认为私有
      isPrivateSongList: true,
      centerDialogVisible: false, // 新增弹窗
      //创建我的歌单参数
      crateMySongListForm: {
        title: "",
        introduction: "",
        pic: "",
        styleId: "",
        type: 0,
        isPrivate: this.isPrivateSongList===true?0:1,
        createrId:this.userId
      },
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        introduction: [
          { required: true, message: "请输入简介", trigger: "blur" },
        ],
        pic: [{ required: true, message: "请上传图片", trigger: "blur" }],
      },

      avatar: "",
      username: "",
      sex: "",
      birth: "",
      location: "",
      introduction: "",
      //我收藏的歌单
      songList: [],
      //我创建的歌单
      myCreateSongList:[],
      List: [
        { name: "我喜欢", path: "" },
        { name: "创建的歌单", path: "" },
        { name: "关注", path: "" },
        { name: "粉丝", path: ""}
      ],
      activeName: "我喜欢",
    };
  },
  computed: {
    ...mapGetters([
      "listOfSongs",
      "userId",
      "collectList",
      "recentSongList",
      "url",
      "styleList"
    ]),
  },
  created() {
    this.getUserData();
    this.getUserCollectData();
    this.getRecentSongByUserId();
    this.getAllCollectSongListByUserId();
    this.getMyCreateSongList()

  },
  watch: {
    url() {
      if (localStorage.getItem("consumerName")) {
        this.getRecentSongByUserId(this.userId);
      }
    },
  },
  methods: {
    //拉取我创建的歌单
    getMyCreateSongList(){
      getSongListByCreaterId(this.userId).then((res)=>{
        console.log(res)
        if (res.data.code === 200) {
          this.myCreateSongList=res.data.data;
        }
      })
    },
    //创建我的歌单
    addSave(){
      //由于userId通过computed引入再后面所以没有赋值进去
      this.crateMySongListForm.createrId=this.userId;
      let SongList =this.crateMySongListForm;
      console.log("歌单参数:"+JSON.stringify(SongList))
      addSongList(SongList).then((res) => {
        if (res.data.code===200) {
          this.$message.success(res.data.msg);
          this.getAllData();
        } else {
          this.$message.error(res.data.msg);
        }
      });
      this.centerDialogVisible = false;
    },
    handleAvatarSuccess(res){
      if (res.code === 20000) {
        this.crateMySongListForm.pic=res.data;
        this.$message.success(res.message);
      }else {
        this.$message.error(res.message);
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      return isJPG;
    },
    //获取我收藏的歌单
    getAllCollectSongListByUserId() {
      getAllCollectSongListByUserId(this.userId).then((res) => {
        if (res.data.code === 200) {
          this.songList = res.data.data;
        }
      });
    },

    changeName(name) {
      this.activeName = name;
    },
    getRecentSongByUserId() {
      getRecentSongByUserId(this.userId).then((res) => {
        if (res.data.code === 200) {
          this.$store.commit("setRecentSongList", res.data.data);
        }
      });
    },
    getUserData() {
      getConsumerById(this.userId).then((res) => {
        if (res.data.code === 200) {
          let Consumer = res.data.data;
          this.avatar = Consumer.avatar;
          this.username = Consumer.username;
          this.sex = Consumer.sex === 1 ? "男" : "女";
          this.birth = Consumer.birth.slice(0, 10);
          this.location = Consumer.location;
          this.introduction = Consumer.introduction;
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import "../assets/css/my-music";
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


.my-music{
  width: 100vw;
  overflow: hidden;
  padding-right: calc(100vw - 100%);

  display:flex;
  justify-content:center;
  height: 2000px;
  background: #ffffff;
  .top{
    margin-top: 75px;
    height: 35%;
    width: 90%;
    background-image: url("https://wallpapercave.com/wp/wp2058627.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    border-radius: 15px;
    box-shadow: 6px 10px 14px 6px rgba(0, 0, 0, 0.2);

    display:flex;
    justify-content:center;
      .img {
        margin-top: 80px;
        width: 120px;
        height: 120px;
        border-radius: 100%;
      }
    }
  .mycontent{
    width: 70%;
    padding: 20px 40px;
    margin-top: 500px;
    font-size: 16px;
    box-shadow: 6px 10px 14px 6px rgba(0, 0, 0, 0.2);
  }
  ///deep/ .el-tabs__item.is-active {
  //  color: rgb(30,204,148);
  //}
  ///deep/ .el-tabs__item:hover {
  //  color: rgb(30,204,148);
  //  cursor: pointer;
  //}
  ///deep/ .el-tabs__active-bar {
  //  //position: absolute;
  //  //bottom: 0;
  //  //left: 0;
  //  height: 2px;
  //  background-color: rgb(30,204,148);
  //  //z-index: 1;
  //}
}
</style>
