<template>
  <div>
    <div class="comment" style="margin-top: -50px">
      <h2>评论</h2>
      <div class="comment-msg" style="width: 700px;">
        <div class="comment-img">
          <img :src="avatar" alt="用户头像" />
        </div>

        <div style="margin-left: 350px;width: 800px">
          <el-input
              style="width: 500px"
              :rows="4"
              size="mini"
              type="textarea"
              placeholder="说说你的看法"
              @keyup.enter.native="submitMessage"
              v-model="textarea"
          >
          </el-input>
          <div style="display: flex;justify-content: flex-end">
          <el-popover style="margin-right: -450px"
                      placement="bottom"
                      title="标题"
                      width="500"
                      height="700"
                      trigger="click"
                      v-model="emojiShow1"
          >

            <el-button slot="reference" style="height: 35px;margin-top: 10px;">😀</el-button>
            <div class="browBox">
              <ul>
                <li
                    v-for="(item, index) in faceList"
                    :key="index"
                    @click="getBrow(index)"
                >
                  {{ item }}
                </li>
              </ul>
            </div>
          </el-popover>

          <el-button type="primary" class="sub-btn" @click="postComment" size="mini" style="width: 80px"
          >评论</el-button
          >
          </div>


        </div>





        <!--        <el-input-->
<!--          class="comment-input"-->
<!--          type="textarea"-->
<!--          :row="2"-->
<!--          placeholder="请输入评论内容"-->
<!--          v-model="textarea"-->
<!--        ></el-input>-->
<!--        <VueEmoji ref="emoji"  :value="textarea" @input="onInput"  style="margin-left: 50px" aria-placeholder="请输入评论"/>-->
      </div>
    </div>
<!--    <p style="color: #fff">评论共：{{ commentList.length }}条评论</p>-->

    <div class="popular" v-for="(item, index) in commentList" :key="index" style="width: 500px;margin-top: 5px;margin-left: 350px">
<!--      <div>-->
<!--        <div>-->
<!--          <div>-->
<!--          <img src="item.avatar">-->
<!--           </div>-->
<!--          <div>-->
<!--            {{item.username}}-->
<!--          </div>-->
<!--        </div>-->


      <li style="display: flex;justify-content: flex-start;">
        <div class="popular-img">
          <img :src="item.avatar" alt="用户头像" />
        </div>
        <div class="popular-msg">
          <div>
            <li class="name" style="margin-top: 2px">{{ item.userName}}</li>
            <li class="time">{{ parseTime(item.createTime) }}</li>
<!--            <li class="textarea">{{ item.content }}</li>-->
<!--            <div style="margin-top: 10px">-->
<!--              {{item.content}}-->
<!--            </div>-->
          </div>
        </div>
<!--        <div>-->
<!--          {{item.content}}-->
<!--        </div>-->



      </li>
      <div style="padding: 4px 4px; text-align: left;display: inline-block;width: 400px;word-wrap: break-word;margin-left: 50px">
        {{item.content}}
      </div>
      <div style="display: flex;justify-content: flex-start;margin-left: 55px">
        <div class="up" ref="up" @click="postUp(item.id, item.up, index)">
          <svg class="icon" style="cursor: pointer; color: black">
            <use xlink:href="#icon-zan"></use>
          </svg>
          {{ item.up }}
        </div>
        <!--        记录reply对象的在评论种的id,作为pid,和回复的这个人是谁,对他进行消息的推送-->
        <el-button type="text" style="margin-left: 10px;margin-top: -10px" @click="replayActive(item.id)">回复</el-button>
<!--      -->
      </div>
      <div v-if="replyVisable===item.id">
        <div style="margin-left: 50px;">
          <el-input
              style="width: 450px"
              :rows="3"
              size="mini"
              type="textarea"
              placeholder="说说你的看法"
              @keyup.enter.native="submitMessage"
              v-model="replytextarea"
          >
          </el-input>
          <div style="display: flex;justify-content: flex-end">
            <el-popover style="margin-right: 0px"
                        placement="bottom"
                        title="标题"
                        width="500"
                        height="700"
                        trigger="click"
                        v-model="emojiShow2"
            >

              <el-button slot="reference" style="height: 35px;margin-top: 0px;">😀</el-button>
              <div class="browBox">
                <ul>
                  <li
                      v-for="(item, index) in faceList"
                      :key="index"
                      @click="getBrow2(index)"
                  >
                    {{ item }}
                  </li>
                </ul>
              </div>
            </el-popover>
<!--              item.id->组件的pid item.userId->被回复的人的id -->
            <el-button type="primary" class="sub-btn"  @click="reply(item.id,item.userId)" size="mini"
            >回复</el-button
            >
            <el-button type="primary" plain size="mini" @click="replyDisActive()">取消</el-button>
          </div>
        </div>
      </div>
<!--        二级评论-->
<!--      <div class="middleComment" style="background-color: rgb(242,242,242);" v-for="(item,index) in item.children">-->


<!--      </div>-->
      <el-collapse v-model="activeIndex" style="width: 400px;margin-left: 50px" accordion>
        <el-collapse-item :title="getMiddleCommentLength(item)" name="1" style="background-color: rgb(242, 242, 242)" :name="item.id">
          <div v-for="(i,index) in item.children">
            <li style="display: flex;justify-content: flex-start;">
              <div class="popular-img" style="  width: 45px;height: 45px;border-radius: 100%;">
                <img :src="i.avatar" alt="用户头像" style=" width: 100%; height: 100%; border-radius: 100%;" />
              </div>
              <div class="popular-msg" style=" color: black;padding: 0 10px;">
                <div>
                  <li class="name" style="margin-top: 2px;font-size: 1.0rem;color: grey; display: block">{{ i.userName}}</li>
                  <li class="time" style="font-size: 0.8rem;color:gray; display: block">{{ parseTime(i.createTime) }}</li>
                  <!--            <li class="textarea">{{ item.content }}</li>-->
                  <!--            <div style="margin-top: 10px">-->
                  <!--              {{item.content}}-->
                  <!--            </div>-->
                </div>
              </div>
              <!--        <div>-->
              <!--          {{item.content}}-->
              <!--        </div>-->



            </li>
            <div style="padding: 4px 4px; text-align: left;display: inline-block;width: 340px;word-wrap: break-word;margin-left: 50px">
              <span v-if="i.target!==item.userId" style="color: dodgerblue;margin-right: 5px;">@{{i.targetName}}</span>{{i.content}}
            </div>
            <div style="display: flex;justify-content: flex-start;margin-left: 55px">
              <div class="up" ref="up" @click="postUp(i.id, i.up, index)">
                <svg class="icon" style="cursor: pointer; color: black">
                  <use xlink:href="#icon-zan"></use>
                </svg>
                {{ i.up }}
              </div>
              <!--        记录reply对象的在评论种的id,作为pid,和回复的这个人是谁,对他进行消息的推送-->
              <el-button type="text" style="margin-left: 10px;margin-top: -10px" @click="replayActive(i.id)">回复</el-button>
              <!--      -->
            </div>
            <div v-if="replyVisable===i.id">
              <div style="margin-left: 50px;">
                <el-input
                    style="width: 350px"
                    :rows="3"
                    size="mini"
                    type="textarea"
                    placeholder="说说你的看法"
                    @keyup.enter.native="submitMessage"
                    v-model="replytextarea"
                >
                </el-input>
                <div style="display: flex;justify-content: flex-end">
                  <el-popover style="margin-right: 0px"
                              placement="bottom"
                              title="标题"
                              width="500"
                              height="700"
                              trigger="click"
                              v-model="emojiShow2"
                  >

                    <el-button slot="reference" style="height: 35px;margin-top: 0px;">😀</el-button>
                    <div class="browBox">
                      <ul>
                        <li
                            v-for="(item, index) in faceList"
                            :key="index"
                            @click="getBrow2(index)"
                        >
                          {{ item }}
                        </li>
                      </ul>
                    </div>
                  </el-popover>
                  <!--              item.id->组件的pid item.userId->被回复的人的id -->
                  <el-button type="primary" class="sub-btn"  @click="reply(i.pid,i.userId)" size="mini"
                  >回复</el-button
                  >
                  <el-button type="primary" plain size="mini" @click="replyDisActive()">取消</el-button>
                </div>
              </div>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>

  </div>
  </div>
</template>

<script>

import { mapGetters } from "vuex";
import VueEmoji from 'emoji-vue';


import {
  addComment,
  cancelCommentUp,
  getAllCommentBySongId,
  getAllCommentBySongListId,
  updateCommentUp,
} from "@/api/Comment";
import {addReply} from "../api/Reply";
import {doComment} from "@/api/SongAction";

export default {
  name: "SongComment",
  props: ["playId", "type"],
  components: {
    VueEmoji
  },
  data() {
    return {
      // //聊天输入内容
      // textarea: "",
      //表情框是否展示
      emojiShow1: false,
      emojiShow2: false,
      //表情列表
      faceList: [],
      //表情文本
      getBrowString: "",


      pid:null,
      textarea: "",
      like: false,
      //所有的评论list
      commentList: [],
      replytextarea:"",

      replyVisable:false,
      //让用户只能打开一个回复框
      replyBoxActive:false,

      //折叠面板
      // activeNames: ['1']
    };
  },
  computed: {
    ...mapGetters(["id", "avatar", "loginIn", "userId"]),
  },
  mounted() {
    // if (!localStorage.getItem("consumerName")) {
    //   this.$store.commit(
    //     "setAvatar",
    //     "https://www.freemusic.ltd/avatar/1.jpeg"
    //   );
    // }
    console.log("userId:"+this.userId);
    console.log("avatar:"+this.avatar);

  },
  created() {
    this.getComment();
    this.loadEmojis();
  },
  methods: {
    getMiddleCommentLength(item){
      return `查看${item.children.length}条回复`
    },
    replayActive(id){
        this.replyVisable=id;
    },
    replyDisActive(){
      this.replyVisable = "";
    },


    // 回复某人的评论,也就是插入一个评论作为上个评论的子级,userId是你回复的你的userId
    reply(pid, userId) {
      if (localStorage.getItem("consumerName")) {
        if (this.type === 1) {
          //mp默认不传的字段不修改
          const Comment = {
            pid: pid,
            target: userId,
            content: this.replytextarea,
            userId: this.userId,
            type: this.type,
            songListId: this.playId,
            up: 0
          }
          //先插入这条评论
          addComment(Comment).then((res) => {
            /**
             * 返回的id太大 19位以上，导致js精度爆炸了，不要用replyId
             */
            // let replyId;
            if (res.data.code === 200) {
              // replyId=res.data.data;
              this.$message.success("返回的评论id:"+res.data.data);
              this.getComment();
              this.replytextarea = "";

              //记录用户对歌曲的评论行为
              let ConsumerSongVo ={
                consumerId: this.userId,
                songId:this.id
              }
              doComment(ConsumerSongVo);


              //获取新插入的这条评论的id
              //再推送这个消息 target是要收到这条消息的用户id
              let replyId = BigInt(res.data.data);
              let ReplyAction={
                senderId: this.userId,
                receiverId: userId,
                commentId: pid,
                replyId:res.data.data.toString(),
                type: 1
              }
              addReply(ReplyAction).then((res)=>{
                if (res.data.code === 200) {
                  this.$message.success(res.data.msg());
                }
                else{
                  this.$message.error(res.data.msg())
                }
              })
            } else {
              this.$message.error(res.data.msg);
              this.replytextarea = "";
            }
          })
        } else {
          const Comment = {
            pid: pid,
            target: userId,
            content: this.replytextarea,
            userId: this.userId,
            type: this.type,
            songId: this.playId,
            up: 0
          }
          addComment(Comment).then((res) => {
            if (res.data.code ===200) {
              this.$message.success(res.data.data);
              this.getComment();
              this.replytextarea = "";
              //推送这个消息
              let ReplyAction={
                senderId: this.userId,
                receiverId: userId,
                commentId: pid,
                replyId:res.data.data,
                type: 1
              }
              console.log(ReplyAction)
              addReply(ReplyAction).then((res)=>{
                if (res.data.code === 200) {
                  this.$message.success(res.data.msg());
                }
                else{
                  this.$message.error(res.data.msg())
                }
              })
            } else {
              this.$message.error(res.data.msg);
              this.replytextarea = "";
            }
          })
        }
      }
      else{
        this.$message.warning("未登录, 不能评论");
        this.textarea = "";
      }
    },

    onInput(event) {
      this.textarea = event.data
    },
    postComment() {
      if (localStorage.getItem("consumerName")) {
        if (this.type === 1) {
          const Comment = {
            userId: this.userId,
            type: this.type,
            songId: "",
            songListId: this.playId,
            content: this.textarea,
            up: 0,
          };
          if (this.textarea === "" || this.textarea === null) {
            this.$message.warning("评论内容不能为空");
          } else {
            addComment(Comment).then((res) => {
              if (res.data.code === 200) {
                this.$message.success(res.data.msg);
                console.log("添加的一级评论的id:"+res.data.data)
                this.getComment();
                this.textarea = "";

                //记录用户对歌单的行为


              } else {
                this.$message.error(res.data.msg);
                this.textarea = "";
              }
            });
          }
        } else {
          const Comment = {
            userId: this.userId,
            type: this.type,
            songId: this.playId,
            songListId: "",
            content: this.textarea,
            up: 0,
          };
          if (this.textarea === "" || this.textarea === null) {
            this.$message.warning("评论内容不能为空");
          } else {
            addComment(Comment).then((res) => {
              if (res.data.code === 200) {
                this.$message.success(res.data.msg);
                console.log("添加的一级评论的id:"+res.data.data)
                this.getComment();
                this.textarea = "";
                //添加评论成功，记录用户行为
                let consumerSongVO={
                  consumerId: this.userId,
                  songId:this.playId
                }
                doComment(consumerSongVO).then((res)=>{
                  if (res.data.code === 200) {
                    this.$message.success(res.data.msg);
                  }
                })

              } else {
                this.$message.error(res.data.msg);
                this.textarea = "";
              }
            });
          }
        }
      } else {
        this.$message.warning("未登录, 不能评论");
        this.textarea = "";
      }

    },
    getComment() {
      if (this.type === 1) {
        getAllCommentBySongListId(this.playId).then((res) => {
          if (res.data.code === 200) {
            // console.log("data:" + res.data.data);

            this.commentList = res.data.data;
            // console.log("commentList："+this.commentList)
          }
        });
      } else {
        getAllCommentBySongId(this.playId).then((res) => {
          if (res.data.code === 200) {
            // console.log("data:" + JSON.stringify(res.data.data));
            this.commentList = res.data.data;
            // console.log("commentList："+JSON.stringify(this.commentList))
          }
        });
      }
    },
    postUp(id, up, index) {
      const CommentDto = {
        id: id,
        up: up,
      };
      if (localStorage.getItem("consumerName")) {
        if (!this.like) {
          updateCommentUp(CommentDto).then((res) => {
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              this.$refs.up[index].children[0].style.color = "#2aa3ef";
              this.like = true;
              this.getComment();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          cancelCommentUp(CommentDto).then((res) => {
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              this.$refs.up[index].children[0].style.color = "rgb(10,10,10)";
              this.like = false;
              this.getComment();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        }
      } else {
        this.$message.warning("未登录, 不能点赞");
      }
    },
    parseTime(time) {
      let newTime = time.split("T");
      return newTime[0] + " " + newTime[1];
    },


    //加载表情，存放到表情列表中
    loadEmojis() {
      const appData = require("../assets/images/emojis.json");
      console.log(appData)
      for (let i in appData) {
        this.faceList.push(appData[i].char);
      }
    },
    // 获取用户点击之后的标签 ，存放到输入框内
    getBrow(index) {
      for (let i in this.faceList) {
        if (index == i) {
          this.getBrowString = this.faceList[index];
          this.textarea += this.getBrowString;
        }
      }
      this.emojiShow1 = false;
    },
    getBrow2(index) {
      for (let i in this.faceList) {
        if (index == i) {
          this.getBrowString = this.faceList[index];
          this.replytextarea += this.getBrowString;
        }
      }
      this.emojiShow2 = false;
    },
    submitMessage() {
      //提交。。。
    }
  }
};
</script>

<style scoped lang="scss">
@import "../assets/css/song-comment";
/deep/ .el-collapse-item__wrap {
  background-color: rgb(245, 245, 245) !important;
}
.browBox {
  width: 100%;
  height: 200px;
  background: #e6e6e6;
  position: absolute;
  z-index: 100;
  bottom: 0px;
  overflow: scroll;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    li {
      cursor: pointer;
      width: 10%;
      font-size: 26px;
      list-style: none;
      text-align: center;
    }
  }
}
.submit-btn {
  margin: 0 15px 10px 0;
  float: right;
}

</style>
