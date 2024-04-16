<template>
<div style="margin-top: 500px">
  <!--music：当前播放的音乐。 list：播放列表 ：showlrc：是否显示歌词-->
  <aplayer :music="musics[0]" :list="musics"  :showlrc="true" :mini="false" :float="true"
    :lrcType="3"
  ></aplayer>
</div>

</template>

<script>
import aplayer from "vue-aplayer";
export default {
  components: {
    aplayer
  },
  data() {
    return {
      detailForm: {
        clickType: "",
        title: "ajlgaljg",
      },
      // 音频列表
      musics: [
        {
          title: "我们都一样",
          artist: "张杰",
          url: "http://116.62.207.143:9000/mybucket/voice/1709639175876.mp3",
          pic: "http://116.62.207.143:9000/mybucket/avatar/1709646561932.jpg",
          lrc: "http://116.62.207.143:9000/mybucket/lrc/张杰 - 我们都一样 (回忆版).lrc",
        },
        // {
        //   title: "歌曲名称",
        //   artist: "演唱者",
        //   url: "歌曲文件的URL",
        //   pic: "封面图片URL",
        //   lrc: "歌词或歌词文件的URL",
        // }
      ],
    }
  }
}
</script>

<style>

</style>
