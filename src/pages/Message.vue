<template>
<!--  <m-chat -->
<!--      ref="mChat"-->
<!--      :messages="messages"-->
<!--      @submit="submit"-->
<!--      :loadMore="loadMore"-->
<!--      height="100vh"-->
<!--  >-->
<!--  </m-chat>-->

  <JwChat-index  style="margin-top: 50px"
      :taleList="list"
      @enter="bindEnter"
      v-model="inputMsg"
      :toolConfig="tool"
  />
</template>

<script>
export default {
  data(){
    return{
      messages:{

      }
    }
  }
}

</script>
<style scoped lang="scss">

</style>
