<template>
  <div class="search-songs" style="width: 900px">
    <album-content :songLists="listOfSongs" style="width: 100%"></album-content>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AlbumContent from "../AlbumContent";
export default {
  name: "SearchSongs",
  components: { AlbumContent },
  computed: {
    ...mapGetters(["listOfSongs"]),
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/css/search-songs";
</style>
