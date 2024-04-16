<template>
  <div id="app" style="height: 100%">
    <the-header />
    <router-view class="music-content" />
    <song-audio></song-audio>
    <the-aside></the-aside>
    <play-bar></play-bar>
    <ScrollTop></ScrollTop>
<!--    <the-footer></the-footer>-->
  </div>
</template>

<script>
import TheHeader from "./components/TheHeader";
import ScrollTop from "./components/ScrollTop";
// import TheFooter from "./components/TheFooter";
import SongAudio from "./components/SongAudio";
import PlayBar from "./components/PlayBar";
import TheAside from "./components/TheAside";
import io from 'socket.io-client'



export default {
  name: "App",
  components: {
    TheAside,
    PlayBar,
    SongAudio,
    // TheFooter,
    TheHeader,
    ScrollTop,
  },
  mounted() {
    if (window.name === "") {
      window.name = "isRefresh";
      this.$store.commit("setIsPlay", false);
    }
  },
};
</script>

<style lang="scss" scoped>
@import "./assets/css/app.scss";
</style>
