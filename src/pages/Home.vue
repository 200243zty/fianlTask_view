<template>
  <div class="home" ref="Home">
    <swiper />
    <div class="section" v-for="(item, index) in songLists" :key="index">
      <div v-show="!consumerName" class="section-title">{{ item.name }}</div>
      <div v-show="consumerName" class="section-title">
        {{ item.name }}
      </div>

<!--     <recommed-songs v-show="consumerName"-->
<!--                     :contentLists="this.recommendSongs">-->
<!--     </recommed-songs>-->

      <content-list
        v-show="!consumerName"
        :contentLists="item.list"
      ></content-list>

      <content-list
        v-show="consumerName"
        :contentLists="item.list"
      ></content-list>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Swiper from "../components/Swiper";
import { getAllSongList} from "@/api/SongList";
import { getAllSinger } from "@/api/Singer";
import ContentList from "../components/ContentList";
import {recommendSinger, recommendSongList, recommendSongs} from "@/api/RecentSong";
import {getAllStyle} from "../api/SongList";
import {getMyReply} from "../api/Reply";
import webSocket from "../store/WebSocket";
import {recommendByItemCF} from "@/api/Song";
import RecommedSongs from "@/pages/recommedSongs.vue";

function unique(arr) {
  return arr.filter(function (item, index, arr) {
    // 当前元素，在原始数组中的第一个索引==当前索引值，否则返回当前元素
    return arr.indexOf(item, 0) === index;
  });
}

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "home",
  components: {
    ContentList,
    Swiper,
    RecommedSongs
  },
  data() {
    return {
      songLists: [
        { name: "推荐歌单", list: [] },
        { name: "歌手", list: [] },
      ],
      singerIndex: [],
      songListIndex: [],
      consumerName: "",
      tempSongList: [],
      tempSinger: [],

      webSocket: undefined,
      recommendSongs:[]
    };
  },
  computed: {
    ...mapGetters(["userId", "url"]),
  },
  created() {
    this.consumerName = localStorage.getItem("consumerName");
    this.getDataByUser();
    this.getStyleList();
    this.getMyReplyList();
    this.initWebsocket();
    console.log(this.songLists)
  },
  watch: {
    userId() {
      this.consumerName = localStorage.getItem("consumerName");
      this.songLists[0].list = [];
      this.songLists[1].list = [];
      this.getDataByUser();
    },
    url() {
      if (localStorage.getItem("consumerName")) {
        this.songLists[0].list = [];
        this.songLists[1].list = [];
        this.getDataByUser();
      }
    },
  },
  methods: {
    initWebsocket(){
      console.log("userId:"+this.userId)
      if (this.userId != null) {
        console.log("连接websocket")
        this.newWebSocket();
        this.$store.commit("setWebsocket",this.websocket)
      }
    },
    /**
     * 此方法用于新建一个WebSocket连接
     */
    newWebSocket() {
      // 实例化一个WebSocket对象，实例化之后，会立即连接
      this.websocket = new WebSocket('ws://localhost:8889/websocket/'+this.userId);
      // 添加各个监听事件
      this.websocket.addEventListener('open', (e) => {
        this.isConnected = true;
        console.log('已连接！');
      });
      this.websocket.addEventListener('close', (e) => {
        this.isConnected = false;
        console.log('已断开连接！');
      });
      this.websocket.addEventListener('error', (e) => {
        console.error('出现错误！');
      });
      this.websocket.addEventListener('message', (e) => {
        this.
        console.log('收到消息：' + e.data);
        this.returnContent = e.data;
      });
    },



    //获取我所有个评论列表
    getMyReplyList(){
      //TODO 这里要弄清楚
      console.log("userId:"+this.$store.getters.userId)
      let userId = this.$store.getters.userId;
      if(userId){
        getMyReply(userId).then((res)=>{

        })
      }
    },
    //歌曲所有歌单风格
    getStyleList(){
      getAllStyle().then((res)=>{
        this.$store.commit("setStyleList", res.data.data);
      })
    },
    getDataByUser() {
      /**
       * 获取所有歌单,所有歌手,推荐数据
       */
      if (!this.consumerName) {
        this.getSongLists();
        this.getSingers();
      } else {
        this.getRecommendData();
      }
    },
    getRecommendData() {
      //获取推荐的歌曲列表
      recommendByItemCF(this.userId).then((res)=>{
        if (res.data.code === 200) {
          this.recommendSongs=res.data.data;
        }
      })
      //按歌单播放量推荐歌单
      recommendSongList(this.userId).then((res) => {
        if (res.data.code === 200) {
          let songListData = res.data.data;
          for (let i = 0; i < songListData.length * 5; i++) {
            this.songListIndex.push(
              parseInt(Math.random() * songListData.length, 10)
            );
          }
          this.songListIndex = unique(this.songListIndex).slice(0, 10);
          for (let songListIndex of this.songListIndex) {
            this.songLists[0].list.push(songListData[songListIndex]);
          }
        }
      });
      recommendSinger(this.userId).then((res) => {
        if (res.data.code === 200) {
          let singerData = res.data.data;
          for (let i = 0; i < singerData.length * 5; i++) {
            this.singerIndex.push(
              parseInt(Math.random() * singerData.length, 10)
            );
          }
          this.singerIndex = unique(this.singerIndex).slice(0, 10);
          for (let singerIndex of this.singerIndex) {
            this.songLists[1].list.push(singerData[singerIndex]);
          }
        }
      });
    },
    getSongLists() {
      //getRecommendSongList 找到推荐的歌曲ids 组合成为一个歌单
      //TODO 现在这个推荐的歌单还不存在，需要用户一系列的触发



      getAllSongList().then((res) => {

        if (res.data.code === 200) {
          let songListData = res.data.data;
          for (let i = 0; i < songListData.length * 5; i++) {
            this.songListIndex.push(
              parseInt(Math.random() * songListData.length, 10)
            );
          }
          this.songListIndex = unique(this.songListIndex).slice(0, 10);
          for (let songListIndex of this.songListIndex) {
            this.songLists[0].list.push(songListData[songListIndex]);
          }
        }
      });
    },
    getSingers() {
      getAllSinger().then((res) => {
        if (res.data.code === 200) {
          let singerData = res.data.data;
          for (let i = 0; i < singerData.length * 5; i++) {
            this.singerIndex.push(
              parseInt(Math.random() * singerData.length, 10)
            );
          }
          this.singerIndex = unique(this.singerIndex).slice(0, 10);
          for (let singerIndex of this.singerIndex) {
            this.songLists[1].list.push(singerData[singerIndex]);
          }
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/css/home.scss";
</style>
