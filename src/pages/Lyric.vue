<template>
  <div class="box" :style="{backgroundImage: `url(${this.picUrl})`}" >
    <div style="backdrop-filter: blur(90px);height: 100%;z-index: 1000">
    <div style="display: flex;" >
    <div class="the-aside">
      <div class="img" style="margin-top: 100px;border-radius: 50%">
        <img style="width: 100%;" :src="picUrl" alt="图片" :class="{play:isPlay}" />
      </div>
<!--      背景-->

      <div class="show">
        <h3>
          {{ "歌手: " }}<span @click="goToSingerPage(singerId)">{{ artist }}</span>
        </h3>
        <h3 style="margin-top: 20px">
          {{ "所属专辑: " }}<span>{{ introduction }}</span>
        </h3>
      </div>

    </div>


    <div class="content">
      <div class="lyric-title">
        <h1>{{ title }}</h1>
        <h3 style="font-weight: normal; color: #fff">
          {{ artist + "-" + title }}
        </h3>
      </div>
      <div class="song-lyric" ref="lyr">
        <ul class="has-lyric" v-if="lyr.length">
          <li v-for="(item, index) in lyr" :key="index">
            {{ item[1] }}
          </li>
        </ul>
        <ul class="no-lyric" v-if="lyr.length === 0">
          <li>暂无歌词</li>
        </ul>
      </div>
      <div class="comment">
      </div>
    </div>
    </div >
    <div style="margin-top: 100px;width: 70%;" >
      <song-comment :play-id="id" :type="0"></song-comment>
    </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mixins } from "@/mixins";
import Comment from "../components/Comment";
import SongComment from "../components/SongComment";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Lyric",
  // eslint-disable-next-line vue/no-unused-components
  components: { SongComment, Comment },
  mixins: [mixins],
  data() {
    return {
      //是否播放，从playBar组件获得
      isPlay: this.$store.getters.isPlay,
      lyr: [],
      singerId:JSON.stringify(this.listOfSongs).singerId
    };
  },
  computed: {
    ...mapGetters([
      "id",
      "url",
      "curTime",
      "lyric",
      "listIndex",
      "listOfSongs",
      "title",
      "artist",
      "picUrl",
      "introduction",
    ]),
  },
  created() {
    this.lyr = this.lyric;
    this.$store.commit("setCurTime", 0);
    console.log("listOfSongS:"+JSON.stringify(this.listOfSongs));
    console.log("listIndex:"+this.listIndex)
    console.log("isPlay:"+this.$store.getters.isPlay)
  },
  watch: {
    url() {
      this.$store.commit("setCurTime", 0);
      this.lyr = this.parseLyric(this.listOfSongs[this.listIndex].lyric);
    },
    curTime(val) {
      if (val === 0) {
        this.$refs.lyr.scrollTop = 0;
      }
      if (this.lyr.length > 0) {
        for (let i = 0; i < this.lyr.length; i++) {
          if (val >= this.lyr[i][0]) {
            let top = this.$refs.lyr.children[0].children[i].offsetTop;
            let halfViewHeight = 400;
            let lyricHeight = 40;
            for (let j = 0; j < this.lyr.length; j++) {
              document.querySelectorAll(".has-lyric li")[j].style.color =
                "#FFFFFF";
              document.querySelectorAll(".has-lyric li")[j].style.fontSize =
                "24px";
              document.querySelectorAll(".has-lyric li")[j].style.fontWeight =
                "normal";
            }
            if (i >= 0) {
              document.querySelectorAll(".has-lyric li")[i].style.color =
                "rgb(51,188,120)";
              document.querySelectorAll(".has-lyric li")[i].style.fontSize =
                "28px";
              document.querySelectorAll(".has-lyric li")[i].style.fontWeight =
                "bold";
              if (top > halfViewHeight + lyricHeight) {
                this.$refs.lyr.scrollTop = top - halfViewHeight;
              }
            }
          }
        }
      }
    },
  },
  methods:{
    goToSingerPage(val){
      this.$router.push({ path: "/singerAlbum", query: { id: val } });
    }
  }
};
</script>

<style scoped lang="scss">
.box {
  background-size: cover;
  //background-repeat: no-repeat;
  //position: absolute;
  .the-aside {
    width: 400px;

    .img {
      margin-top: 90px;
      width: 260px;
      height: 260px;
      border: 15px solid rgb(54,54,54);
      border-radius: 10%;
      overflow: hidden;
      background-color: #fff;
      margin-bottom: 20px;
      margin-left: 150px;
    }

    .show {
      font-size: 16px;
    }

    .show h3 {
      font-weight: normal;
      margin-left: 240px;
      color: #101010;
    }

    .show h3 span {
      color: #2aa3ef;
    }

    .comment {
      height: 100px;
      width: 1000px;
      margin: 300px 200px 100px;
    }


  }

  .content {
    height: 200%;
    margin-left: 100px;
    .lyric-title {
      margin-top: 90px;
      text-align: center;
      color: #101010;
      font-weight: bold;
    }

    .song-lyric {
      margin: 10px 300px;
      width: 500px;
      height: 740px;
      overflow-x: hidden;
      overflow-y: scroll;
      border-radius: 12px;
      padding: 0 20px 50px 20px;
      font-family: sans-serif;
      box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);

      .has-lyric {
        font-size: 20px;
        padding: 30px 0;
        width: 100%;
        min-height: 170px;
        text-align: center;

        li {
          width: 100%;
          height: 40px;
          line-height: 80px;
          color: #101010;
        }
      }

      .no-lyric {
        margin: 200px 0;
        width: 100%;
        text-align: center;

        span {
          font-size: 16px;
          text-align: center;
        }
      }
    }

    .lyric-fade-enter,
    .lyric-fade-leave-to {
      transform: translateX(30px);
      opacity: 0;
    }

    .lyric-fade-enter-active,
    .lyric-fade-leave-active {
      transition: all 0.3s ease;
    }

    .song-lyric::-webkit-scrollbar {
      display: none;
    }

  }
}

.normal-player-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
}
//旋转

@keyframes rotate {
  0%{
    transform: rotate(0);
  }
  100%{
    transform: rotate(360deg);
  }
}
.play{
  animation: rotate 10s linear infinite;
}
.pause{
  animation-play-state: paused;
}
</style>
