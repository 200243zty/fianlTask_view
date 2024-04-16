<!--<template>-->
<!--  <div class="box">-->
<!--    <div class="topBox">-->
<!--        <div style="display: inline-block">-->
<!--          <div style="width: 150px;height: 150px">-->
<!--            <img :src="picUrl" alt="图片" style="width: 100%;height: 100%;">-->
<!--          </div>-->
<!--          <div>-->
<!--            <div>-->

<!--            </div>-->

<!--          </div>-->
<!--        </div>-->
<!--    </div>-->
<!--    <div>-->

<!--    </div>-->






<!--&lt;!&ndash;    <div class="the-aside">&ndash;&gt;-->
<!--&lt;!&ndash;      <div class="img">&ndash;&gt;-->
<!--&lt;!&ndash;        <img style="width: 100%" :src="picUrl" alt="图片" />&ndash;&gt;-->
<!--&lt;!&ndash;      </div>&ndash;&gt;-->
<!--&lt;!&ndash;      <div class="show">&ndash;&gt;-->
<!--&lt;!&ndash;        <h3>&ndash;&gt;-->
<!--&lt;!&ndash;          {{ "歌手: " }}<span>{{ artist }}</span>&ndash;&gt;-->
<!--&lt;!&ndash;        </h3>&ndash;&gt;-->
<!--&lt;!&ndash;        <h3 style="margin-top: 20px">&ndash;&gt;-->
<!--&lt;!&ndash;          {{ "所属专辑: " }}<span>{{ introduction }}</span>&ndash;&gt;-->
<!--&lt;!&ndash;        </h3>&ndash;&gt;-->
<!--&lt;!&ndash;      </div>&ndash;&gt;-->

<!--&lt;!&ndash;    </div>&ndash;&gt;-->
<!--&lt;!&ndash;    <div class="content">&ndash;&gt;-->
<!--&lt;!&ndash;      <div class="lyric-title">&ndash;&gt;-->
<!--&lt;!&ndash;        <h1>{{ title }}</h1>&ndash;&gt;-->
<!--&lt;!&ndash;        <h3 style="font-weight: normal; color: #fff">&ndash;&gt;-->
<!--&lt;!&ndash;          {{ artist + "-" + title }}&ndash;&gt;-->
<!--&lt;!&ndash;        </h3>&ndash;&gt;-->
<!--&lt;!&ndash;      </div>&ndash;&gt;-->
<!--&lt;!&ndash;      <div class="song-lyric" ref="lyr">&ndash;&gt;-->
<!--&lt;!&ndash;        <ul class="has-lyric" v-if="lyr.length">&ndash;&gt;-->
<!--&lt;!&ndash;          <li v-for="(item, index) in lyr" :key="index">&ndash;&gt;-->
<!--&lt;!&ndash;            {{ item[1] }}&ndash;&gt;-->
<!--&lt;!&ndash;          </li>&ndash;&gt;-->
<!--&lt;!&ndash;        </ul>&ndash;&gt;-->
<!--&lt;!&ndash;        <ul class="no-lyric" v-if="lyr.length === 0">&ndash;&gt;-->
<!--&lt;!&ndash;          <li>暂无歌词</li>&ndash;&gt;-->
<!--&lt;!&ndash;        </ul>&ndash;&gt;-->
<!--&lt;!&ndash;      </div>&ndash;&gt;-->
<!--&lt;!&ndash;      <div class="comment">&ndash;&gt;-->

<!--&lt;!&ndash;      </div>&ndash;&gt;-->

<!--&lt;!&ndash;    </div>&ndash;&gt;-->
<!--&lt;!&ndash;    <div style="margin-top: 100px">&ndash;&gt;-->
<!--&lt;!&ndash;      <song-comment :play-id="id" :type="0"></song-comment>&ndash;&gt;-->
<!--&lt;!&ndash;    </div>&ndash;&gt;-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import { mapGetters } from "vuex";-->
<!--import { mixins } from "@/mixins";-->
<!--import Comment from "../components/Comment";-->
<!--import SongComment from "../components/SongComment";-->

<!--export default {-->
<!--  // eslint-disable-next-line vue/multi-word-component-names-->
<!--  name: "songDetail",-->
<!--  // eslint-disable-next-line vue/no-unused-components-->
<!--  components: { SongComment, Comment },-->
<!--  mixins: [mixins],-->
<!--  data() {-->
<!--    return {-->
<!--      lyr: [],-->
<!--    };-->
<!--  },-->
<!--  computed: {-->
<!--    ...mapGetters([-->
<!--      "id",-->
<!--      "url",-->
<!--      "curTime",-->
<!--      "lyric",-->
<!--      "listIndex",-->
<!--      "listOfSongs",-->
<!--      "title",-->
<!--      "artist",-->
<!--      "picUrl",-->
<!--      "introduction",-->
<!--    ]),-->
<!--  },-->
<!--  created() {-->
<!--    this.lyr = this.lyric;-->
<!--    this.$store.commit("setCurTime", 0);-->
<!--  },-->
<!--  watch: {-->
<!--    url() {-->
<!--      this.$store.commit("setCurTime", 0);-->
<!--      this.lyr = this.parseLyric(this.listOfSongs[this.listIndex].lyric);-->
<!--    },-->
<!--    curTime(val) {-->
<!--      if (val === 0) {-->
<!--        this.$refs.lyr.scrollTop = 0;-->
<!--      }-->
<!--      if (this.lyr.length > 0) {-->
<!--        for (let i = 0; i < this.lyr.length; i++) {-->
<!--          if (val >= this.lyr[i][0]) {-->
<!--            let top = this.$refs.lyr.children[0].children[i].offsetTop;-->
<!--            let halfViewHeight = 400;-->
<!--            let lyricHeight = 40;-->
<!--            for (let j = 0; j < this.lyr.length; j++) {-->
<!--              document.querySelectorAll(".has-lyric li")[j].style.color =-->
<!--                  "#fff";-->
<!--              document.querySelectorAll(".has-lyric li")[j].style.fontSize =-->
<!--                  "24px";-->
<!--              document.querySelectorAll(".has-lyric li")[j].style.fontWeight =-->
<!--                  "normal";-->
<!--            }-->
<!--            if (i >= 0) {-->
<!--              document.querySelectorAll(".has-lyric li")[i].style.color =-->
<!--                  "#31c27c";-->
<!--              document.querySelectorAll(".has-lyric li")[i].style.fontSize =-->
<!--                  "28px";-->
<!--              document.querySelectorAll(".has-lyric li")[i].style.fontWeight =-->
<!--                  "bold";-->
<!--              if (top > halfViewHeight + lyricHeight) {-->
<!--                this.$refs.lyr.scrollTop = top - halfViewHeight;-->
<!--              }-->
<!--            }-->
<!--          }-->
<!--        }-->
<!--      }-->
<!--    },-->
<!--  },-->
<!--};-->
<!--</script>-->

<!--<style scoped lang="scss">-->
<!--//@import "../assets/css/lyric";-->
<!--</style>-->
