<template>
<div style="margin-top: 300px">
  <input
      type="text"
      placeholder="请输入你要发送的消息">
  <button @click="handleSendButton()">发送</button>

</div>

</template>

<script>
import {mapGetters} from "vuex";

export default{
  data(){
    return{
      websocket: undefined,
      message:{
        senderId: this.$store.getters.userId,
        receiverId: this.$store.getters.userId,
        img: "",
        context:"rinima"
      }
    }
  },
  created() {
    this.initWebsocket();
  },
  computed: {
    ...mapGetters(["userId", "url"]),
  },
  methods:{
    handleSendButton() {
      // const username = this.username
      // const message = this.sendMessage
      this.websocket.send(JSON.stringify(this.message))
    },
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

  }
}
</script>


<style scoped lang="scss">

</style>
