
<template>
  <el-tabs v-model="activeName" @tab-click="handleClick" >
    <el-tab-pane label="歌曲" name="歌曲">
      <album-content class="box"
          :song-lists="collectList"
          v-show="activeName === '歌曲'"
      ></album-content>
    </el-tab-pane>
    <el-tab-pane label="歌单" name="歌单">
        <content-list :content-lists="collectSongList"></content-list>

<!--      <album-content class="box"-->
<!--          :song-lists="collectList"-->
<!--          v-show="activeName === '歌单'"-->
<!--      ></album-content>-->
    </el-tab-pane>
    <el-tab-pane label="mv" name="mv">
      <album-content class="box"
          :song-lists="collectList"
          v-show="activeName === 'mv'"
      ></album-content>
    </el-tab-pane>
  </el-tabs>

</template>
<script>
import AlbumContent from "./AlbumContent.vue";
import ContentList from "./ContentList.vue";
import {addSongList} from "../api/SongList";

export default {
  components: {AlbumContent,ContentList},
  //收藏的歌曲列表,歌单列表
  props: ["collectList","collectSongList"],
  data() {
    return {
      activeName: '歌曲',
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },



  }
};
</script>

<style scoped lang="scss">
.box {
  margin-left: 10px;
}
</style>
